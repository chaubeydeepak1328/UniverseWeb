import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeAddress } from '../util/helpers';

const TransactionModal = ({ isOpen, hash, userWallet, sponsorWallet }) => {
    const [timer, setTimer] = useState(15);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && timer > 0) {
            const countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
            return () => clearTimeout(countdown);
        } else if (timer === 0) {
            removeAddress()
            navigate('/');
        }
    }, [timer, isOpen, navigate]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-gradient-to-b from-gray-900 to-gray-950 text-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative border border-gray-800">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-green-500/20 rounded-full p-4">
                    <div className="bg-green-500 rounded-full p-4">
                        <span className="text-4xl">🎉</span>
                    </div>
                </div>

                <h2 className="text-2xl text-center font-bold mt-4 mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Registration Successful!
                </h2>

                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-400">Auto-redirect in</p>
                        <p className="font-bold text-green-400">{timer}s</p>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-1000 ease-linear"
                            style={{ width: `${((15 - timer) / 15) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                        <p className="text-sm text-gray-400 mb-1">Transaction Hash</p>
                        <p className="font-mono text-emerald-400 break-all text-sm">{hash}</p>
                    </div>

                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                        <p className="text-sm text-gray-400 mb-1">User Wallet</p>
                        <div className="flex items-center justify-between">
                            <p className="font-mono text-gray-200 break-all text-sm">{userWallet}</p>
                            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">ID: 23</span>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                        <p className="text-sm text-gray-400 mb-1">Sponsor Wallet</p>
                        <div className="flex items-center justify-between">
                            <p className="font-mono text-gray-200 break-all text-sm">{sponsorWallet}</p>
                            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">ID: 34</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;