import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl:'cart.component.html',
})
export class CartComponent {
  cart: Cart = { items: [{
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 1,
    id: 1, 
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 5,
    id: 2, 
  }]};
  dataSource: Array<CartItem> = [];
  displayedColmuns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

  ngOnInit(): void{
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart)=>{
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
}
  constructor(private cartService: CartService, private http: HttpClient){}

getTotal(items: Array<CartItem>): number{
  return this.cartService.getTotal(items);
}

onClearCart(): void{
  this.cartService.ClearCart();
}

onRemoveFromCart(item : CartItem): void{
this.cartService.removeFromCart(item);
}

onAddQuantity(item: CartItem): void{
  this.cartService.addToCart(item);
}
onRemoveQuantity(item: CartItem): void{
  this.cartService.removeQuantity(item);
}
 onCheckout(): void{
  this.http.post('http://localhost:4242/checkout',{
    items: this.cart.items
  }).subscribe(async(res: any) => {
    let stripe = await loadStripe('pk_test_51OCX7RCd8ZMqOv2bs1BP9nRHhasZyXfivXFmfB4ZtTwotUJi9V0Zb0bQl18HoYw6Iav1ZZcI7WZF1jwFbMGr6G5e00Yyy2O9Z8');
    stripe?.redirectToCheckout({
      sessionId: res.id
    })
  });
 }
}
