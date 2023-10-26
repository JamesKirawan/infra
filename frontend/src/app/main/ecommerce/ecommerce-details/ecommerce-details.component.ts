import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/main/user/model/user.viewmodel';
import { EcommerceService } from 'app/main/ecommerce/service/ecommerce.service';
import { Product } from 'app/main/products/model/product.viewmodel';
import { ProductService } from 'app/main/products/service/product.service';
import { AlertService } from 'app/shared/service/alert/alert.service';
import { environment } from 'environments/environment';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../user/service/user.service';

@Component({
  selector: 'app-ecommerce-details',
  templateUrl: './ecommerce-details.component.html',
  styleUrls: ['./ecommerce-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-details' }
})
export class EcommerceDetailsComponent implements OnInit, OnDestroy {
  // public
  public contentHeader: object;
  public product: Product;
  public productRating: any;

  public wishlist;
  public cartList;
  public relatedProducts;
  public isInWishlist = false
  public env = environment
  productId: number;
  user: User;
  userRating: number = 0;


  // Swiper
  public swiperResponsive1: SwiperConfigInterface = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
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

  private _unsubscribeAll: Subject<any>;
  /**
   * Constructor
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(
    private _ecommerceService: EcommerceService,
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _alertService: AlertService
    ) {
      this._unsubscribeAll = new Subject();
      this.productId = parseInt(this._activatedRoute.snapshot.params['id']);
      this._userService.currentUser.pipe(takeUntil(this._unsubscribeAll)).subscribe((x) => this.user = x)
      forkJoin({
        product: this._productService.getProductById(this.productId),
        productRating: this._productService.getProductRating(this.productId),
        userRating: this._productService.getUserProductRating(this.productId, this.user?.userId || null),
        product_galleries: this._productService.getProductGalleries(this.productId)
      }).subscribe((resp) => {
        // console.log(resp)
        this.productRating = resp.productRating
        this.product = resp.product.product;
        this.product.finalRating = resp.productRating.rating || 0;
        this.userRating = resp.userRating.response[0]?.productRating || 0;
        resp.product_galleries.gallery.rows.forEach((data: any) => {
          this.product.product_galleries.push(data)
        })
      },(err) => {
        console.log(err)
      })
    }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  ratingChanged(call: boolean = false): void {
    if(call){
      forkJoin({
        data: this._productService.rateProduct(this.productId,this.user.userId,this.userRating),
        productRating: this._productService.getProductRating(this.productId)
      }).pipe(takeUntil(this._unsubscribeAll)).subscribe((resp) => {
        if(resp.data?.message) this._alertService.toastrSuccess(resp.data.message,2000,{hr: 'center', vr: 'top'})
        if(resp.productRating) this.productRating = resp.productRating
      },(err) => {
        console.log(err)
      })
    }
  }
  /**
   * Toggle Wishlist
   *
   * @param product
   */
   toggleWishlist(product){
    if(this.user.role !== 'Admin'){
      if(this.isInWishlist){
        this._ecommerceService.removeFromWishlist(this.user.userId,product.productId).then(() => {
          this.isInWishlist = !this.isInWishlist
        }).catch(() => {})
      }
      else{
        this._ecommerceService.addToWishlist(this.user.userId,product.productId).then(() => {
          this.isInWishlist = !this.isInWishlist
      }).catch((err) => {})
      }
    }
  }

  /**
   * Add To Cart
   *
   * @param product
   */
  addToCart(product) {
    // this._ecommerceService.addToCart(product.id).then(res => {
    //   product.isInCart = true;
    // });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // content header
    this._ecommerceService.onWishlistChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.isInWishlist = this._ecommerceService.isInWishlist(this.productId)
    })
    console.log(this.isInWishlist)
    this.contentHeader = {
      headerTitle: 'Product Details',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          // {
          //   name: 'Home',
          //   isLink: true,
          //   link: '/'
          // },
          // {
          //   name: 'eCommerce',
          //   isLink: true,
          //   link: '/'
          // },
          // {
          //   name: 'Shop',
          //   isLink: true,
          //   link: '/'
          // },
          // {
          //   name: 'Details',
          //   isLink: false
          // }
        ]
      }
    };
  }
}
