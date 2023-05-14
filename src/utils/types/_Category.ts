export interface Category {
  id: number
  name: string
  createdAt?: number
  updatedAt?: number
}

export interface CategoryCreate extends Omit<Category, 'id'> {
  id?: number
}
