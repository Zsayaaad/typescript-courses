export class Book {
  deweyDecimalNumber(): number {
    return 42
  }
}

// That means that the DataTypeRegistry interface is now in `../lib/registry` file
declare module '../lib/registry' {
  export interface DataTypeRegistry {
    book: Book
  }
}
