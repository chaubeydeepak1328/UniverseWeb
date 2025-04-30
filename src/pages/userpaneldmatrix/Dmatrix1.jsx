import React from "react";
import universeLogo from "../../assets/images/universeLogo.png";
import universeCoin from '../../assets/images/universeCoin.png'
import { RxCopy } from "react-icons/rx";
import {
  FaExternalLinkAlt,
  FaTelegram,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import {
  RiLogoutCircleRLine
} from "react-icons/ri";
import { PiLineVerticalLight } from "react-icons/pi";
import { GiCircle } from "react-icons/gi";
import { TfiReload } from "react-icons/tfi";
import { LuUsers } from "react-icons/lu";
import { Link } from "react-router-dom";



export default function UserPanel() {
  const values = [0.005]; // Only one value
  const url = ["user-panel-dmatrix1"]; // Corresponding URL

  return (
    <div className="bg-black min-h-screen rounded-3xl"
    style={{
      background: "linear-gradient(180deg, #000000, #25752D)",
    }}>
      <div className="max-w-6xl mx-auto p-4">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-2 mx-4 md:mx-10">
                  <Link to="/" className="rounded-3xl">
                    <img src={universeLogo} alt="Logo" className="h-20 md:h-[100px]" />
                  </Link>
                  <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-xl text-white mt-4 md:mt-0">
                    <div className="hover:text-blue-600">
                      <a
                        href="https://t.me/ramauniverse"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center gap-2"
                      >
                        <FaTelegram className="text-blue-500" />
                        <span>Official Channel</span>
                      </a>
                    </div>
                    <div className="hover:text-red-600 flex items-center gap-2 cursor-pointer">
                      <span>Logout</span>
                      <RiLogoutCircleRLine className="text-red-500" />
                    </div>
                  </div>
                </div>

        {/* Main Panel */}
        <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
          {/* Left Side Card */}
         <div
                     className="flex flex-col rounded-2xl w-full lg:w-[350px] p-10 text-white text-center backdrop-blur-md shadow-xl h-[102vh]"
                     style={{
                       background:
                         "linear-gradient(180deg, rgba(11, 11, 142, 1) 0%, rgba(115, 118, 120, 1) 100%)",
                     }}
                   >
                     <div className="flex justify-between items-center">
                       <div className="text-6xl text-blue-500">
                         <img
                           src={universeCoin}
                           alt="universeCoin"
                           className="h-10 w-10"
                         />
                       </div>
                       <div className="text-3xl font-bold">Id</div>
                     </div>
                     <div className="bg-[#34c759] w-full rounded-sm mt-5 h-10 flex items-center justify-center lg:w-[260px] mx-auto">
                       RAMA 0.000
                     </div>
                     <div className="mt-2 h-10 flex items-center justify-center w-full lg:w-[250px] mx-auto">
                       0xf3585...6347733
                     </div>
                     <div className="flex justify-between mt-2 px-2">
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
                     <div className="flex justify-between mt-2 px-2">
                       <FaExternalLinkAlt className="hover:text-blue-700" />
                       <span> 0xf3585...6347733</span>
                       <RxCopy className="text-xl font-bold hover:text-blue-700" />
                     </div>
                   </div>

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
                            <div>
                              <span className="text-lg md:text-2xl font-bold">
                                Partners Invited :
                              </span>
                              <br />
                              <span>Income : 0000000.00 RAMA</span>
                            </div>
                          </Link>
                          <Link
                            to="/user-panel-home/upline-bonus"
                            className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl  text-black p-4"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                            }}
                          >
                            <div>
                              <span className="text-lg md:text-2xl font-bold">
                                Split Bonus
                              </span>
                              <br />
                              <span>Income : 0000000.00 RAMA</span>
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
                            <div>
                              <span className="text-lg md:text-2xl font-bold">
                                Slot Activated
                              </span>
                              <br />
                              <span>Income : 0000000.00 RAMA</span>
                            </div>
                          </Link>
                          <div
                            className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl bg-blue-500 text-black p-4 cursor-pointer"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                            }}
                          >
                            <div>
                              <span className="text-lg md:text-2xl font-bold">
                                Affiliated Link
                              </span>
                              <br />
                              <span>Click to Copy</span>
                            </div>
                          </div>
                        </div>

            {/* Universe U3 Plus Section */}
            <div className="grid grid-cols-1 mt-10 rounded-2xl p-6 text-center"
             style={{
              background:
                "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
            }}>
              <div>
                <span className="text-4xl md:text-5xl text-[#EFB90A] font-extrabold">
                  Universe
                </span>{" "}
                <span className="text-2xl md:text-xl font-bold">U3 Plus</span>
              </div>

              {/* Only One Id Card */}
              <div className="flex flex-wrap justify-center items-center gap-20 mt-10 p-4">
                <div className="flex justify-center items-center gap-2">
                  <div> 
                  <FaChevronLeft className="hover:text-blue-500 hover:scale-200 transition-transform duration-300 text-xl" />
                    </div>
                    <div className="w-10 h-10 text-white text-3xl font-bold flex justify-center items-center rounded-sm" 
                     style={{
                      background:
                        "linear-gradient(262deg, rgba(32, 173, 29, 1) 0%, rgba(239, 185, 10, 1) 50%)",
                    }}>
                      1
                    </div>
                </div>

                <div
                  to={`/${url[0]}`}
                  className="flex flex-col items-center p-6  rounded-2xl   transition-transform duration-300"
                >
                  <div className="h-16 w-32 sm:w-36 md:w-40 lg:w-44 bg-blue-500 rounded-xl flex justify-center items-center text-white text-xl sm:text-2xl font-bold">
                    {values[0]}
                  </div>

                  {/* Vertical lines */}
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

                  {/* User Stats */}
                  <div className="flex justify-center items-center gap-4 mt-4 text-white text-lg">
                    <div>0</div>
                    <LuUsers className="text-xl" />
                    <div>0</div>
                    <TfiReload className="text-pink-600 font-bold text-xl" />
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                 
                    <div className="w-10 h-10  text-3xl font-bold flex justify-center items-center rounded-sm" 
                     style={{
                      background:
                        "linear-gradient(262deg, rgba(32, 173, 29, 1) 0%, rgba(239, 185, 10, 1) 50%)",
                    }}>
                      2
                    </div>
                    <div> 
                    <FaChevronRight className="hover:text-blue-500 hover:scale-200 transition-transform duration-300 text-xl"/>
                    </div>
                </div>
              </div>
            </div>

             {/* Partners table */}
             <div className="flex flex-col mt-10 border-2 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold mb-5 text-start">Partners </div>
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
