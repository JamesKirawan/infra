import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../products/model/product.viewmodel';
import { Transaction } from '../models/transaction.viewmodel';


@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  public wishlist: Product[]
  public onWishlistChange: BehaviorSubject<any>;
  public cart: any
  public onCartChange: BehaviorSubject<any>;

  constructor(
    private _httpClient: HttpClient
  ){
    this.onWishlistChange = new BehaviorSubject([{}])
    this.onCartChange = new BehaviorSubject([{}])
  }

    getWishList(userId: number): Promise<void> {
      return new Promise((resolve, reject) => {
        this._httpClient.get<any>(`/user/${userId}/wishlist`, { responseType: 'json'}).subscribe((resp: any) => {
          if(resp.wishlist){
            this.wishlist = resp.wishlist;
            // console.log(this.wishlist)
            this.onWishlistChange.next(this.wishlist)
            resolve();
          }
          else{
            console.log(resp)
            reject()
          }
        },(err) => {
          console.log(err)
          reject()
        })
      })
  }

  isInWishlist(productId: number): boolean{
    let idx = -1
    // console.log(this.wishlist,productId)
    if(this.wishlist && productId){
      idx = this.wishlist.findIndex((x) => x.productId === productId)
    }
    return idx !== -1
  }

  addToWishlist(userId: number, productId: number): Promise<void>{
    return new Promise((resolve,reject) => {
      this._httpClient.post<any>(`/wishlist`, {userId: userId, productId: productId, productQty: 0}, { responseType: 'json'})
      .subscribe((resp: any) => {
        if(resp?.message){
          this.getWishList(userId)
          resolve();
        }
        else{
          console.log(resp)
          reject();
        }
      },(err) => {
        console.log(err)
        reject();
      })
    })
  }

  removeFromWishlist(userId: number, productId: number): Promise<void> {
    return new Promise((resolve,reject) => {
      this._httpClient.delete<any>(`/user/${userId}/product/${productId}`, { responseType: 'json'})
      .subscribe((resp: any) => {
        if(resp?.message === 'Item Removed!'){
          this.getWishList(userId);
          resolve();
        }
        else{
          console.log(resp)
          reject();
        }
      },(err) => {
        console.log(err)
        reject();
      })
    })
  }
  
  getUserCart(userId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(`/user/${userId}/cart`, { responseType: 'json'})
      .subscribe((res) => {
        if(res.cart){
          //@ts-ignore
          this.cart = [...res.cart]
          // console.log(this.cart)
          this.onCartChange.next(this.cart)
          resolve();
        }
        else{
          console.log(res)
          reject();
        }
      },(err) => {
        console.log(err)
        reject();
      })
    })
  }

  isInCart(productId: number): boolean{
    let idx = -1
    // console.log(this.cart)
    if(this.cart && productId){
      idx = this.cart.findIndex((x) => x.productId === productId)
    }
    return idx !== -1
  }

  setQty(qty: number, productId: number,userId: number){
      this.addToCart(userId,productId,qty)
  }

  addToCart(userId: number,productId: number, qty: number = 1): Promise<any> {
    return new Promise((resolve,reject) => {
      this._httpClient.post<any>(`/cart`, {
        productId: productId,
        userId: userId,
        productQty: qty
      }, { responseType: 'json'}).subscribe((res) => {
        const responses = ['Cart Updated!','Added to Cart!']
        if(responses.includes(res?.message)){
          this.getUserCart(userId);
          resolve(res.message);
        }
        else{
          console.log(res?.message)
          reject(res?.message);
        }
      },(err) => {
        console.log(err)
        reject(err);
      })
    })
  }

  removeFromCart(userId: number, productId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete<any>(`/cart/user/${userId}/product/${productId}`, { responseType: 'json'})
      .subscribe((res) => {
        if(res?.message === "This Item Removed From Your Cart"){
          this.getUserCart(userId)
          resolve();
        }
        else{
          console.log(res)
          reject();
        }
      },(err) => {
        console.log(err)
        reject();
      })
    })
  }

  addTransaction(data: Transaction): Promise<string> {
    return new Promise((resolve,reject) => {
      this._httpClient.post<any>(`/transaction`, data, { responseType: 'json'}).subscribe((res) => {
        if(res.message === 'Transaction Success') resolve(res.message)
        else reject(res.message)
      },(err) => {
        console.log(err)
        reject(err)
      })
    })
  }
  
  getAllTransaction(): Promise<any> {
    return new Promise((resolve,reject) => {
      this._httpClient.get<any>('/transaction', { responseType: 'json'}).subscribe((res) => {
        if(res.response) resolve(res.response)
        else reject()
      },(err) => {
        console.log(err);
        reject(err);
      })
    })
  }

  getUserTransaction(userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(`/user/${userId}/transaction`, { responseType: 'json'}).subscribe((res) => {
        if(res.respose) resolve(res.response)
        else reject()
      },(err) => {
        console.log(err);
        reject(err)
      })
    })
  }

  getTransactionDetail(transactionId: number): Promise<any> {
    return new Promise((resolve,reject) => {
      this._httpClient.get<any>(`/transaction/${transactionId}`, { responseType: 'json'}).subscribe((res) => {
        if(res.response) resolve(res.response);
        else reject();
      },(err) => {
        console.log(err);
        reject(err);
      })
    })
  }
}
