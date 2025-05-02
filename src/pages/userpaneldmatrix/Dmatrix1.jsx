import React, { useState } from "react";
import universeLogo from "../../assets/images/universeLogo.png";
import universeCoin from "../../assets/images/universeCoin.png";
import { RxCopy } from "react-icons/rx";
import {
  FaExternalLinkAlt,
  FaTelegram,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { PiLineVerticalLight } from "react-icons/pi";
import { GiCircle } from "react-icons/gi";
import { TfiReload } from "react-icons/tfi";
import { LuUsers } from "react-icons/lu";
import { Link } from "react-router-dom";
import { PiUsersFourBold } from "react-icons/pi";
import { GiSplitArrows } from "react-icons/gi";
import { MdOutlineContactMail } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";

import LeftUserPannel from "../../components/LeftUserPannel";
import Header from "../../components/Header";

export default function UserPanel() {
  const values = [1]; // Only one value
  const url = ["user-panel-dmatrix1"]; // Corresponding URL
  const [slotIndex, setSlotIndex] = useState(0);
  const [cycleIndex, setCycleIndex] = useState(0);



  // const { userId, userAddress, data } = state || {};



  const dummyData = [
    {
      slotId: 1,
      cycles: [
        { userId: "BH001", level: 1, users: 2, recycles: 1 },
        { userId: "BH001", level: 1, users: 3, recycles: 2 }
      ]
    },
    {
      slotId: 2,
      cycles: [
        { userId: "BH002", level: 2, users: 1, recycles: 0 }
      ]
    }
  ];
  const currentSlot = dummyData[slotIndex];
  const currentCycle = currentSlot.cycles[cycleIndex];

  const nextSlot = () => {
    if (slotIndex < dummyData.length - 1) {
      setSlotIndex(slotIndex + 1);
      setCycleIndex(0);
    }
  };

  const prevSlot = () => {
    if (slotIndex > 0) {
      setSlotIndex(slotIndex - 1);
      setCycleIndex(0);
    }
  };

  const nextCycle = () => {
    if (cycleIndex < currentSlot.cycles.length - 1) {
      setCycleIndex(cycleIndex + 1);
    }
  };

  const prevCycle = () => {
    if (cycleIndex > 0) {
      setCycleIndex(cycleIndex - 1);
    }
  };



  return (
    <div
      className="bg-black min-h-screen rounded-3xl"
      style={{
        background: "linear-gradient(180deg, #000000, #25752D)",
      }}
    >
      <div className="max-w-6xl mx-auto p-4">
        {/* Top Header */}
        <Header />

        {/* Main Panel */}
        <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
          {/* Left Side Card */}
          <LeftUserPannel />

          {/* Right Side Content */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/user-panel-home/upline-bonus"
                className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl  text-black p-4"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                }}
              >
                <div className="flex justify-center items-center gap-6">
                  <div> <PiUsersFourBold className="text-6xl text-[#f9ad13]" />
                  </div>
                  <div className="">
                    <div className="text-lg md:text-2xl font-bold">
                      Partners Invited :
                    </div>
                    <span>Income : 0000000.00 RAMA</span>
                  </div>
                </div>
              </Link>
              <Link
                to="/user-panel-home/split-bonus"
                className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl  text-black p-4"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                }}
              >
                <div className="flex justify-center items-center gap-6">
                  <div><GiSplitArrows className="text-5xl text-[#f9ad13]" /></div>
                  <div>
                    <span className="text-lg md:text-2xl font-bold">
                      Split Bonus
                    </span>
                    <br />
                    <span>Income : 0000000.00 RAMA</span>
                  </div>
                </div>
              </Link>
              <Link
                to="/user-panel-home/slot-activate"
                className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl bg-blue-500 text-black p-4"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                }}
              >
                <div className="flex justify-center items-center gap-6">
                  <div><FaCheckToSlot className="text-5xl text-[#f9ad13]" /></div>
                  <div>
                    <span className="text-lg md:text-2xl font-bold">
                      Slot Activated
                    </span>
                    <br />
                    <span>Income : 0000000.00 RAMA</span>
                  </div>
                </div>
              </Link>
              <div
                className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl bg-blue-500 text-black p-4 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                }}
              >
                <div className="flex justify-center items-center gap-6">
                  <div><MdOutlineContactMail className="text-5xl text-[#f9ad13]" /></div>
                  <div>
                    <span className="text-lg md:text-2xl font-bold">
                      Affiliated Link
                    </span>
                    <br />
                    <span>Click to Copy</span>
                  </div>
                  <div><RxCopy className="text-3xl hover:text-[#f9ad13]" /></div>
                </div>
              </div>
            </div>

            {/* Universe U3 Plus Section */}
            <div
              className="grid grid-cols-1 mt-10 rounded-2xl p-6 text-center"
              style={{
                background:
                  "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
              }}
            >

              <div>
                <span className="text-4xl md:text-5xl text-[#EFB90A] font-extrabold">
                  Universe
                </span>{" "}
                <span className="text-2xl md:text-xl font-bold text-blue-500">
                  U3 Plus
                </span>
              </div>

              {/* <div className="mt-10">
                <span className="border-2 text-2xl px-12 py-2">Sponsor ID</span>
              </div> */}


              <div className="flex flex-wrap justify-start items-center gap-0 mt-10 p-4">
                {/* Recycle Control */}
                <div className="flex flex-col items-center justify-center mt-30">
                  <FaChevronUp onClick={prevCycle} className="cursor-pointer text-3xl hover:text-4xl hover:text-blue-500" />
                  <div className="flex justify-center items-center gap-2">
                    <div>RECYCLE</div>
                    <TfiReload className="text-xl text-pink-500" />
                    <div>{currentCycle.recycles}/1</div>
                  </div>
                  <FaChevronDown onClick={nextCycle} className="cursor-pointer text-3xl hover:text-4xl hover:text-blue-500" />
                </div>

                {/* Main ID Card with Navigation */}
                <div className="flex flex-col lg:flex-row justify-center items-center ml-0 lg:ml-[-50px]">
                  <div className="flex justify-center items-center gap-2">
                    <FaChevronLeft
                      onClick={prevSlot}
                      className="cursor-pointer hover:text-blue-500 hover:scale-200 transition-transform duration-300 text-xl"
                    />
                    <div className="w-10 h-10 bg-[#24b6ca] text-white text-3xl font-bold flex justify-center items-center rounded-sm">
                      {slotIndex + 1}
                    </div>
                  </div>

                  {/* ID Card */}
                  <div className="flex flex-col items-center p-6 rounded-2xl transition-transform duration-300">
                    <div className="h-16 w-40 bg-gradient-to-br from-green-500 to-yellow-200 rounded-xl flex justify-center items-center text-white text-2xl font-bold">
                      ID : {currentCycle.userId}
                    </div>
                    <div className="bg-[#24b6ca] w-30 h-8 ml-36 mt-[-10px] z-0 rounded-sm text-white flex justify-center items-center">
                      Level - {currentCycle.level}
                    </div>

                    {/* Vertical Lines */}
                    <div className="mt-4 space-y-1">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex justify-center gap-2">
                          {[...Array(4)].map((__, j) => (
                            <PiLineVerticalLight
                              key={j}
                              className="text-white text-xl"
                            />
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* Circles */}
                    <div className="flex justify-center gap-3 mt-2">
                      {[...Array(4)].map((_, j) => (
                        <GiCircle key={j} className="text-white text-xl" />
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center items-center gap-4 mt-4 text-white text-lg">
                      <div>{currentCycle.users}</div>
                      <LuUsers className="text-xl" />
                      <div>{currentCycle.recycles}</div>
                      <TfiReload className="text-pink-600 font-bold text-xl" />
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-2">
                    <div className="w-10 h-10 bg-[#24b6ca] text-3xl font-bold flex justify-center items-center rounded-sm">
                      {slotIndex + 2}
                    </div>
                    <FaChevronRight
                      onClick={nextSlot}
                      className="cursor-pointer hover:text-blue-500 hover:scale-200 transition-transform duration-300 text-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Partners table */}
            <div className="flex flex-col mt-10 border-2 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold mb-5 text-start">
                Partners{" "}
              </div>
              <div className="overflow-x-auto">
                {" "}
                {/* Enables horizontal scrolling on small screens */}
                <table className="w-full min-w-[600px] border-collapse">
                  <thead>
                    <tr className="">
                      <th className="p-2 border">Id</th>
                      <th className="p-2 border">Date</th>
                      <th className="p-2 border">Wallet</th>
                      <th className="p-2 border">Tx Hash</th>
                      <th className="p-2 border">Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-2 border">34</td>
                      <td className="p-2 border">2022-11-12 10:12:56</td>
                      <td className="p-2 border">0x4f0...98c0E</td>
                      <td className="p-2 border">0xc03...38624</td>
                      <td className="p-2 border">0.000 / $0.000</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-2 border">34</td>
                      <td className="p-2 border">2022-11-12 10:12:56</td>
                      <td className="p-2 border">0x4f0...98c0E</td>
                      <td className="p-2 border">0xc03...38624</td>
                      <td className="p-2 border">0.000 / $0.000</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-2 border">34</td>
                      <td className="p-2 border">2022-11-12 10:12:56</td>
                      <td className="p-2 border">0x4f0...98c0E</td>
                      <td className="p-2 border">0xc03...38624</td>
                      <td className="p-2 border">0.000 / $0.000</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-2 border">34</td>
                      <td className="p-2 border">2022-11-12 10:12:56</td>
                      <td className="p-2 border">0x4f0...98c0E</td>
                      <td className="p-2 border">0xc03...38624</td>
                      <td className="p-2 border">0.000 / $0.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

