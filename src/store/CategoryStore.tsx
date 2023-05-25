import { Category } from '@/utils/types/_Category'
import { create } from 'zustand'

interface MyState {
  categoryIdSelected: Category['id']
  setCategoryIdSelected: (categoryId: Category['id']) => void
}

export const useCategoryStore = create<MyState>()(set => ({
  categoryIdSelected: 1,
  setCategoryIdSelected: categoryId => {
    set({ categoryIdSelected: categoryId })
  },
}))
