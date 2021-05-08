export class Price {
    constructor(
        public _id: string,
        public idPrice: number, 
        public price: string,
        public initialDate: Date,
        public endDate: Date,
        public type: number,
        public descriptionType: string
    ) { }
}