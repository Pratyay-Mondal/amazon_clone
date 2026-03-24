export interface Product {
  id: number;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  rating: number;
  rating_count: number;
}

export interface User {
  id: number;
  email: string;
  name: string | null;
}
