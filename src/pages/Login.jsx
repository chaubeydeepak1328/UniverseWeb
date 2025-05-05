import React, { useEffect, useState } from "react";
import universeLogo from "../assets/images/universeLogo.png";
import { LuUserRound } from "react-icons/lu";
import { Link } from "react-router-dom";

import { useAppKit } from '@reown/appkit/react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


import {
  useAppKitAccount,
} from '@reown/appkit/react'
import { useSearchParams } from 'react-router-dom';

import { useStore } from '../Store/UserStore';
import { setWalletAddress } from "../util/helpers";

export default function Login() {
  const getAllusers = useStore((state) => state.getAllusers);
  const IsUserExist = useStore((state) => state.IsUserExist);


  const { open } = useAppKit(); // This triggers wallet connection
  const { address, isConnected } = useAppKitAccount();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState('');


  const [walletPrompted, setWalletPrompted] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await open(); // Trigger wallet connection
      setWalletPrompted(true);
    } catch (err) {
      console.error('Wallet connect error:', err);
    }
  };

  useEffect(() => {
    const checkUserAfterConnect = async () => {
      if (walletPrompted && isConnected && address) {
        try {
          setWalletAddress(address)
          const user = await IsUserExist(address);
          console.log("this is User=========>", user?.userId?.toString(), user)

          navigate('/user-panel-home', {
            state: {
              userId: user?.userId?.toString() || null,
              userAddress: user?.walletAdd, data: user || null,
            }
          });
        } catch (err) {
          console.error("Error checking user:", err);
          toast.error("Failed to verify user.");
        } finally {
          setWalletPrompted(false); // Reset to prevent re-trigger
        }
      }
    };

    checkUserAfterConnect();
  }, [walletPrompted, isConnected, address]);


  const handleUserIdClick = async (e) => {
    e.preventDefault(); // prevent navigation

    if (inputData) {
      // Perform any action with the input data, like navigating to a user panel
      console.log("User ID entered:", inputData);

      const userAddress = await getAllusers(inputData)
      console.log("User Address:", userAddress); // Log the fetched users to the console

      if (userAddress) {
        setWalletAddress(userAddress)
        navigate('/user-panel-home', { state: { userId: inputData, userAddress } });
      }
    } else {
      // alert("Please enter a valid user ID.");
      toast("Please enter a valid user ID.")
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-800">
      <ToastContainer />

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
            Ramestta Newtork
          </p>

          {/* Authorization Button */}
          <button
            // to="/d-matrix"
            onClick={handleClick}
            className="w-full max-w-xs mt-6 rounded-xl text-lg sm:text-xl font-semibold text-black py-3 text-center transition hover:brightness-110 cursor-pointer"
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
              className="mt-4 w-full max-w-xs px-4 py-2 rounded-md text-center bg-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter user id"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
          </div>

          {/* Viewing Button */}
          <button
            // to="/user-panel-home"
            onClick={handleUserIdClick}
            className="w-full max-w-xs mt-8 rounded-xl text-lg sm:text-xl font-semibold text-black py-3 text-center transition hover:brightness-110 cursor-pointer"
            style={{
              background:
                "linear-gradient(262deg, rgba(32, 173, 29, 1) 0%, rgba(239, 185, 10, 1) 50%)",
            }}
          >
            Viewing
          </button>

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
