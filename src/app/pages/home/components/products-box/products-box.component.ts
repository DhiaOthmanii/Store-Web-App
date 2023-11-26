import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-box',
  templateUrl: 'products-box.component.html',
})
export class ProductsBoxComponent {
@Input() fullWidthMode = false;
@Input() product: Product | undefined;
@Output() addToCart = new EventEmitter();

onAddToCart(): void{
  this.addToCart.emit(this.product);
}
}
