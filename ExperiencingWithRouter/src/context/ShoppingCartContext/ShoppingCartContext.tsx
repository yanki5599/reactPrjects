import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../../types/product";
import { products } from "../../data/products";

export type CartItem = Product & { quantity: number };

interface ContextProps {
  products: CartItem[];
  updateCart: (product: CartItem, quantity: number) => void;
}

const ShoppingCartContext = createContext<ContextProps>({
  products: [],
  updateCart: () => {},
});

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

function format(products: Product[]): CartItem[] {
  return products.map((prod) => {
    return { ...prod, quantity: 0 };
  });
}

const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
  children,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<CartItem[]>(
    format(products)
  );

  function updateCart(product: CartItem, quantity: number) {
    const prodCpy = [...selectedProducts];
    const found = prodCpy.find((p) => p.id === product.id);
    if (!found) return;
    else found.quantity = quantity >= 0 ? quantity : 0;

    setSelectedProducts(prodCpy);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        products: selectedProducts,
        updateCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useGlobalShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export { ShoppingCartProvider };
