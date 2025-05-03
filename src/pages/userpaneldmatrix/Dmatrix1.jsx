import React, { useEffect, useState } from "react";
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
import { Link, useLocation } from "react-router-dom";
import { PiUsersFourBold } from "react-icons/pi";
import { GiSplitArrows } from "react-icons/gi";
import { MdOutlineContactMail } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";

import LeftUserPannel from "../../components/LeftUserPannel";
import Header from "../../components/Header";

export default function UserPanel() {

  const location = useLocation();
  const { slotNumber } = location.state || {};


  useEffect(() => {
    console.log("------->slot no", slotNumber)
  }, [slotNumber])


  const dummyData = [
    { slotNo: 1, cycles: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]] },
    { slotNo: 2, cycles: [[1, 1, 1, 1]] },
    { slotNo: 3, cycles: [[1, 1, 1, 0]] },
    { slotNo: 4, cycles: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 0, 0]] },
    { slotNo: 5, cycles: [[1, 0, 0, 0]] },
    { slotNo: 6, cycles: [[1, 1, 0, 0]] },
    { slotNo: 7, cycles: [[1, 1, 1, 0]] },
    { slotNo: 8, cycles: [[0, 0, 0, 0]] },
    { slotNo: 9, cycles: [[0, 0, 0, 0]] },
    { slotNo: 10, cycles: [[0, 0, 0, 0]] },
  ];



  const [slotIndex, setSlotIndex] = useState(slotNumber ? slotNumber : 0);
  const [cycleIndex, setCycleIndex] = useState(0);

  const slot = dummyData[slotIndex];
  const cycles = slot.cycles;
  const currentCycle = cycles[cycleIndex];

  const prevSlot = () => {
    setSlotIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setCycleIndex(0);
  };

  const nextSlot = () => {
    setSlotIndex((prev) => (prev < dummyData.length - 1 ? prev + 1 : prev));
    setCycleIndex(0);
  };

  const prevCycle = () => {
    setCycleIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const nextCycle = () => {
    setCycleIndex((prev) => (prev < cycles.length - 1 ? prev + 1 : prev));
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

              <div className="w-full">
                <div className="flex justify-start">
                  <span className="text-2xl md:text-5xl text-[#EFB90A] font-extrabold">
                    Universe
                  </span>{" "}
                  <span className="text-2xl md:text-xl font-bold text-blue-500">
                    U3 Plus {'>>>>'}
                  </span>
                </div>
              </div>

              {/* <div className="mt-10">
                <span className="border-2 text-2xl px-12 py-2">Slot 1</span>
              </div> */}

              {/* <div className="mt-10">
                <span className="border-2 text-2xl px-12 py-2">Sponsor ID</span>
              </div> */}


              <div className="flex flex-wrap justify-start items-center gap-0 mt-10 p-4">
                {/* Recycle Control */}
                <div className="flex flex-col items-center justify-center mt-30">
                  <FaChevronUp
                    onClick={prevCycle}
                    className="cursor-pointer text-3xl hover:text-4xl hover:text-blue-500"
                  />
                  <div className="flex justify-center items-center gap-2">
                    <div>RECYCLE</div>
                    <TfiReload className="text-xl text-pink-500" />
                    <div>
                      {cycleIndex + 1}/{cycles.length}
                    </div>
                  </div>
                  <FaChevronDown
                    onClick={nextCycle}
                    className="cursor-pointer text-3xl hover:text-4xl hover:text-blue-500"
                  />
                </div>

                {/* Main ID Card with Navigation */}
                <div className="flex flex-col lg:flex-row justify-center items-center ml-0 lg:ml-[-50px]">
                  <div className="flex justify-center items-center gap-2">
                    <FaChevronLeft
                      onClick={prevSlot}
                      className="cursor-pointer hover:text-blue-500 hover:scale-200 transition-transform duration-300 text-xl"
                    />
                    <div className="w-10 h-10 bg-[#24b6ca] text-white text-3xl font-bold flex justify-center items-center rounded-sm">
                      {slot.slotNo}
                    </div>
                  </div>

                  {/* ID Card */}
                  <div className="flex flex-col items-center p-6 rounded-2xl transition-transform duration-300">
                    <div className="h-16 w-40 bg-gradient-to-br from-green-500 to-yellow-200 rounded-xl flex justify-center items-center text-white text-2xl font-bold">
                      {/* ID : S{slot.slotNo}-C{cycleIndex + 1} */}
                      ID : 0
                    </div>
                    <div className="bg-[#24b6ca] w-30 h-8 ml-36 mt-[-10px] z-0 rounded-sm text-white flex justify-center items-center">
                      slot {slotIndex + 1}
                    </div>

                    {/* Vertical Lines */}
                    <div className="mt-4 space-y-1">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex justify-center gap-5">
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
                      {currentCycle.map((status, j) => (
                        j == 2 ? <GiCircle
                          key={j}
                          className="rounded-full text-xl size-8"
                          style={
                            status
                              ? { background: 'linear-gradient(to bottom, white 50%, pink 50%)' }
                              : { color: 'gray' }
                          }
                        />
                          : j == 3 ? <GiCircle
                            key={j}
                            // className={status ? "bg-white rounded-2xl text-xl" : "text-gray-500 text-xl"}
                            className={`text-xl rounded-full size-8 ${status ? "bg-green-300" : "text-gray-400"
                              }`}
                          /> : <GiCircle
                            key={j}
                            // className={status ? "bg-white rounded-2xl text-xl" : "text-gray-500 text-xl"}
                            className={`text-xl rounded-full size-8 ${status ? "text-white bg-white" : "text-gray-400"
                              }`}
                          />




                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-2">
                    <div className="w-10 h-10 bg-[#24b6ca] text-3xl font-bold flex justify-center items-center rounded-sm">
                      {slotIndex + 2 <= dummyData.length ? slotIndex + 2 : "-"}
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

