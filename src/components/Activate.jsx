
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import universeLogo from "../assets/images/universeLogo.png";
import { useTransaction } from '../config/register';
import { useAppKitAccount } from '@reown/appkit/react';
import { useStore } from '../Store/UserStore';

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function Activate() {
  const location = useLocation();
  const { ActivateSlot } = location.state || {};



  // for Modal
  // ========================================================
  const [showModal, setShowModal] = useState(false);
  // =========================================================

  const [trxData, setTrxData] = useState();

  const [loading, setLoading] = useState(false)

  const { handleSendTx, hash } = useTransaction(trxData !== null && trxData);


  const [userExist, setUserExist] = useState(false)

  const navigate = useNavigate();




  useEffect(() => {
    if (hash) {
      console.log("Transaction hash:", hash);

      setLoading(false)

      setShowModal(true)
    }
  }, [hash])


  useEffect(() => {
    const sendTx = async () => {
      try {
        await handleSendTx(trxData);
      } catch (error) {
        setLoading(false);
        alert("Something went wrong");
      }
    };

    if (trxData) {
      sendTx();
    }
  }, [trxData]);




  const { address, isConnected } = useAppKitAccount()

  const IsUserExist = useStore((state) => state.IsUserExist);


  const activateSlotU3 = useStore((state) => state.activateSlotU3)

  useEffect(() => {
    const NewSlotAcitvate = async () => {
      const res = await activateSlotU3(address, ActivateSlot);
      setTrxData(res);
    };
    if (address && userExist) NewSlotAcitvate();
  }, [userExist, address]);








  const ActivateNewMatric = async () => {


    if (isConnected) {

      // ==================================================================
      // chek if User Exist or not 
      // ==================================================================

      const user = await IsUserExist(address);
      console.log("this is User=========>", user?.userId?.toString(), user)

      if (user?.isexist) {
        setUserExist(true);
      } else {
        alert("User does not exist. Please register first.");
        setLoading(false);
        return;
      }

    } else {
      setUserExist(true)
      alert("Please Connect Wallet First");
      setLoading(false)
      return;
    }
  }


  const handleConfirm = () => {
    navigate("/user-panel-home")
  }




  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8"
      style={{
        background: "linear-gradient(180deg, #000000, #25752D)",
        backgroundSize: "100% 100%",
        backgroundAttachment: "fixed"
      }}
    >
      <div
        className="w-full max-w-xl rounded-2xl shadow-2xl p-8 sm:p-10 text-center backdrop-blur-lg border border-white/10"
        style={{
          background: 'linear-gradient(178deg, rgba(236, 238, 250, 0.9) 0%, rgba(9, 111, 114, 0.95) 42%)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 40px rgba(37, 117, 45, 0.15) inset'
        }}
      >
        <Link to="/user-panel-home" className="block transition-transform hover:scale-105 duration-300">
          <img src={universeLogo} alt="Logo" className="mx-auto h-28 sm:h-36 object-contain drop-shadow-lg" />
        </Link>

        <h2 className="mt-8 text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
          Slot to be activated
        </h2>

        <div className='border-2 border-yellow-300/50 bg-black/20 rounded-lg w-fit mx-auto p-6 my-6 backdrop-blur-sm shadow-inner'>
          <span className="text-yellow-300 text-4xl sm:text-5xl font-bold tracking-wider drop-shadow-lg">
            {ActivateSlot ?? "N/A"}
          </span>
        </div>

        <p className="text-sm sm:text-base text-white mt-4  p-3 rounded-lg inline-block">
          Check your wallet before proceeding to payment.
        </p>

        <button

          onClick={ActivateNewMatric}
          className="mt-8 inline-block w-full max-w-xs bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 text-white py-4 rounded-xl text-lg sm:text-xl font-semibold shadow-lg hover:scale-[1.03] hover:shadow-xl transition-all duration-300 border border-white/20"
        >
          Activate
        </button>

        <div className="mt-10 space-y-4">
          <Link
            to="/user-panel-home"
            className="block text-white hover:text-yellow-300 transition-colors"
          >
            <div className="flex items-center justify-center gap-2  py-3 px-4 rounded-lg border border-white/10 hover:bg-black/30 transition-all">
              <span className="font-medium">&gt;&gt;&gt; View Your Account &lt;&lt;&lt;</span>
            </div>
          </Link>

          <a
            href="#"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white border border-white/10 hover:bg-black/30 transition-all"
          >
            {/* <LuUserRound className="text-xl sm:text-2xl" /> */}
            <span>Check in Ramestta Smart Chain</span>
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-white text-sm opacity-80 bg-black/20 px-6 py-2 rounded-full">
        Telegram Channel: <a href="#" className="underline hover:text-yellow-300 transition-colors">@xyz</a>
      </div>

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 flex justify-center">
              <div className="bg-white rounded-full p-2 shadow-md">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white">
                Slot Activated Successfully
              </h2>

              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Transaction Hash:
                </p>
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3 border border-gray-100 dark:border-slate-600">
                  <p className="text-xs break-all text-blue-700 dark:text-blue-400 font-mono">
                    {hash}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConfirm}
                  className="px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Continue
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
}