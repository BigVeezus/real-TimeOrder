export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface OrderProps {
  id: string;
  status: string;
  items: OrderItem[];
  userId: string;
}

export class Order {
  public id: string;
  public status: string;
  public items: OrderItem[];
  public userId: string;

  constructor({ id, status, items, userId }: OrderProps) {
    this.id = id;
    this.status = status;
    this.items = items;
    this.userId = userId;
  }

  updateStatus(newStatus: string): void {
    this.status = newStatus;
  }
}
