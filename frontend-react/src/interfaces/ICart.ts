export interface ICartItem {
    id: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
}

export interface ICartState {
    items: ICartItem[];
}