class Order {
  constructor(
    public id: number,
    public customerName: string,
    public customerPhone: string,
    public items: string[],
    public quantities: number[],
    public prices: number[],
    public address: string
  ) {}
}

class RestaurantSystem {
  private orders: Order[] = [];

  processOrder(
    name: string,
    phone: string,
    items: string[],
    quantities: number[],
    prices: number[],
    address: string,
    cardNumber: string
  ): boolean {
    if (!this.isCustomerValid(name, phone)) return false;
    if (!this.isItemsValid(items, quantities)) return false;
    if (!this.isAddressValid(address)) return false;
    if (!this.isCardValid(cardNumber)) return false;

    const subtotal = this.calculateSubtotal(items, quantities, prices);
    const delivery = this.calculateDelivery(subtotal);
    const tax = this.calculateTax(subtotal);
    const total = subtotal + delivery + tax;

    console.log("Charging: $" + total);

    const orderId = Math.floor(Math.random() * 10000);
    const order = new Order(orderId, name, phone, items, quantities, prices, address);
    this.orders.push(order);

    this.printOrderSummary(order, total);
    this.notifyKitchen(orderId);
    this.sendSms(phone);

    return true;
  }

  private isCustomerValid(name: string, phone: string): boolean {
    if (name === "" || phone === "") {
      console.log("Customer missing");
      return false;
    }
    if (phone.length < 10) {
      console.log("Bad phone");
      return false;
    }
    return true;
  }

  private isItemsValid(items: string[], quantities: number[]): boolean {
    if (items.length === 0) {
      console.log("No items");
      return false;
    }
    for (let i = 0; i < items.length; i++) {
      if (quantities[i] <= 0) {
        console.log("Bad qty");
        return false;
      }
    }
    return true;
  }

  private isAddressValid(address: string): boolean {
    if (address.length < 10) {
      console.log("Bad addr");
      return false;
    }
    return true;
  }

  private isCardValid(cardNumber: string): boolean {
    if (cardNumber.length !== 16) {
      console.log("Bad card");
      return false;
    }
    return true;
  }

  private calculateSubtotal(items: string[], quantities: number[], prices: number[]): number {
    let subtotal = 0;
    for (let i = 0; i < items.length; i++) {
      subtotal += prices[i] * quantities[i];
    }
    return subtotal;
  }

  private calculateDelivery(subtotal: number): number {
    return subtotal > 50 ? 0 : 5;
  }

  private calculateTax(subtotal: number): number {
    return subtotal * 0.1;
  }

  private printOrderSummary(order: Order, total: number): void {
    console.log("ORDER #" + order.id);
    for (let i = 0; i < order.items.length; i++) {
      console.log(order.items[i] + " x" + order.quantities[i]);
    }
    console.log("Total: $" + total);
  }

  private notifyKitchen(orderId: number): void {
    console.log("KITCHEN: #" + orderId);
  }

  private sendSms(phone: string): void {
    console.log("SMS to " + phone);
  }

  cancelOrder(orderId: number): void {
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].id === orderId) {
        const order = this.orders[i];
        const total = this.calculateSubtotal(order.items, order.quantities, order.prices);

        console.log("Refund: $" + total);

        this.orders.splice(i, 1);

        console.log("SMS: Cancelled");
        console.log("AUDIT: #" + orderId);
        console.log("Customer: " + order.customerName);
        console.log("Address: " + order.address);
        break;
      }
    }
  }
}

function main02() {
  const restaurant = new RestaurantSystem();

  const success = restaurant.processOrder(
    "Alice",
    "5551234567",
    ["Pizza", "Salad"],
    [2, 1],
    [15, 8],
    "123 Main Street",
    "4111111111111111"
  );

  if (success) {
    console.log("Success!");
  }

  restaurant.cancelOrder(1234);
}

main02();
