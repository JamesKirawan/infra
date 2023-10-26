import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from 'app/main/products/model/product.viewmodel';
import { AlertService } from 'app/shared/service/alert/alert.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { UserService } from '../../user/service/user.service';
import { EcommerceShopComponent } from '../ecommerce-shop/ecommerce-shop.component';
import { EcommerceService } from '../service/ecommerce.service';

@Component({
  selector: 'app-ecommerce-item',
  templateUrl: './ecommerce-item.component.html',
  styleUrls: ['./ecommerce-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceItemComponent implements OnInit, OnDestroy {
  // Input Decorotor
  @Input() product: Product;
  @Input() isWishlistOpen: boolean = false;
  public wishlist: any;
  public image: string = '';
  public env = environment
  // Public
  public isInCart = false;
  public isInWishlist: boolean = false;

  private _unsubscribeAll: Subject<any>
  /**
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(
    public _shopRef: EcommerceShopComponent,
    private _ecommerceService: EcommerceService,
    private _userService: UserService,
    private _alertService: AlertService,
    ) {
      this._unsubscribeAll = new Subject();
  }

  get user() {
    return this._userService.currentUserValue
  }
  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  toggleWishlist(product){
    if(this.user?.userId){
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
    else{
      this._alertService.toastrError('Error','Please login to authenticate!',2000,'center');
    }
  }

  addToCart(product){
    if(this.user?.userId){
      if(this.user.role !== 'Admin') {
        if(this.isInCart){
          this._ecommerceService.removeFromCart(this.user.userId,product.productId).then((res) => {
            this.isInCart = !this.isInCart
          }).catch((err) => {
            this._alertService.toastrError('Error',err,2000,'center')
          })
        }
        else{
          this._ecommerceService.addToCart(this.user.userId,product.productId).then((res) => {
            this.isInCart = !this.isInCart
          }).catch((err) => {
            this._alertService.toastrError('Error',err,2000,'center')
          })
        }
      }
    }
    else{
      this._alertService.toastrError('Error','Please login to authenticate!',2000,'center');
    }
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    // console.log(this.product)
    this.isInWishlist = this._ecommerceService.isInWishlist(this.product.productId)
    this.isInCart = this._ecommerceService.isInCart(this.product.productId)
    this.image =  `${this.env.apiUrl}/${this.product.product_galleries[0]?.imagePath}` || ""
  }
}
