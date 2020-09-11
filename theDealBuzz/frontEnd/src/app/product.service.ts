import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import {catchError,map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURI:string='http://127.0.0.1:3000/products';
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private _http: HttpClient) { }

  //create listings
  createProduct(data): Observable<any>{
    let url=`${this.baseURI}`;
    return this._http.post(url,data)
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  //get all listings
  getProducts(){
    return this._http.get(`${this.baseURI}`);
  }

  //get a single listing
  getProduct(_id): Observable<any>{
    let url = `${this.baseURI}/${_id}`;
    return this._http.get(url, {headers:this.headers}).pipe(
      map((res:Response)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //update listing
  updateProduct(_id,data): Observable<any>{
    let url = `${this.baseURI}/${_id}`;
    return this._http.patch(url,data, {headers:this.headers}).pipe(
      catchError(this.errorMgmt)
    )
  }

  //delete listing
  deleteProduct(_id): Observable<any>{
    let url = `${this.baseURI}/${_id}`;
    return this._http.delete(url, {headers:this.headers}).pipe(
      catchError(this.errorMgmt)
    )
  }
  errorMgmt(error: HttpErrorResponse){
    let errorMessage="";
    if(error.error instanceof ErrorEvent){
      //Getting client side error
      errorMessage = error.error.message;
    }else{
      //Getting server side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
  // getProducts(){
  //   return this._http.get(this.baseURI);
  // }
  // postProducts(products: Products){
  //   return this._http.post(this.baseURI, products);
  // }
  // putProducts(products: Products){
  //   return this._http.put(this.baseURI + `/${products._id}`, products);
  // }
  // deleteProducts(_id:string){
  //   return this._http.delete(this.baseURI + `/${_id}`);
  // }

  // getProducts(): Observable<any> {
  //   return this._http.get('http://127.0.0.1:3000/products/');
  // }
  // createProduct(product: Products){
  //   return this._http.post('http://127.0.0.1:3000/products',product);
  // }
