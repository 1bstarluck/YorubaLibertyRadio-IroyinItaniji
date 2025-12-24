
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Page } from '../types';
import TrashIcon from '../components/icons/TrashIcon';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div>
        <div className="sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 flex items-center justify-center p-4">
            <button onClick={() => navigate(-1)} className="absolute left-2 p-2 text-white">
                <ChevronLeftIcon />
            </button>
            <h1 className="text-xl font-bold text-white">Your Cart</h1>
        </div>

        <div className="p-4">
            {items.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-400">Your cart is empty.</p>
                    <Link to={Page.Shop} className="mt-4 inline-block text-yellow-400 font-semibold">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <ul className="space-y-4">
                        {items.map(item => (
                            <li key={item.product.id} className="flex items-center space-x-4 bg-gray-800 p-3 rounded-lg">
                                <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 rounded-md object-cover" />
                                <div className="flex-grow">
                                    <p className="font-semibold text-white">{item.product.name}</p>
                                    <p className="text-sm text-yellow-400">${item.product.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value, 10))}
                                        className="w-16 bg-gray-700 text-white p-1 rounded-md text-center"
                                        min="1"
                                    />
                                    <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-gray-500 hover:text-red-500">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 pt-6 border-t border-gray-700">
                        <div className="flex justify-between items-center text-lg">
                            <span className="text-gray-300">Subtotal</span>
                            <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
                        </div>
                        <Link to={Page.Checkout}>
                            <button className="w-full mt-4 bg-yellow-400 text-black font-bold py-3 rounded-md hover:bg-yellow-300 transition-colors">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    </div>
  );
};

export default CartPage;
