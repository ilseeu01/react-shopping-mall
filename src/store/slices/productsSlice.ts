import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductsState {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  isLoading: boolean;
  error: string | null;
}

// 즉시 표시할 더미 상품 데이터
const fallbackProducts: Product[] = [
  {
    id: 1,
    title: "Stylish Backpack",
    price: 29.99,
    description: "A comfortable and stylish backpack for everyday use",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    rating: { rate: 4.5, count: 124 }
  },
  {
    id: 2,
    title: "Wireless Headphones",
    price: 79.99,
    description: "High-quality wireless headphones with noise cancellation",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    rating: { rate: 4.3, count: 89 }
  },
  {
    id: 3,
    title: "Cotton T-Shirt",
    price: 19.99,
    description: "Comfortable 100% cotton t-shirt in various colors",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    rating: { rate: 4.7, count: 256 }
  },
  {
    id: 4,
    title: "Coffee Mug",
    price: 12.99,
    description: "Ceramic coffee mug with ergonomic handle",
    category: "home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop",
    rating: { rate: 4.2, count: 67 }
  },
  {
    id: 5,
    title: "Running Shoes",
    price: 89.99,
    description: "Lightweight running shoes with excellent cushioning",
    category: "sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    rating: { rate: 4.6, count: 178 }
  },
  {
    id: 6,
    title: "Smartphone Case",
    price: 15.99,
    description: "Protective case for smartphones with drop protection",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=300&h=300&fit=crop",
    rating: { rate: 4.1, count: 92 }
  }
];

const fallbackCategories = ['accessories', 'electronics', 'clothing', 'home', 'sports'];

const initialState: ProductsState = {
  products: fallbackProducts,
  categories: fallbackCategories,
  selectedCategory: 'all',
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    console.log('fetchProducts: Starting API call to FakeStore');
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      console.log('fetchProducts: Response received', response.status, response.ok);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log('fetchProducts: Data parsed', data.length, 'products');
      return data;
    } catch (error) {
      console.error('fetchProducts: Error occurred', error);
      throw error;
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    console.log('fetchCategories: Starting API call to FakeStore');
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      console.log('fetchCategories: Response received', response.status, response.ok);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      console.log('fetchCategories: Data parsed', data.length, 'categories');
      return data;
    } catch (error) {
      console.error('fetchCategories: Error occurred', error);
      throw error;
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        console.log('productsSlice: fetchProducts.pending');
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log('productsSlice: fetchProducts.fulfilled', action.payload.length, 'products');
        state.isLoading = false;
        // API 데이터로 교체
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log('productsSlice: fetchProducts.rejected', action.error);
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchCategories.pending, (state) => {
        console.log('productsSlice: fetchCategories.pending');
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        console.log('productsSlice: fetchCategories.fulfilled', action.payload.length, 'categories');
        // API 카테고리로 교체
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        console.log('productsSlice: fetchCategories.rejected', action.error);
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export const { setSelectedCategory, clearError } = productsSlice.actions;
export default productsSlice.reducer;