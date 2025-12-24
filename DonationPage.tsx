
import React from 'react';
import PayPalIcon from '../components/icons/PayPalIcon';
import StripeIcon from '../components/icons/StripeIcon';

const DonationPage: React.FC = () => {
  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold text-white mb-2">Support Our Mission</h1>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        Your generous contribution helps us continue our independent broadcasting and amplify the voice of the Yoruba nation.
      </p>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4 max-w-sm mx-auto">
        <h2 className="text-xl font-semibold text-white">Make a Secure Donation</h2>
        <p className="text-sm text-gray-400">Choose your preferred payment method below. Thank you for your support!</p>
        
        <div className="space-y-3 pt-2">
            <button className="w-full flex items-center justify-center space-x-2 bg-[#00457C] text-white font-bold py-3 rounded-md hover:opacity-90">
                <PayPalIcon className="w-6 h-6" />
                <span>Donate with PayPal</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 bg-[#635BFF] text-white font-bold py-3 rounded-md hover:opacity-90">
                <StripeIcon className="w-12 h-6" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
