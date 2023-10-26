import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EcommerceService } from 'app/main/ecommerce/service/ecommerce.service';
import { User } from '../../user/model/user.viewmodel';
import { UserService } from '../../user/service/user.service';
import { ProductService } from '../../products/service/product.service';


@Component({
  selector: 'app-ecommerce-wishlist',
  templateUrl: './ecommerce-wishlist.component.html',
  styleUrls: ['./ecommerce-wishlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceWishlistComponent implements OnInit {
  // Public
  public contentHeader: object;
  public products;
  public wishlist$;

  /**
   *
   * @param {EcommerceService} _ecommerceService
   */

  private user: User;
  constructor(
    private _ecommerceService: EcommerceService,
    private _userService: UserService,
    private _productService: ProductService
    ) {
      if(!this._productService.productList) this._productService.getProducts()
      this.user = this._userService.currentUserValue
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  async ngOnInit(){
    await this._ecommerceService.getWishList(this.user.userId);
    this.wishlist$ = this._ecommerceService.onWishlistChange
    // content header
    this.contentHeader = {
      headerTitle: 'Wish List',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Shop',
            isLink: false,
          },
          {
            name: 'Wish List',
            isLink: false,
          }
        ]
      }
    };
  }
}
