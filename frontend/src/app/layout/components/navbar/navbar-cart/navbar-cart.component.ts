import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'app/main/user/service/user.service';
import { EcommerceService } from 'app/main/ecommerce/service/ecommerce.service';
import { ProductService } from 'app/main/products/service/product.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Cart } from 'app/main/ecommerce/models/cart.viewmodel';

@Component({
  selector: 'app-navbar-cart',
  templateUrl: './navbar-cart.component.html'
})
export class NavbarCartComponent implements OnInit, OnDestroy {
  // Public
  public cart = [];
  public cartLength;
  public env = environment
  public total = 0;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(
    public _ecommerceService: EcommerceService,
    private _userService: UserService,
    private _productService: ProductService
    ) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  get userId() {
    return this._userService.currentUserValue?.userId || null
  }
 
  removeFromCart(productId: number) {
    this._ecommerceService.removeFromCart(this.userId,productId)
  }

  sum() {
    const reducer = (prev, cur) => prev + ((cur.productQty || 1) * cur.product?.productPrice);
    this.total = this.cart.reduce(reducer,0)
  }

  qtyChanged(qty: number, productId: number){
    this._ecommerceService.setQty(qty,productId,this.userId)
  }

  smoothUpdate(d1: Cart[], d2: Cart[]): void {
    d1.forEach((data,index) => {
      data.productQty = d2[index].productQty
    })
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
  async ngOnInit() {
    // Subscribe to Cart List
    await this._ecommerceService.getUserCart(this.userId)
    // console.log(this.cart)
    this._ecommerceService.onCartChange.pipe(takeUntil(this._unsubscribeAll),distinctUntilChanged()).subscribe((res: any[]) => {
      if(res) {
        //@ts-ignore
        if (res.length !== this.cart.length) this.cart = [...res]
        else this.smoothUpdate(this.cart,res);
        // console.log(this.cart)
        this.sum();
      }
      this.cartLength = this.cart.length
      // console.log(this.cart)
    });
  }
}
