import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Image } from 'app/main/products/model/gallery.viewmodel'

@Injectable({
  providedIn: 'root'
})
export class GalleryService {  
  constructor(
    private _httpClient: HttpClient
  ) {
    
   }

  getAllImage(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(`/gallery`, { responseType: 'json'}).subscribe((resp) => {
        if (resp.gallery) resolve(resp.gallery)
        reject(resp)
      },(err) => {
        reject(err)
      })
    })
  }
  
  getImageByProductId(productId: number): Promise<any> {
    return new Promise((resolve,reject) => {
      this._httpClient.get<any>(`/gallery/product/${productId}`, { responseType: 'json'}).subscribe((res) => {
        if(res.gallery.rows) resolve(res.gallery.rows)
        else reject();
      },(err) => {
        console.log(err)
        reject(err);
      })
    })
  }

  uploadImage(image: Image): Observable<any> {
    return this._httpClient.post<any>(`/gallery`, image, { responseType: 'json'})
  }

  deleteImage (imageId: number): Observable<any> {
    return this._httpClient.delete<any>(`/gallery/${imageId}`, { responseType: 'json'})
  }
}
