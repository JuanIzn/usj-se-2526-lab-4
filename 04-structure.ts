class Book {
  private title: string;
  public isbn: string;
  public author: string;

  constructor(title: string, isbn: string, author: string) {
    this.title = title;
    this.isbn = isbn;
    this.author = author;
  }

  saveToDatabase(): void {
    console.log("INSERT INTO books...");
  }

  getTitle(): string {
    return this.title;
  }

  sendNotification(email: string): void {
    console.log("Email to: " + email);
  }
}

class LibraryManager {
  private calculateFee(days: number): number {
    return days * 0.5;
  }

  public getBook(isbn: string): Book {
    console.log("SELECT * FROM books WHERE isbn = " + isbn);
    return new Book("Sample", isbn, "Author");
  }

  private logActivity(action: string): void {
    console.log("LOG: " + action);
  }

  public checkoutBook(bookISBN: string, userName: string): boolean {
    console.log("UPDATE books SET available = false");
    this.logActivity("Checkout: " + bookISBN);
    console.log("Email to " + userName);

    return this.validateUser(userName);
  }

  private validateUser(userName: string): boolean {
    return userName.length > 0;
  }

  public returnBook(isbn: string, userName: string, daysLate: number): void {
    if (daysLate > 0) {
      const fee = this.calculateFee(daysLate);
      console.log("UPDATE users SET balance = balance - " + fee);
    }
    console.log("UPDATE books SET available = true");

    if (this.checkAvailability(isbn)) {
      console.log("Book available again");
    }
  }

  public searchBooksByAuthor(author: string): Book[] {
    console.log("SELECT * FROM books WHERE author = " + author);
    return [];
  }

  public reserveBook(bookId: string, userName: string): void {
    console.log("INSERT INTO reservations...");
    this.logActivity("Reserve: " + bookId + " for " + userName);
  }

  private checkAvailability(bookIsbn: string): boolean {
    return true;
  }

  public findBooksByTitle(title: string): Book[] {
    console.log("Finding books with title: " + title);
    return [];
  }
}

class UserAccount {
  public name: string;
  private email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  loadFromDatabase(id: number): void {
    console.log("SELECT * FROM users WHERE id = " + id);
  }

  getEmail(): string {
    return this.email;
  }

  chargeLateFee(amount: number): void {
    console.log("Processing payment of $" + amount);
  }
}

function main04() {
  const manager = new LibraryManager();

  const book = new Book("Clean Code", "123", "Martin");
  book.saveToDatabase();
  book.sendNotification("user@email.com");

  manager.checkoutBook("123", "john@email.com");

  manager.returnBook("123", "john", 5);

  const user = new UserAccount("John", "john@email.com");
  user.loadFromDatabase(1);
  user.chargeLateFee(2.5);

  console.log("Book title: " + book.getTitle());
  console.log("Book author: " + book.author);
  console.log("User email: " + user.getEmail());
  console.log("User name: " + user.name);

  manager.searchBooksByAuthor("Martin");
  manager.findBooksByTitle("Clean");
  manager.reserveBook("456", "ALICE");

  const newBook = manager.getBook("789");
  console.log("Got book: " + newBook.isbn);
}

main04();
