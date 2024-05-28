import { ProductItem } from "./productItem";

export class OrderItem {
    constructor(
        public orderDayHour: string,
        public orderType: string,
        public adress: string,
        public info: string,
        public products: number[]
    ) { }
}