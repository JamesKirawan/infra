import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxFileUploadStorage } from '@ngx-file-upload/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AlertService } from 'app/shared/service/alert/alert.service';
import { ProductService } from 'app/main/products/service/product.service';
import { Discount, Product, ProductImage } from 'app/main/products/model/product.viewmodel';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ProductsComponent } from '../../pages/product-data/products.component';
import Swal from 'sweetalert2';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { environment } from 'environments/environment';
import { DiscountService } from '../../service/discount/discount.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @Input() data: Product
  
  ProductViewModel = new Product();
  image: any;

  public ProductForm: FormGroup
  public submitted: boolean = false;
  public ColumnMode = ColumnMode;
  public storage: NgxFileUploadStorage;
  public imagePath: any = '';
  public env = environment;
  public discountList$: Observable<any>

  public categoryList$: Observable<any>
  public brandList$: Observable<any>

  private _unsubscribeAll: Subject<any>
  private currentImageIndex: number = 0;
  //swiper
  public swiperResponsive1: SwiperConfigInterface = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: 'auto',
    slideToClickedSlide: true,
    preloadImages: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: '.swiper-pagination'
    }
  };

  constructor(
    private _productService: ProductService,
    private _formBuilder: FormBuilder,
    private _alertService: AlertService,
    private _parentComponent: ProductsComponent,
    private _discountService: DiscountService
  ) {
    this.ProductForm = this.createProductForm(this.ProductViewModel);
    this._unsubscribeAll = new Subject();
  }

  //public method
  onIndexChange(e: number) {
    this.currentImageIndex = e
  }

  onImageClick() {
    const { productId, imageId } = this.ProductViewModel.product_galleries[this.currentImageIndex]
    this._productService.updateUsedImage(productId, imageId).subscribe((resp) => {
      if(resp?.message === "Thumbnail Updated!"){
        this._alertService.toastrSuccess(resp.message, 2000)
      }
      else{
        this._alertService.toastrError(resp.message,resp.error, 2000)
        console.log(resp)
      }
    },(err) => {
      console.log(err)
    })
  }

  drop(file: NgxFileDropEntry[]) {
    let sources: File;
    const reader = new FileReader();
    if (file[0].fileEntry.isFile) {
      const dropped: any = file[0].fileEntry;
      dropped.file((droppedFile: File) => {
        if (droppedFile instanceof DataTransferItem) {
          return;
        }
        this.image = droppedFile
        reader.readAsDataURL(droppedFile)
        reader.onload = () => {
          this.imagePath = reader.result;
        };
        const d = new FormData();
        d.append('file',this.image);
        d.append('productId',this.ProductViewModel.productId.toString())
        this._productService.addProductImage(d).subscribe((resp) => {
          if(resp?.message === "Image Uploaded"){
            const newImage = new ProductImage(resp.result)
            this.ProductViewModel.product_galleries.push(newImage)
          }
          else{
            console.log(resp)
          }
        },(err) => {
          console.log(err)
        })
      });
    }
  }

  get f() {
    return this.ProductForm.controls;
  }

  createProductForm(data: Product): FormGroup {
    return this._formBuilder.group({
      productId: [data.productId],
      productName: [data.productName, [Validators.required]],
      productSummary: [data.productSummary, [Validators.required]],
      productCategory: [data.productCategory, [Validators.required]],
      productDesc: [data.productDesc, [Validators.required]],
      productBrand: [data.productBrand, [Validators.required]],
      productPrice: [data.productPrice, [Validators.min(0)]],
      productStock: [data.productStock, [Validators.min(0)]],
      product_discount: [],
      product_galleries: []
    })
  }

  deleteImage(): void {
    const imageId = this.ProductViewModel.product_galleries[this.currentImageIndex].imageId;
    this._productService.deleteImage(imageId).subscribe((resp) => {
      if(resp.message === "File Deleted"){
        this.ProductViewModel.product_galleries.splice(this.currentImageIndex,1);
      }
      else{
        console.log(resp)
      }
    },(err) => {
      console.log(err)
    })
  }

  onDelete(): void {
    try{
      this._productService.deleteProduct(this.f.productId.value).subscribe((resp) => {
        console.log(resp)
      },(err) => {
        console.log(err)
      })
    } catch(e){
      console.log(e)
    }
  }

  confirmDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Confirm action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-primary ml-1'
      }
    }).then((result) => {
      if (result.value) {
        this._productService.deleteProduct(this.f.productId.value).subscribe((resp) => {
          if(resp?.message === 'Product Deleted'){
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Product deleted!',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            });

            this._parentComponent.loadProducts();
          }
        },(err) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err,
            customClass: {
              confirmButton: 'btn btn-primary'
            }
          });
        })
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.ProductForm.invalid) {
      return;
    }
    const data = this.ProductForm.getRawValue()
    this._productService.updateProduct(data).subscribe((resp) => {
      if(resp.message === "Product Updated"){
        this.submitted = false;
        this._parentComponent.loadProducts();
        // console.log(this._parentComponent.productList)
        this._alertService.toastrSuccess(resp.message,2000, { hr: 'center', vr: 'top'})
      }
    },(err) => {
      console.log(err)
    })
  }

  discountChange(discount: Discount){
    if(discount?.discountId){
      this._discountService.setDiscount(this.f.productId.value, discount.discountId)
      .subscribe((res) => {
        if(!res.message) console.log(res)
        else this._parentComponent.loadProducts();
      },(err) => {
        console.log(err)
      })
    }
    else{
      this._discountService.setDiscount(this.f.productId.value, null)
      .subscribe((res) => {
        if(!res.message) console.log(res)
        else this._parentComponent.loadProducts();
      },(err) => {
        console.log(err)
      })
    }
  }

  //lifecycle
  ngOnInit(): void {
    forkJoin({
      product: this._productService.getProductById(this.data.productId),
      product_galleries: this._productService.getProductGalleries(this.data.productId)
    }).pipe(takeUntil(this._unsubscribeAll)).subscribe((resp) => {
      this.ProductViewModel = resp.product.product
      this.ProductForm.patchValue(this.ProductViewModel)
      this.f.product_discount.patchValue(this.ProductViewModel.product_discount?.discountId)
      if(this.ProductViewModel.beforeDiscount){
        this.ProductForm.patchValue({
          productPrice: this.ProductViewModel.beforeDiscount
        })
      }
      resp.product_galleries.gallery.rows.forEach((data: any) => {
        this.ProductViewModel.product_galleries.push(data)
      })
      this.imagePath = `${this.env.apiUrl}/${this.ProductForm.value.product_galleries[0].imagePath}`;
      // console.log(resp,this.ProductViewModel)
    },(err) => {
      console.log(err)
    })
    this._discountService.getAllDiscount()
    this.discountList$ = this._discountService.onDiscountChange
    this.brandList$ = this._productService.onBrandsChange
    this.categoryList$ = this._productService.onCategoriesChange
    // console.log(this.brandList$)
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
