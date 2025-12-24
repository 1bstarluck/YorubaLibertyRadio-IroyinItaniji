
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import PayPalIcon from '../components/icons/PayPalIcon';
import StripeIcon from '../components/icons/StripeIcon';

const CheckoutPage: React.FC = () => {
    const { items } = useCart();
    const navigate = useNavigate();
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.08; // Example tax
    const total = subtotal + tax;

    return (
        <div>
            <div className="sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 flex items-center justify-center p-4">
                <button onClick={() => navigate(-1)} className="absolute left-2 p-2 text-white">
                    <ChevronLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-white">Checkout</h1>
            </div>

            <div className="p-4 space-y-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3 text-white">Order Summary</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Taxes</span><span>${tax.toFixed(2)}</span></div>
                        <div className="flex justify-between text-base font-bold border-t border-gray-700 pt-2 mt-2"><span className="text-white">Total</span><span>${total.toFixed(2)}</span></div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-3 text-white">Payment Method</h2>
                    <div className="space-y-3">
                         <button className="w-full flex items-center justify-center space-x-2 bg-[#00457C] text-white font-bold py-3 rounded-md hover:opacity-90">
                            <PayPalIcon className="w-6 h-6" />
                            <span>Pay with PayPal</span>
                        </button>
                         <button className="w-full flex items-center justify-center space-x-2 bg-[#635BFF] text-white font-bold py-3 rounded-md hover:opacity-90">
                            <StripeIcon className="w-12 h-6" />
                        </button>
                    </div>
                </div>
                
                <p className="text-center text-xs text-gray-600 pt-4">
                    Note: This is a user interface demonstration. Payment processing is not functional.
                </p>
            </div>
        </div>
    );
};

export default CheckoutPage;
