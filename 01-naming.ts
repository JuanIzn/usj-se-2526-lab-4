class Product {
  constructor(
    public name: string,
    public price: number,
    public quantity: number,
    public hasDiscount: boolean
  ) {}
}

class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public isBlocked: boolean,
    public balance: number
  ) {}
}

class Order {
  constructor(
    public orderNumber: number,
    public user: User,
    public items: Product[],
    public status: string
  ) {}
}

class OrderManager {
  private orders: Order[] = [];
  private sendNotifications: boolean = true;

  processOrder(order: Order): boolean {
    if (!this.isOrderValid(order)) {
      console.log("Error: pedido inválido");
      return false;
    }

    const totalAmount = this.calculateTotal(order);
    if (totalAmount > 0) {
      this.finalizeOrder(order, totalAmount);
      return true;
    }

    return false;
  }

  private isOrderValid(order: Order): boolean {
    if (order.user.isBlocked) return false;
    return !this.hasOrderErrors(order);
  }

  private hasOrderErrors(order: Order): boolean {
    if (order.status !== "ready") return true;

    for (let item of order.items) {
      if (item.quantity <= 0) return true;
    }

    return false;
  }

  private calculateTotal(order: Order): number {
    let total = 0;
    for (let item of order.items) {
      let itemTotal = item.price * item.quantity;
      if (item.hasDiscount) {
        itemTotal *= 0.9;
      }
      total += itemTotal;
    }
    return total * 1.21; 
  }

  private finalizeOrder(order: Order, totalAmount: number): void {
    order.user.balance -= totalAmount;
    order.status = "done";
    this.orders.push(order);

    if (this.sendNotifications) {
      this.sendEmail(order.user.email, order.orderNumber);
    }
  }

  private sendEmail(email: string, orderNumber: number): void {
    console.log(`Email to ${email}: #${orderNumber}`);
  }

  processOrderById(orderNumber: number): boolean {
    const order = this.orders.find(o => o.orderNumber === orderNumber);
    if (order) {
      return this.processOrder(order);
    }
    return false;
  }
}

function main() {
  const manager = new OrderManager();

  const user1 = new User(1, "John", "j@test.com", false, 1000);
  const product1 = new Product("Laptop", 999, 1, true);
  const product2 = new Product("Mouse", 25, 2, false);
  const order1 = new Order(1001, user1, [product1, product2], "ready");

  const result = manager.processOrder(order1);
  console.log(result ? "OK" : "FAIL");
  console.log(`Balance: ${user1.balance}`);

  manager.processOrderById(1001);

  console.log(`Product: ${product1.name}`);
  console.log(`User ID: ${user1.id}`);
}

main();
