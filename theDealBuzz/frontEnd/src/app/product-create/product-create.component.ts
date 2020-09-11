import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  submitted = false;
  productForm: FormGroup;
  buildingType: any=['Apartment','Bungalow','Town-home','Mansion'];


  constructor(public fb: FormBuilder, private router: Router, private ngZone: NgZone, private ProductService: ProductService) {
    this.mainForm();
  }
  ngOnInit(): void {
  }
  mainForm(){
    this.productForm = this.fb.group({
      price: ['',[Validators.required]],
      locality: ['',[Validators.required]],
      city: ['',[Validators.required]],
      province: ['',[Validators.required]],
      postalCode: ['',[Validators.required]],
      buildingType: ['',[Validators.required]],
      description: ['',[Validators.required]]
    })
  }
  updateForm(e){
    this.productForm.get('buildingType').setValue(e, {
      onlySelf:true
    })
  }

  //Access the form control
  get myForm(){
    return this.productForm.controls;
  }

  //Submitting the form
  onSubmit(){
    this.submitted = true;
    if(!this.productForm.valid){
      return false;
    }else{
      this.ProductService.createProduct(this.productForm.value).subscribe(
        (res) => {
          console.log('Listing Created')
          this.ngZone.run(()=> this.router.navigateByUrl('/product-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }
}
