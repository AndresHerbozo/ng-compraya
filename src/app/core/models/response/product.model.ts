import { Brand } from "./brand.model";
import { Category } from "./category.model";
import { Price } from "./price.model";
import { SubCategory } from "./subcategory.model";

export class Product {
    constructor(
        public productId: number,
        public name: string,
        public description: string,
        public detail: string,
        public idCategory: number,
        public subCategoryId: number,
        public initialStock: string,
        public initialReal: string,
        public status: string,
        public brandId: number,
        public idPrice: number,
        public category: Category,
        public brand: Brand,
        public subCategory: SubCategory,
        public price: Price,
        public image?: string,
        public priceExtract?: string
    ) { }
}