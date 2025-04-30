import React, { useState } from 'react';

const RightUserPannel1 = () => {
    const [referalAddress, setReferalAddress] = useState('');

    const [isValidser, setIsValidser] = useState(false);
    const [message, setMessage] = useState('');

    const handleValidation = () => {
        if (referalAddress.length === 0) {
            setMessage('Please enter a valid address');
            return;
        } else { setMessage('Valid Sponser address! You can proceed with registration.'); }
        // Example validation logic
        // const isValid = referalAddress.length > 0; // Check if the address is not empty
        setIsValidser(true);
    }

    const handleRegister = () => {
        // Example registration logic
        if (isValidser) {
            console.log('Registering with address:', referalAddress);
            // Add your registration logic here
        } else {
            console.log('Invalid address. Please enter a valid referral address.');
        }
    }



    // className = "w-full px-6 py-8 bg-white rounded-xl shadow-lg max-w-md mx-auto h-fit" 
    return (
        <div className="grid grid-cols-1 mt-10 border-[#3C71A9] border-2  p-6 text-center w-full px-6 py-8 bg-white rounded-xl shadow-lg max-w-md mx-auto text-white mx-auto h-fit"
            style={{
                background:
                    "linear-gradient(100deg, rgba(5, 53, 102, 1) 0%, rgba(169, 190, 10, 1) 100%)",
            }}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register Now</h2>

            <div className="space-y-4">
                <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700">
                    Referral Address
                </label>
                <input
                    type="text"
                    id="walletAddress"
                    value={referalAddress}
                    onChange={(e) => setReferalAddress(e.target.value)}
                    placeholder="Enter referral address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                />
                <p className="text-sm text-white">{message}</p>



                {isValidser ? <button onClick={handleRegister}
                    className="w-full bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold py-2 rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer"
                >
                    Register Now
                </button> :
                    <button onClick={handleValidation}
                        className="w-full bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold py-2 rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer"
                    >
                        Validate Address
                    </button>}



            </div>
        </div>
    );
};

export default RightUserPannel1;
