import React from "react";
import universeLogo from "../assets/images/universeLogo.png";
import universeCoin from "../assets/images/universeCoin.png";
import { RxCopy } from "react-icons/rx";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTelegram } from "react-icons/fa";
import RightUserPannel from "../components/RightUserPannel";
import RightUserPannel1 from "../components/RightUserPannel1";
import { useDisconnect } from "@reown/appkit/react";

export default function UserPanel() {
  const { state } = useLocation();
  const { userId, userAddress } = state || {};

  const navigate = useNavigate();

  const { disconnect } = useDisconnect();

  const handleDisconnect = async () => {
    try {
      await disconnect();
      navigate('/user-login');

    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };


  return (
    <div
      style={{
        background: "linear-gradient(180deg, #000000, #25752D)",
      }}
    >
      <div className="max-w-6xl mx-auto p-4">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-2 mx-4 md:mx-10">
          <Link to="/" className="rounded-3xl">
            <img src={universeLogo} alt="Logo" className="h-20 md:h-[100px]" />
          </Link>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-xl text-white mt-4 md:mt-0">
            {/* <div className="hover:text-blue-600">
              <a
                href="https://www.ramestta.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ramestta Blockchain
              </a>
            </div> */}
            <div className="hover:text-blue-600">
              <a
                href="https://t.me/ramauniverse"
                target="_blank"
                className="flex justify-center items-center gap-2"
              >
                <div>
                  <FaTelegram className="text-blue-500" />
                </div>
                <div>Official Channel</div>
              </a>
            </div>
            <div onClick={handleDisconnect} className="hover:text-red-600 flex items-center gap-2 cursor-pointer">
              <div>Logout</div>
              <RiLogoutCircleRLine className="text-red-500" />
            </div>
          </div>
        </div>
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
              <div className="text-3xl font-bold">Id {userId}</div>
            </div>
            <div className="bg-[#34c759] w-full rounded-sm mt-5 h-10 flex items-center justify-center lg:w-[260px] mx-auto">
              RAMA 0.000
            </div>
            <div className="mt-2 h-10 flex items-center justify-center w-full lg:w-[250px] mx-auto">
              {userAddress ? userAddress.slice(0, 7) + "..." + userAddress.slice(-7) : "0x"}
            </div>
            <div className="flex justify-between  mt-2 px-2">
              <FaExternalLinkAlt className="hover:text-blue-700" />
              <RxCopy className="text-xl font-bold hover:text-blue-700" />
            </div>
            <div className="bg-[#34c759] w-full rounded-sm mt-5 h-10 flex items-center justify-center lg:w-[260px] mx-auto">
              Ramestta Blockchain
            </div>
            <Link className="mt-2 h-10 flex items-center justify-center w-full lg:w-[250px] mx-auto hover:to-blue-700">
              https://ramestta.com
            </Link>
            <div className="bg-[#34c759] w-full rounded-sm mt-5 h-10 flex items-center justify-center lg:w-[260px] mx-auto">
              Universe Contract
            </div>
            <div className="flex justify-between  mt-2 px-2">
              <FaExternalLinkAlt className="hover:text-blue-700" />
              <div>  {userAddress ? userAddress.slice(0, 7) + "..." + userAddress.slice(-7) : "0x"}</div>
              <RxCopy className="text-xl font-bold hover:text-blue-700" />
            </div>
          </div>

          {/* Right Side Content */}

          {userId ? <RightUserPannel /> : <RightUserPannel1 />}



        </div>
      </div>
    </div>
  );
}
