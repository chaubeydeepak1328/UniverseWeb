import React from "react";

import universeCoin from "../assets/images/universeCoin.png";
import { RxCopy } from "react-icons/rx";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { Link, useLocation, useNavigate } from "react-router-dom";

import RightUserPannel from "../components/RightUserPannel";
import RightUserPannel1 from "../components/RightUserPannel1";
import { useDisconnect } from "@reown/appkit/react";
import Header from "../components/Header";
import { ToastContainer, toast } from 'react-toastify';

export default function UserPanel() {
  const { state } = useLocation();
  const { userId, userAddress, data } = state || {};

  console.log("User ID:", userId, userAddress, data);





  const handleCopy = (address) => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  return (
    <div
      style={{
        background: "linear-gradient(180deg, #000000, #25752D)",
      }}
    >
      <ToastContainer />
      <div className="max-w-6xl mx-auto p-4">
        {/* Top Header */}
        <Header />
        {/* Main Panel */}
        <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
          {/* Left Side Card */}
          <div
            className="flex flex-col rounded-2xl w-full lg:w-[350px] p-10 text-white text-center bg-white/10 backdrop-blur-md shadow-xl h-[102vh]"
            style={{
              background:
                "linear-gradient(180deg, rgba(11, 11, 142, 1) 0%, rgba(115, 118, 120, 1) 100%)",
            }}
          >
            <div className="flex justify-between items-center">
              <div className="text-6xl text-blue-500">
                {/* <RiBitCoinLine /> */}
                <img
                  src={universeCoin}
                  alt="universeCoin"
                  className="h-10 w-10"
                />
              </div>
              <div className="text-3xl font-bold">Id :{userId ? userId : "N/A"}</div>
            </div>
            <div className="bg-[#34c759] w-full rounded-sm mt-5 h-10 flex items-center justify-center lg:w-[260px] mx-auto">
              RAMA 0.000
            </div>
            <div className="mt-2 h-10 flex items-center justify-center w-full lg:w-[250px] mx-auto text-xl font-bold">
              {userAddress ? userAddress.slice(0, 7) + "..." + userAddress.slice(-7) : "0x"}
            </div>
            <div className="flex justify-between  mt-2 px-2">
              <FaExternalLinkAlt className="hover:text-blue-700 cursor-pointer" />
              <RxCopy onClick={() => handleCopy(userAddress)} className="text-xl font-bold hover:text-blue-700 cursor-pointer" />
            </div>
            <div className="bg-[#34c759] w-full rounded-sm mt-5 h-10 flex items-center justify-center lg:w-[260px] mx-auto">
              Ramestta Blockchain
            </div>
            <Link className="mt-2 h-10 flex items-center justify-center w-full lg:w-[250px] mx-auto hover:to-blue-700 ">
              https://ramestta.com
            </Link>
            <div className="bg-[#34c759] w-full rounded-sm mt-5 h-10 flex items-center justify-center lg:w-[260px] mx-auto">
              Sponser Address
            </div>
            <div className="text-xl font-bold">
              {data?.sponserAdd ? data?.sponserAdd?.slice(0, 7) + "..." + data?.sponserAdd?.slice(-7) : "Not Available"} {`(id 34)`}
            </div>
            <div className="flex justify-between  mt-2 px-2">
              <FaExternalLinkAlt className="hover:text-blue-700 cursor-pointer" />
              <RxCopy onClick={() => handleCopy(data?.sponserAdd)} className="text-xl font-bold hover:text-blue-700 cursor-pointer" />
            </div>

          </div>

          {/* Right Side Content */}

          {userId ? <RightUserPannel /> : <RightUserPannel1 />}



        </div>
      </div>
    </div>
  );
}
