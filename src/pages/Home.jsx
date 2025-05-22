import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import universeLogo from "../assets/images/universeLogo.png";
import { CiYoutube } from "react-icons/ci";
import { FiLink } from "react-icons/fi"; import { TbLogin } from "react-icons/tb";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useStore } from "../Store/UserStore";
import { FaTelegram } from "react-icons/fa";




export default function Home() {

  const { open } = useAppKit();
  const IsUserExist = useStore((state) => state.IsUserExist);

  const { address, isConnected } = useAppKitAccount();

  const navigate = useNavigate();



  const [joinClicked, setJoinClicked] = useState(false);


  useEffect(() => {
    const checkUser = async () => {

      const localAddress = JSON.parse(localStorage.getItem("userData"))?.userAddress;

      if ((isConnected && address) && localAddress) {
        const user = await IsUserExist(address); // Await here
        navigate('/user-panel-home', {
          state: {
            userId: user?.userId?.toString() || null,
            userAddress: user?.walletAdd,
            data: user || null,
          }
        });
      }
    };

    checkUser();
  }, [joinClicked, address, isConnected]);



  const handleClick = async (e) => {
    e.preventDefault();
    if (!address && !isConnected) {
      try {
        await open(); // Trigger wallet connection

        setJoinClicked(true);
      } catch (err) {
        console.error('Wallet connect error:', err);
      }
    } else {
      const user = await IsUserExist(address);
      navigate('/user-panel-home', {
        state: {
          userId: user?.userId?.toString() || null,
          userAddress: user?.walletAdd, data: user || null,
        }
      });
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    await handleClick(e);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full min-h-screen bg-black flex flex-col items-center justify-start pt-20 px-4 md:px-10 overflow-hidden">

        {/* Image at top center */}
        <div className="z-10 mb-4 flex justify-center">
          <img
            src={universeLogo}
            alt="Universe Top Art"
            className="w-60 sm:w-80 md:w-[650px] object-contain"
          />
        </div>

        {/* Text Content */}
        <div className="z-10 flex flex-col items-center text-center">


          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-10">
            <Link
              to="/user-login"
              className="h-14 w-64 flex justify-center items-center gap-2 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white text-lg font-semibold rounded-xl shadow-xl border border-transparent hover:border-white hover:scale-105 transition-all duration-300 ease-in-out"
            > <FiLink className="text-2xl" />

              <div>Login</div>
            </Link>
            <div className="flex justify-center items-center h-14 w-64 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
              <button
                // to="/erv-token-home"
                className="px-6 py-3 text-white text-md font-semibold flex justify-center items-center gap-2 "
              >
                <CiYoutube className="text-3xl" />
                <a
                  href="https://t.me/ramauniverse"
                  target="_blank"
                  className="flex justify-center items-center gap-2"
                >
                  <div>
                    {/* <FaTelegram className="text-blue-500" /> */}
                  </div>
                  <div>Join Telegram community</div>
                </a>
              </button>
            </div>
            <button
              onClick={handleJoin}
              className="h-14 w-64 flex justify-center items-center ga-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-lg font-semibold rounded-xl shadow-xl border border-transparent hover:border-white hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <TbLogin className="text-3xl" />
              Join Now
            </button>
          </div>

          {/* Tagline */}
          <div className="mt-6">

          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute  bottom-[100px] md:bottom-6 animate-bounce text-white text-sm opacity-60">
          Scroll Down ↓
        </div> */}
      </div>


    </div>
  );
}

