import { Component, Injectable, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { Product } from 'app/main/products/model/product.viewmodel';
import { ProductService } from 'app/main/products/service/product.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { UserService } from '../../user/service/user.service';
import { EcommerceService } from '../service/ecommerce.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-ecommerce-shop',
  templateUrl: './ecommerce-shop.component.html',
  styleUrls: ['./ecommerce-shop.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceShopComponent implements OnInit, OnDestroy {
  // public
  public contentHeader: object;
  public shopSidebarToggle = false;
  public shopSidebarReset = false;
  public gridViewRef = true;
  public products: Product[];
  public filterData = {
    brands: [],
    categories: []
  }
  public page = 1;
  public searchText = new FormControl();
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _coreSidebarService: CoreSidebarService,
    public _productService: ProductService,
    private _ecommerceService: EcommerceService,
    private _userService: UserService
     ) {
      this._unsubscribeAll = new Subject();
      this._productService.onProductListChange.pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
        if(res) this.products = res
      });
     }
  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  get userId() {
    return this._userService.currentUserValue?.userId || null
  }

  get getCollectionSize() {
    return Math.ceil(this._productService.total / 6) * 6;
  }

  pageChange(page: number): void {
    this.page = page
    this.loadProduct();
  }

  async loadProduct() {
    this._productService.productSearch.page = this.page - 1
    await this._productService.getProducts();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  listView() {
    this.gridViewRef = false;
  }

  gridView() {
    this.gridViewRef = true;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  
  async ngOnInit() {
    await this.loadProduct()
    await this._ecommerceService.getUserCart(this.userId)
    this.searchText.valueChanges.pipe(
      debounceTime(500))
      .subscribe((res: string) => {
        this._productService.productSearch.searchedProduct = res;
        this._productService.getProducts()
    })

    // content header
    this.contentHeader = {
      headerTitle: 'Shop',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Shop',
            isLink: false,
          }
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
          //   isLink: false
          // }
        ]
      }
    };
  }
}
