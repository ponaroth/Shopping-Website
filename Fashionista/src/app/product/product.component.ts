import { Item } from './../models/Item';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Product } from '../models/product';
import { ProductService } from '../services/ProductService';

@Component({
	templateUrl: 'product.component.html',
	selector: 'app-product',
	styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
	products: Product[];
	cartCount: number = 0;

	constructor(
		private productService: ProductService, public auth: AuthService
	) { }

	ngOnInit() {
		this.products = this.productService.findAll();
		this.updateCartCount();

	}

	addToCart(id: number) {

		var item: Item = {
			product: this.productService.find(id.toString()),
			quantity: 1
		};

		if (localStorage.getItem('cart') == null) {
			let cart: any = [];
			cart.push(JSON.stringify(item));
			localStorage.setItem('cart', JSON.stringify(cart));
		} else {
			let cart: any = JSON.parse(localStorage.getItem('cart'));
			let index: number = -1;
			for (var i = 0; i < cart.length; i++) {
				let item: Item = JSON.parse(cart[i]);
				if (item.product.id == id.toString()) {
					index = i;
					break;
				}
			}
			if (index == -1) {
				cart.push(JSON.stringify(item));
				localStorage.setItem('cart', JSON.stringify(cart));
			} else {
				let item: Item = JSON.parse(cart[index]);
				item.quantity += 1;
				cart[index] = JSON.stringify(item);
				localStorage.setItem("cart", JSON.stringify(cart));
			}
		}


		this.updateCartCount();

	}

	updateCartCount(): void {
		this.cartCount = 0;

		if (localStorage.getItem('cart')) {
			let cart: any = JSON.parse(localStorage.getItem('cart'));

			for (var i = 0; i < cart.length; i++) {
				let item: Item = JSON.parse(cart[i]);
				this.cartCount += item.quantity;
			}
		}
	}

}

