import { Product } from './../models/product';
import { ProductService } from './../services/ProductService';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  
// public id:string,
// public name:string,
// public price:number, 
// public photo:string 
  products: Product[];

  addProductForm = new FormGroup({
    // pid: new FormControl(),
    pname: new FormControl(),
    price: new FormControl(),
    photo: new FormControl()
  });
  
  constructor(private productService: ProductService, private router: Router) { }
  
  ngOnInit(): void {
  }

  addProduct(){
    this.products = this.productService.findAll();

    let pid = this.products.length;
    let name = this.addProductForm.value.pname;
    let price = this.addProductForm.value.price;
    let photo = this.addProductForm.value.photo;

    let p = new Product(pid.toString(), name, price, photo);
    this.productService.store(p);
    this.router.navigate(['']);
  }

}
