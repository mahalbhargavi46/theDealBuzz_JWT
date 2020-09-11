import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  Product:any=[];

  constructor(private ProductService: ProductService) {
    this.readProduct();
  }
  ngOnInit(): void {
  }
  readProduct(){
    this.ProductService.getProducts().subscribe((data)=>{
      this.Product=data;
    })
  }
  removeProduct(product,index){
    if(window.confirm('Are you sure you want to delete this Listing?')){
      this.ProductService.deleteProduct(product._id).subscribe((data)=>{
        this.Product.splice(index,1);
      })
    }
  }
}
