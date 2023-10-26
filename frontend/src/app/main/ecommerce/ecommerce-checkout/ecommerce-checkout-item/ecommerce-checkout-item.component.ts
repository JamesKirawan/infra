import { AfterViewInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EcommerceService } from 'app/main/ecommerce/service/ecommerce.service';
import { User } from 'app/main/user/model/user.viewmodel';
import { UserService } from 'app/main/user/service/user.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-ecommerce-checkout-item',
  templateUrl: './ecommerce-checkout-item.component.html',
  styleUrls: ['../ecommerce-checkout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceCheckoutItemComponent implements OnInit {
  // Input Decorator
  @Input() item: any;
  public isInWishlist: boolean = false;
  public image: any;
  public env = environment
  public user: User
  public deliverDate = new Date().setDate(new Date().getDate() + 5)
  /**
   * Constructor
   *
   * @param {EcommerceService} _ecommerceService
   */
  
  constructor(
    private _ecommerceService: EcommerceService,
    private _userService: UserService
    // public _checkoutRef: EcommerceCheckoutComponent
    ) {
      this.user = this._userService.currentUserValue
  }

  get product(){
    return this.item.product
  }
  toggleWishList(productId: number) {
    if(this.isInWishlist){
      this._ecommerceService.removeFromWishlist(this.user.userId,productId).then(() => {
        this.isInWishlist = !this.isInWishlist
      }).catch(() => {})
    }
    else{
      this._ecommerceService.addToWishlist(this.user.userId,productId).then(() => {
        this.isInWishlist = !this.isInWishlist
      }).catch((err) => {})
    }
  }
  removeFromCart(productId: number) {
    this._ecommerceService.removeFromCart(this.user.userId,productId)
  }

  qtyChanged(qty: number, productId: number){
    this._ecommerceService.setQty(qty,productId,this.user.userId)
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.image = `${this.env.apiUrl}/${this.product.imagePath}`
    this.isInWishlist = this._ecommerceService.isInWishlist(this.product.productId)
  }
}
