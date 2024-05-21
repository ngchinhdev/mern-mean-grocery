import { Injectable } from '@angular/core';
import { ICartItem } from '../models/carts.model';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cartItems: ICartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');

  constructor() { }

  setCartItems(cartItems: ICartItem[]) {
    this.cartItems = cartItems;
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: ICartItem) {
    const existingProduct = this.cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
      this.setCartItems(this.cartItems);
      return;
    }

    this.cartItems.push({ ...product, quantity: 1 });
    this.setCartItems(this.cartItems);
  }

  removeCartItem(id: string) {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
    this.setCartItems(this.cartItems);
  }

  increaseQuantity(id: string) {
    const existingProduct = this.cartItems.find((item) => item.id === id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      this.setCartItems(this.cartItems);
    }
  }

  decreaseQuantity(id: string) {
    const existingProduct = this.cartItems.find((item) => item.id === id);
    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity === 0) {
        this.removeCartItem(id);
      }
    }
    this.setCartItems(this.cartItems);
  }
}
