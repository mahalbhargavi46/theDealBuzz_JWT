import { Component, OnInit } from '@angular/core';
import { Products } from '../product';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductService } from '../product.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  submitted= false;
  editForm: FormGroup;
  productData: Products[];
  buildingType: any=['Apartment','Bungalow','Town-home','Mansion'];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private ProductService: ProductService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.updateProduct();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getProduct(id);
    this.editForm = this.fb.group({
      price: ['',[Validators.required]],
      locality: ['',[Validators.required]],
      city: ['',[Validators.required]],
      province: ['',[Validators.required]],
      postalCode: ['',[Validators.required]],
      buildingType: ['',[Validators.required]],
      description: ['',[Validators.required]]
    })
  }

  //Choose options from the drop down
  updateForm(e){
    this.editForm.get('buildingType').setValue(e, {
      onlySelf:true
    })
  }

  //getter to access form control
  get myForm(){
    return this.editForm.controls;
  }

  getProduct(id){
    this.ProductService.getProduct(id).subscribe(data=>{
      this.editForm.setValue({
        price:data['price'],
        locality:data['locality'],
        city:data['city'],
        province:data['province'],
        postalCode:data['postalCode'],
        buildingType:data['buildingType'],
        description: data['description']
      });
    });
  }

  updateProduct(){
    this.editForm = this.fb.group({
      price: ['',[Validators.required]],
      locality: ['',[Validators.required]],
      city: ['',[Validators.required]],
      province: ['',[Validators.required]],
      postalCode: ['',[Validators.required]],
      buildingType: ['',[Validators.required]],
      description: ['',[Validators.required]]
    })
  }

  onSubmit(){
    this.submitted=true;
    if(!this.editForm.valid){
      return false;
    }else{
      if(window.confirm('Are you sure?')){
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.ProductService.updateProduct(id, this.editForm.value)
        .subscribe(res=>{
          this.router.navigateByUrl('/product-list');
          console.log('Content updated successfully!')
        }, (error)=>{
          console.log(error);
        })
      }
    }
  }
}
