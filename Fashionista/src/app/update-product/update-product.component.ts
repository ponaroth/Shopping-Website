import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/ProductService';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: Product;
  pid: string;
  pname: string;
  price: number;
  photo: string;

  updateForm = new FormGroup({
    pname: new FormControl(),
    price: new FormControl(),
    photo: new FormControl()
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.pid = params['id'];
      let p = this.productService.find(this.pid);
      this.pname = p.name;
      this.price = p.price;
      this.photo = p.photo;

      // this.updateForm.value.pname = p.name;
      // this.updateForm.value.price = p.price;

    });
  }

  updateProduct() {
    let newName = (this.updateForm.value.pname)? this.updateForm.value.pname: this.pname;
    let newPrice = (this.updateForm.value.price)? this.updateForm.value.price: this.price;
    let newPhoto = (this.updateForm.value.photo)? this.updateForm.value.photo: this.photo;
    let p = new Product(this.pid, newName, newPrice, newPhoto);
    this.productService.update(p);
  }

  deleteProduct() {
    this.productService.delete(this.pid);
    this.router.navigate(['']);
  }

}
