import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductSearch } from 'app/main/products/model/product.viewmodel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productList: Array<Product>;
  public productSearch = new ProductSearch()
  public onProductListChange: BehaviorSubject<Product[] | any>;
  public total = 0;
  public categories: any[]
  public onCategoriesChange: BehaviorSubject<any>;
  public brands: any[]
  public onBrandsChange: BehaviorSubject<any>;

  public _loaded = false;
  constructor(
    private _httpClient: HttpClient
  ) { 
    this.onProductListChange = new BehaviorSubject([{}]);
    this.onBrandsChange = new BehaviorSubject([{}]);
    this.onCategoriesChange = new BehaviorSubject([{}]);
  }
  
  addProduct(product: FormData): Observable<any> {
    return this._httpClient.post<any>(`/products`, product, { responseType: 'json'})
  }

  countBrandAndCategories(key: string, value: any): number {
    return this.productList.filter((p) => p[key] === value).length || 0
  }

  getProducts(): Promise<void> {
    return new Promise((resolve, reject) => {
      if(!this.productSearch.filterBrand) this.productSearch.filterBrand = []
        this._httpClient.get<Array<Object>>(`/products?page=${this.productSearch.page}&size=${this.productSearch.size}&filterBrand=${JSON.stringify(this.productSearch.filterBrand)}&filterCategory=${this.productSearch.filterCategory}&searchedProduct=${this.productSearch.searchedProduct}`, { responseType: 'json'})
          .subscribe((resp: any) => {
            const filterData = ["productBrand","productCategory"]
            const keys = ['brands', 'categories'];
            this.productList = resp.products.rows;
            this.total = resp.products.count
            keys.forEach((key,key_idx) => {
              resp[key]?.forEach((data: any,index: number) => {
                const b = data.DISTINCT
                const total = this.countBrandAndCategories(filterData[key_idx],b)
                resp[key][index]['total'] = total
              })
            })
            this.brands = resp.brands
            this.categories = resp.categories;

            // console.log(resp)
            this.onProductListChange.next(this.productList)
            this.onCategoriesChange.next(this.categories)
            this.onBrandsChange.next(this.brands)
            this._loaded = true
            resolve();
        },(err) => {
          reject();
          console.log(err)
        })
    })
  }

  getProductById(productId: number): Observable<any> {
    return this._httpClient.get<any>(`/products/${productId}`, { responseType: 'json'})
  }

  updateProduct(product: Product): Observable<any>{
    return this._httpClient.put<any>(`/products/${product.productId}`, product, { responseType: 'json'})
  }

  deleteProduct(productId: number): Observable<any> {
    return this._httpClient.delete<any>(`/products/${productId}`, { responseType: 'json'})
  }

  getUserProductRating(productId: number, userId: number): Observable<any> {
    return this._httpClient.get<any>(`/product/${productId}/rating/user/${userId}`, { responseType: 'json'})
  }

  getProductRating(productId: number): Observable<any>{
    return this._httpClient.get<any>(`/product/${productId}/rating`, { responseType: 'json'})
  }

  getProductGalleries(productId: number): Observable<any> {
    return this._httpClient.get<any>(`/gallery/product/${productId}`, { responseType: 'json'})
  }

  getAllImage(): Observable<any> {
    return this._httpClient.get<any>(`/gallery`, { responseType: 'json'})
  }

  addProductImage(data: FormData){
    return this._httpClient.post<any>(`/gallery`, data, { responseType: 'json'})
  }

  updateUsedImage(productId: number,imageId: number): Observable<any> {
    return this._httpClient.put<any>(`/product/${productId}/image`, {
      imageId: imageId
    }, { responseType: 'json'})
  }
  deleteImage(imageId: number): Observable<any> {
    return this._httpClient.delete<any>(`/gallery/${imageId}`, { responseType: 'json'})
  }

  rateProduct(productId: number, userId: number, productRating: number){
    return this._httpClient.post<any>(`/rate`, {
      productId: productId,
      userId: userId,
      productRating: productRating
    }, { responseType: 'json'})
  }
}
