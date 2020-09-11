import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Products } from './product';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _ProductService : ProductService){}
  listProducts:Products[];

  ngOnInit(){
    // this._ProductService.getProducts()
    // .subscribe(
    //   data=>{
    //     //typecasting the data which is returned from the API
    //     this.listProducts=data;
    //   }
    // );
  }
}

