import readlineSync from "readline-sync";

class Product {
  id: number;
  name: string;
  price: number;
  honoraryСode: string;
  state: ProductState;

  constructor(id: number, name: string, honoraryСode: string) {
    this.id = id;
    this.name = name;
    this.price = 0;
    this.honoraryСode = honoraryСode;
    this.state = new InStockState(this);
  }

  raisePrice(): void {
    this.state.raisePrice(this);
  }

  setUp(): void {
    this.state.setUp(this);
  }

  setOff(): void {
    this.state.setOff(this);
  }

  giveToTheWinner(): void {
    this.state.giveToTheWinner(this);
  }
}

interface ProductState {
  raisePrice(product: Product): any;
  setUp(product: Product): any;
  giveToTheWinner(product: Product): any;
  setOff(product: Product): any;
}

class InStockState implements ProductState {
  constructor(private product: Product) {}

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

class ForSaleState implements ProductState {
  constructor(private product: Product) {}

  raisePrice(): void {
    const price = readlineSync.questionFloat(
      "На сколько повысить цену продукта? "
    );
    if (isNaN(price) || price < 0) {
      console.log("Некорректное значение цены.");
    } else {
      this.product.price += price;
      console.log(`Цена продукта повышена на ${price}.`);
    }
  }

  setUp(): void {
    console.log("Продукт уже выставлен на торги.");
  }

  setOff(): void {
    this.product.state = new InStockState(this.product);
    this.product.price = 0;
    console.log("Продукт снят с торгов и возвращен на склад.");
  }

  giveToTheWinner(): void {
    if (this.product.price === 0) {
      console.log("Нельзя отдать продукт бесплатно.");
    } else {
      this.product.state = new SoldState(this.product);
      console.log("Продукт продан.");
    }
  }
}

class SoldState implements ProductState {
  constructor(private product: Product) {}

  raisePrice(): void {
    console.log("Продукт уже продан.");
  }

  setUp(): void {
    console.log("Продукт уже продан.");
  }

  giveToTheWinner(): void {
    console.log("Продукт уже продан.");
  }

  setOff(): void {
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
  const action = readlineSync.question("Select an action: ");

  switch (action) {
    case "1":
      console.log("№   | Продукт   | Цена | Состояние | Почетный код ");
      for (let i = 0; i < products.length; i++) {
        console.log(
          `${products[i].id}   | ${products[i].name}| ${products[i].price} | ${products[i].state.constructor.name} | ${products[i].honoraryСode}`
        );
      }
      break;
    case "2":
      const answer = readlineSync.questionFloat("Enter the product number:");
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

      const action = readlineSync.questionFloat("Select an action: ");

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
