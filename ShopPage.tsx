
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import ShoppingCartIcon from '../components/icons/ShoppingCartIcon';

const defaultProducts: Product[] = [
    { id: 1, name: 'YLR Emergency Radio', price: 59.99, imageUrl: 'https://picsum.photos/seed/radio-ad/400/400' },
    { id: 2, name: 'YLR Branded T-Shirt', price: 24.99, imageUrl: 'https://picsum.photos/seed/shirt/400/400' },
    { id: 3, name: '"Iroyin Itaniji" Mug', price: 14.99, imageUrl: 'https://picsum.photos/seed/mug/400/400' },
    { id: 4, name: 'Liberty Cap', price: 19.99, imageUrl: 'https://picsum.photos/seed/cap/400/400' },
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart } = useCart();
    
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="font-bold text-white truncate">{product.name}</h3>
                <div className="flex justify-between items-center mt-3">
                    <span className="text-lg font-semibold text-yellow-400">${product.price.toFixed(2)}</span>
                    <button 
                        onClick={() => addToCart(product)}
                        className="bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-300 transition-colors"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCartIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ShopPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const storedProducts = localStorage.getItem('shop_products');
        if (storedProducts) {
            try {
                setProducts(JSON.parse(storedProducts));
            } catch (e) {
                console.error("Failed to parse products", e);
                setProducts(defaultProducts);
            }
        } else {
            setProducts(defaultProducts);
        }
        
        // Listen for updates from Admin
        const handleStorageChange = () => {
             const updated = localStorage.getItem('shop_products');
             if(updated) setProducts(JSON.parse(updated));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-white">Marketplace</h1>
            {products.length === 0 ? (
                 <p className="text-gray-500 text-center">No products available.</p>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShopPage;
