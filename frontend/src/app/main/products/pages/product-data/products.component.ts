import { Component, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxFileUploadStorage } from "@ngx-file-upload/core";
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AlertService } from 'app/shared/service/alert/alert.service';
import { ProductService } from 'app/main/products/service/product.service';
import { Discount, Product, ProductSearch } from 'app/main/products/model/product.viewmodel';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { Observable } from 'rxjs';
import { DiscountService } from '../../service/discount/discount.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class ProductsComponent implements OnInit, OnDestroy {
  productList: Product[] = [];
  ProductSearchModel = new ProductSearch()
  ProductViewModel = new Product();
  ProductFilterForm: FormGroup
  image: any;
  expandedRow: Product;
  path: string =  '../../../../assets/images/illustration/Upload.jpg';
  discountId = null;

  public ProductForm: FormGroup
  public submitted: boolean = false;
  public ColumnMode = ColumnMode;
  public storage: NgxFileUploadStorage;
  public imagePath: any = this.path;
  
  public categoryList$: Observable<any>
  public brandList$: Observable<any>
  public discountList$: Observable<any>
  
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  
  constructor(
    private _modalService: NgbModal,
    private _productService: ProductService,
    private _formBuilder: FormBuilder,
    private _alertService: AlertService,
    private _discountService: DiscountService
  ) { 
    this.ProductFilterForm = this._formBuilder.group(this.ProductSearchModel);
    this.ProductFilterForm.controls.size.setValue(10)
    this.ProductForm = this.createProductForm(this.ProductViewModel);
    this.brandList$ = this._productService.onBrandsChange
    this.categoryList$ = this._productService.onCategoriesChange
    this.discountList$ = this._discountService.onDiscountChange
  }

  drop(file: NgxFileDropEntry[]) {
    let sources: File;
    const reader = new FileReader();
    // console.log(file[0])
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
      });
    }
  }

  ngOnInit(): void {
    this.loadProducts();
    this._productService.onProductListChange.subscribe((resp) => {
      //@ts-ignore
      if(resp) this.productList = [...resp]
    })
  }
  
  identity(row?: any) {
    if(row){
      return row.productId;
    }
  }
  
  rowDetailsToggleExpand(row: Product) {
    if(row.productId !== this.expandedRow?.productId){
      this.table.rowDetail.toggleExpandRow(this.expandedRow);
      this.table.rowDetail.toggleExpandRow(row);
      this.expandedRow = row
    }
    else if(row.productId == this.expandedRow?.productId){
      this.table.rowDetail.toggleExpandRow(this.expandedRow);
      this.expandedRow = null
    }
  }

  ngOnDestroy() {
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
      product_gallery: []
    })
  }

  modalOpenForm(modalForm: any) {
    // console.log(this.brandList$)
    const ref = this._modalService.open(modalForm, {
      centered: true,
      backdrop: 'static',
      size: 'xl'
    });

    ref.dismissed.subscribe(() => {
      this.loadProducts()
      this.ProductForm.reset()
      this.ProductForm.markAsUntouched()
      this.submitted = false
    })
  }

  loadProducts(): void {
    const data = this.ProductFilterForm.getRawValue()
    // console.log(data)
    this._productService.productSearch = {...data}
    this._productService.getProducts();
    this._discountService.getAllDiscount();
  }

  discountChange(discount: Discount){
    if(discount?.discountId) this.discountId = discount.discountId
  }
  
  search(e: any): void {
    console.log(e)
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.ProductForm.invalid) {
      return;
    }
    const form = new FormData;
    const raw_data: Product = this.ProductForm.getRawValue();
    Object.keys(raw_data).forEach((key) => {
      form.append(key,raw_data[key])
    })
    form.append('file',this.image)

    this._productService.addProduct(form).subscribe((resp) => {
      if(resp.message === "Product Added!"){
        this.submitted = false;
        this.ProductForm.reset();
        this.imagePath = this.path;
        this._alertService.toastrSuccess(resp.message,2000, { hr: 'center', vr: 'top'})
        if(resp.product){
          this._discountService.setDiscount(resp.product.productId, this.discountId)
          .subscribe((res) => {
            if(!res.message) console.log(res)
          },(err) => {
            console.log(err)
          })
        }
      }
      else{
        this._alertService.toastrError('Error',resp.message || 'Unknown Error', 2500, 'center')
      }
    },(err) => {
      this._alertService.toastrError('Error',err.message || 'Unknown Error', 2500, 'center')
    })
  }
}
