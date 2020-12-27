import { Product } from './../models/product';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

    private products: Product[];

    constructor() {
        this.products = [
            { id: '0', name: 'Black Chinos Pants', price: 24.99, photo: 'black_chinos.jpeg' },
            { id: '1', name: 'Brown Chinos Pants', price: 24.99, photo: 'brown_chinos.jpeg' },
            { id: '2', name: 'Side Zip Boots', price: 79.99, photo: 'side_zip_boots.jpeg' },
            { id: '3', name: 'Flannel Shirt Blue', price: 23.99, photo: 'flannel_shirt_blue.jpeg' },
            { id: '4', name: 'Just Flannel Shirt', price: 23.99, photo: 'flannel_shirt.jpeg' },
            { id: '5', name: 'Corduroy Jacket Black', price: 74.99, photo: 'corduroy_black.jpeg' },
            { id: '6', name: 'Corduroy Jacket Brown', price: 74.99, photo: 'corduroy_brown.jpeg' },
            { id: '7', name: 'Corduroy Jacket Red', price: 74.99, photo: 'corduroy_red.jpeg' }
        ];
    }

    // get a list of all products
    findAll(): Product[] {
        if (localStorage.getItem('productList') == null) {
            let productList: Product[] = this.products;
            localStorage.setItem('productList', JSON.stringify(productList));
        }

        return JSON.parse(localStorage.getItem('productList'));
    }

    // find product by ID
    find(id: string): Product {
        let productList: Product[] = JSON.parse(localStorage.getItem('productList'));
        return productList[this.getSelectedIndex(id)];
    }

    // push a product to the list
    store(p: Product): void {
        let productList: Product[] = JSON.parse(localStorage.getItem('productList'));
        productList.push(p);
        localStorage.setItem('productList', JSON.stringify(productList));
    }

    // update properties of a product
    update(p:Product): void {
        let productList: Product[] = JSON.parse(localStorage.getItem('productList'));
        
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].id == p.id) {
                productList[i] = p;
            }
        }
        localStorage.setItem('productList', JSON.stringify(productList));
    }

    // delete a product
    delete(id) {
        let productList: Product[] = JSON.parse(localStorage.getItem('productList'));
        
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].id == id) {
                productList.splice(i, 1);
            }
        }
        localStorage.setItem('productList', JSON.stringify(productList));

    }

    // return the correct index from id
    private getSelectedIndex(id: string) {
        let productList: Product[] = JSON.parse(localStorage.getItem('productList'));

        for (var i = 0; i < productList.length; i++) {
            if (productList[i].id == id) {
                return i;
            }
        }
        return -1;
    }

}