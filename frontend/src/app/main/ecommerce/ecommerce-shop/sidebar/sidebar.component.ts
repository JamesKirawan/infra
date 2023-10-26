import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from 'app/main/products/service/product.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ecommerce-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../ecommerce-shop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceSidebarComponent implements OnInit, OnDestroy {
  // Public
  public categoryList$: Observable<any>
  public brandList$: Observable<any>
  public currentCategory: string;
  public currentBrandMap: {}

  category: any;
  brand: any;
  private _unsubscribeAll: Subject<any>;
  constructor(
    private _productService: ProductService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.categoryList$ = this._productService.onCategoriesChange
    this.brandList$ = this._productService.onBrandsChange
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // categoryFilter(e: string) {
  //   if(e === "All") e = ""
  //   this.currentCategory = e
  //   this._productService.productSearch.filterCategory = e
  //   this._productService.getProducts()
  // }

  // brandCheckbox(e: string){
  //   const pos = this.f.filterBrand.indexOf(e)
  //   if(pos === -1) this.f.filterBrand.push(e)
  //   else this.f.filterBrand.splice(pos,1)
  // }

  filterBrand() {
    this._productService.productSearch.filterCategory = this.category || ''
    this._productService.productSearch.filterBrand = this.brand || []
    this._productService.getProducts()
  }
}
