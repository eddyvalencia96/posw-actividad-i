import { Product } from '../models/product.model';
import { User } from '../models/user.model';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1001,
    title: 'Mock Running Shoes',
    price: 59.99,
    description: 'Comfortable running shoes for daily training.',
    category: 'sports',
    image: 'https://via.placeholder.com/300x300.png?text=Shoes',
    rating: { rate: 4.2, count: 120 }
  },
  {
    id: 1002,
    title: 'Mock Wireless Headphones',
    price: 89.5,
    description: 'Wireless headphones with noise reduction.',
    category: 'electronics',
    image: 'https://via.placeholder.com/300x300.png?text=Headphones',
    rating: { rate: 4.5, count: 87 }
  },
  {
    id: 1003,
    title: 'Mock Denim Jacket',
    price: 74,
    description: 'Classic fit denim jacket for all seasons.',
    category: 'fashion',
    image: 'https://via.placeholder.com/300x300.png?text=Jacket',
    rating: { rate: 4.1, count: 56 }
  },
  {
    id: 1004,
    title: 'Mock Smartwatch',
    price: 129.99,
    description: 'Track activity and notifications in real time.',
    category: 'electronics',
    image: 'https://via.placeholder.com/300x300.png?text=Smartwatch',
    rating: { rate: 4.6, count: 64 }
  },
  {
    id: 1005,
    title: 'Mock Office Chair',
    price: 149.99,
    description: 'Ergonomic office chair with lumbar support.',
    category: 'home',
    image: 'https://via.placeholder.com/300x300.png?text=Chair',
    rating: { rate: 4.3, count: 98 }
  },
  {
    id: 1006,
    title: 'Mock Reusable Bottle',
    price: 19.9,
    description: 'Insulated bottle to keep drinks cold and hot.',
    category: 'home',
    image: 'https://via.placeholder.com/300x300.png?text=Bottle',
    rating: { rate: 4.4, count: 112 }
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 501,
    email: 'alice.admin@example.com',
    username: 'alice-admin',
    phone: '555-1101',
    name_first: 'Alice',
    name_last: 'Garcia'
  },
  {
    id: 502,
    email: 'bruno.manager@example.com',
    username: 'bruno-manager',
    phone: '555-1102',
    name_first: 'Bruno',
    name_last: 'Lopez'
  },
  {
    id: 503,
    email: 'carla.ops@example.com',
    username: 'carla-ops',
    phone: '555-1103',
    name_first: 'Carla',
    name_last: 'Torres'
  }
];
