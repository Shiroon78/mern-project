import { create } from "zustand";

// Define an interface for a product
interface Product {
  _id?: string;
  name: string;
  price: number;
  image: string;
}

// Define an interface for the store
interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  createProducts: (
    newProduct: Product
  ) => Promise<{ success: boolean; message: string }>;
  fetchProducts: () => Promise<void>;
  deleteProducts: (
    id: string
  ) => Promise<{ success: boolean; message: string }>;
  editProduct: (
    id: string,
    updatedProduct: Product
  ) => Promise<{ success: boolean; message: string }>;
}

// Create the store with type annotations
export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProducts: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required" };
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      const data = await res.json();
      return {
        success: true,
        message: "Product created successfully",
        data: data.data,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      } else {
        return { success: false, message: "An unknown error occurred" };
      }
    }
  },

  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  deleteProducts: async (id: string) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE", // Ensure DELETE method is used
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));

    return { success: true, message: data.message };
  },
  editProduct: async (id: string, updatedProduct: Product) => {
    if (
      !updatedProduct.name ||
      !updatedProduct.price ||
      !updatedProduct.image
    ) {
      return { success: false, message: "All fields are required" };
    }
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) {
        throw new Error("Failed to update product");
      }
      const data = await res.json();
      return {
        success: true,
        message: "Product updated successfully",
        data: data.data,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      } else {
        return { success: false, message: "An unknown error occurred" };
      }
    }
  },
}));
