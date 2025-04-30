



import React, { useEffect } from "react";
import universeLogo from "../assets/images/universeLogo.png";
import { LuUserRound } from "react-icons/lu";
import { Link } from "react-router-dom";

import { useAppKit } from '@reown/appkit/react';
import { useNavigate } from 'react-router-dom';


import {
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo
} from '@reown/appkit/react'

export default function Login() {

  const { open } = useAppKit(); // This triggers wallet connection
  const { address, caipAddress, isConnected, status, embeddedWalletInfo } = useAppKitAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate('/d-matrix');
    }
  }, [isConnected])

  const handleClick = async (e) => {
    e.preventDefault(); // prevent navigation

    try {
      await open(); // open wallet connect modal

      console.log("Wallet connected:", address, caipAddress, isConnected, status, embeddedWalletInfo); // Log the connected address

      // Optional: wait for wallet connection, then navigate
      // You could check if connected using `useAppKitAccount`'s `isConnected`

      // navigate('/d-matrix'); // navigate manually after connection
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-800">
      <div className="flex flex-col items-center py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        <div
          className="flex flex-col justify-start items-center rounded-xl w-full max-w-xl p-6 sm:p-10 bg-gradient-to-b from-[#eceefa] via-[#096f72e8] to-[#096f72e8] shadow-lg"
        >
          {/* Logo */}
          <Link to="/">
            <img
              src={universeLogo}
              alt="Logo"
              className="h-24 sm:h-36 object-contain"
            />
          </Link>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-bold mt-6 text-white text-center">
            The Entrance to the Office
          </h1>
          <p className="text-center text-lg sm:text-xl mt-2 text-white">
            Rama Wallet
          </p>

          {/* Authorization Button */}
          <button
            // to="/d-matrix"
            onClick={handleClick}
            className="w-full max-w-xs mt-6 rounded-xl text-lg sm:text-xl font-semibold text-black py-3 text-center transition hover:brightness-110"
            style={{
              background:
                "linear-gradient(262deg, rgba(32, 173, 29, 1) 0%, rgba(239, 185, 10, 1) 50%)",
            }}
          >
            Authorization
          </button>

          {/* ID Input Section */}
          <div className="mt-6 text-center text-white">
            <h2 className="text-xl sm:text-2xl">To View, enter the account ID</h2>
            <input
              type="text"
              className="mt-4 w-full max-w-xs px-4 py-2 rounded-md text-center bg-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user id"
            />
          </div>

          {/* Viewing Button */}
          <Link
            to="/user-panel-home"
            className="w-full max-w-xs mt-8 rounded-xl text-lg sm:text-xl font-semibold text-black py-3 text-center transition hover:brightness-110"
            style={{
              background:
                "linear-gradient(262deg, rgba(32, 173, 29, 1) 0%, rgba(239, 185, 10, 1) 50%)",
            }}
          >
            Viewing
          </Link>

          {/* Join Info */}
          <div className="mt-10 text-center text-white">
            <p className="text-sm sm:text-lg">Join if you are not yet with us:</p>
            <div className="mt-2 flex items-center justify-center gap-2 text-sm sm:text-lg cursor-pointer hover:underline">
              <LuUserRound className="text-xl sm:text-2xl" />
              Check in Binance Smart Chain
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-white text-sm sm:text-base">
          Telegram channel: @xyz
        </div>
      </div>
    </div>
  );
}
