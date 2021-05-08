export class OrderConfirm {
    constructor(
        public _id: string,
        public idProduct: number,
        public count: number,
        public name: string,
        public fathersLastName: string,
        public mothersLastName: string,
        public dni: number,
        public idTienda: number,
        public token: string
    ) { }
}