"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
class Product {
    constructor(id, name, honoraryСode) {
        this.id = id;
        this.name = name;
        this.price = 0;
        this.honoraryСode = honoraryСode;
        this.state = new InStockState(this);
    }
    raisePrice() {
        this.state.raisePrice(this);
    }
    setUp() {
        this.state.setUp(this);
    }
    setOff() {
        this.state.setOff(this);
    }
    giveToTheWinner() {
        this.state.giveToTheWinner(this);
    }
}
class InStockState {
    constructor(product) {
        this.product = product;
    }
    raisePrice() {
        console.log("Продукт не участвует в торгах");
    }
    setUp() {
        this.product.state = new ForSaleState(this.product);
        console.log("Продукт выставлен на аукцион");
    }
    giveToTheWinner() {
        console.log("Продукт нельзя продавать сразу со склада");
    }
    setOff() {
        console.log("Нельзя снять с торгов продукт, который в них не участвует");
    }
}
class ForSaleState {
    constructor(product) {
        this.product = product;
    }
    raisePrice() {
        const price = readline_sync_1.default.questionFloat("На сколько повысить цену продукта? ");
        if (isNaN(price) || price < 0) {
            console.log("Некорректное значение цены.");
        }
        else {
            this.product.price += price;
            console.log(`Цена продукта повышена на ${price}.`);
        }
    }
    setUp() {
        console.log("Продукт уже выставлен на торги.");
    }
    setOff() {
        this.product.state = new InStockState(this.product);
        this.product.price = 0;
        console.log("Продукт снят с торгов и возвращен на склад.");
    }
    giveToTheWinner() {
        if (this.product.price === 0) {
            console.log("Нельзя отдать продукт бесплатно.");
        }
        else {
            this.product.state = new SoldState(this.product);
            console.log("Продукт продан.");
        }
    }
}
class SoldState {
    constructor(product) {
        this.product = product;
    }
    raisePrice() {
        console.log("Продукт уже продан.");
    }
    setUp() {
        console.log("Продукт уже продан.");
    }
    giveToTheWinner() {
        console.log("Продукт уже продан.");
    }
    setOff() {
        console.log("Нельзя снять с торгов проданный продукт.");
    }
}
const iphone = new Product(1, "iphone 5s", "2djnddsj15");
const laptop = new Product(2, "laptop np 2k", "2151dcvsdvbs");
const phone = new Product(3, "Xiaomi mi 10", "nvsldvn6512");
const products = [iphone, laptop, phone];
while (true) {
    console.log("Выберите действие:");
    console.log("1. Список продуктов");
    console.log("2. Выбрать продукт");
    console.log("3. Выйти");
    const action = readline_sync_1.default.question("Select an action: ");
    switch (action) {
        case "1":
            console.log("№   | Продукт   | Цена | Состояние | Почетный код ");
            for (let i = 0; i < products.length; i++) {
                console.log(`${products[i].id}   | ${products[i].name}| ${products[i].price} | ${products[i].state.constructor.name} | ${products[i].honoraryСode}`);
            }
            break;
        case "2":
            const answer = readline_sync_1.default.questionFloat("Enter the product number:");
            const index = answer - 1;
            if (isNaN(index) || index < 0 || index >= products.length) {
                console.log("Некорректный номер продукта.");
            }
            const product = products[index];
            console.log(`Выбран продукт ${product.name}.`);
            console.log("1. Выставить на аукцион");
            console.log("2. Поднять цену");
            console.log("3. Выдать победителю");
            console.log("4. Снять с торгов");
            const action = readline_sync_1.default.questionFloat("Select an action: ");
            switch (action) {
                case 1:
                    product.setUp();
                    break;
                case 2:
                    product.raisePrice();
                    break;
                case 3:
                    product.giveToTheWinner();
                    break;
                case 4:
                    product.setOff();
                    break;
                default:
                    console.log("Некорректный выбор действия.");
                    break;
            }
            break;
        case "3":
            console.log("До свидания!");
            process.exit(0);
    }
}
//# sourceMappingURL=index.js.map