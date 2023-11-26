import { StoreService } from './../../services/store.service';
import { Subscription } from 'rxjs';
import { Product } from './../../models/product.model';
import { CartService } from './../../services/cart.service';
import { Component,OnDestroy,OnInit } from '@angular/core';

const ROWS_HEIGHT: { [id:number]: number } = {1: 400, 3: 335, 4: 450 }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
cols = 3;
rowHeight = ROWS_HEIGHT[this.cols];
category: string | undefined;
products: Array<Product> | undefined;
sort= 'desc';
count= '12';
productsSubscription: Subscription | undefined;

  constructor(private CartService: CartService, private storeService: StoreService ) {}
  
  ngOnInit(): void {
    this.getProducts();
  }

  onColmunsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  getProducts(): void{
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category)
    .subscribe((_products) => {this.products = _products});
  }

  onShowCategory(newCategory: string):void{
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void{
    this.CartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }

  onItemsCountChange(newCount: number): void {
    this.count= newCount.toString();
    this.getProducts();
  }

  onsortChange(newSort: string): void{
    this.sort=newSort;
    this.getProducts();
  }

  ngOnDestroy(): void {
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }
  }

}
