export interface Order {
  id?: number;
  user_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
  username?: string;
  product_name?: string;
}

export interface OrderWithDetails extends Order {
  username: string;
  product_name: string;
}