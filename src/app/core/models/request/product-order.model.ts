export class ProductOrder {
    constructor(
        public idProduct: number,
        public name: string,
        public detail: string,
        public count: number,
        public image: string,
        public subPrice: number
    ) { }
}