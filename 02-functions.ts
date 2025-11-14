class RestaurantOrder {  //Should I merge both RestaurantOrder classes?
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
  private RestaurantOrders: RestaurantOrder[] = [];

  processRestaurantOrder(
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

    const RestaurantOrderId = Math.floor(Math.random() * 10000);
    const RestaurantOrder = new RestaurantOrder(RestaurantOrderId, name, phone, items, quantities, prices, address);
    this.RestaurantOrders.push(RestaurantOrder);

    this.printRestaurantOrderSummary(RestaurantOrder, total);
    this.notifyKitchen(RestaurantOrderId);
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

  private printRestaurantOrderSummary(RestaurantOrder: RestaurantOrder, total: number): void {
    console.log("RestaurantOrder #" + RestaurantOrder.id);
    for (let i = 0; i < RestaurantOrder.items.length; i++) {
      console.log(RestaurantOrder.items[i] + " x" + RestaurantOrder.quantities[i]);
    }
    console.log("Total: $" + total);
  }

  private notifyKitchen(RestaurantOrderId: number): void {
    console.log("KITCHEN: #" + RestaurantOrderId);
  }

  private sendSms(phone: string): void {
    console.log("SMS to " + phone);
  }

  cancelRestaurantOrder(RestaurantOrderId: number): void {
    for (let i = 0; i < this.RestaurantOrders.length; i++) {
      if (this.RestaurantOrders[i].id === RestaurantOrderId) {
        const RestaurantOrder = this.RestaurantOrders[i];
        const total = this.calculateSubtotal(RestaurantOrder.items, RestaurantOrder.quantities, RestaurantOrder.prices);

        console.log("Refund: $" + total);

        this.RestaurantOrders.splice(i, 1);

        console.log("SMS: Cancelled");
        console.log("AUDIT: #" + RestaurantOrderId);
        console.log("Customer: " + RestaurantOrder.customerName);
        console.log("Address: " + RestaurantOrder.address);
        break;
      }
    }
  }
}

function main02() {
  const restaurant = new RestaurantSystem();

  const success = restaurant.processRestaurantOrder(
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

  restaurant.cancelRestaurantOrder(1234);
}

main02();