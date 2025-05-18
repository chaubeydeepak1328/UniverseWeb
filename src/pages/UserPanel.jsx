import React, { useEffect, useState } from "react";

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
import LeftUserPannel from "../components/LeftUserPannel";

export default function UserPanel() {

  const [userId, setUserId] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [data, setData] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.userId);
      setUserAddress(parsedUser.userAddress);
      setData(parsedUser.data);
    }
  }, []);


  console.log("User ID:", userId, userAddress, data);


  const [RamaValueUsd, setRamaValueUsd] = useState("345");





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
          <LeftUserPannel />

          {/* Right Side Content */}

          {userId ? <RightUserPannel /> : <RightUserPannel1 />}



        </div>
      </div>
    </div>
  );
}
