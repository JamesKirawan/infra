import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  public discountList: any[];
  public onDiscountChange: BehaviorSubject<any>

  constructor(
    private _httpClient: HttpClient
  ) { 
    this.onDiscountChange = new BehaviorSubject([{}])
  }

  getAllDiscount(): Promise<void> {
    return new Promise((resolve,reject) => {
      this._httpClient.get<any>(`/discounts`, { responseType: 'json'}).subscribe((res) => {
       if(res?.response){
         this.discountList = res.response
         this.onDiscountChange.next(this.discountList)
         resolve();
       }
     },(err) => {
       console.log(err)
       reject();
     })
    })
  }

  setDiscount(productId: number, discountId: number): Observable<any> {
    return this._httpClient.put<any>(`/product/${productId}/discount`, { discountId: discountId }, { responseType: 'json'})
  }
  
}
