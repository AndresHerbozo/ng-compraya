export class Order {
    constructor(
        public idProduct: number,
        public count: number,
        public name: string,
        public fathersLastName: string,
        public mothersLastName: string,
        public dni: number,
        public idTienda: number
    ) { }
}