export interface Book extends BookData {
  id: string;
}

export interface BookData {
  name: string;
  price: string;
  category: string;
  description: string;
  author: string;
  imageUrl: string;
}
