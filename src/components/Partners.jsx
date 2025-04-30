import React from "react";
import universeLogo from "../assets/images/universeLogo.png";
import universeCoin from "../assets/images/universeCoin.png";
import { RxCopy } from "react-icons/rx";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";

export default function Partners() {
  const values = [0.005, 0.001, 0.003, 0.003, 0.002, 0.004, 0.002];
  return (
    <div className=" px-4"
    style={{
      background: "linear-gradient(180deg, #000000, #25752D)",
    }}
    >
      <div className="max-w-6xl  h-auto m-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center  mx-4 md:mx-10">
          <Link to="/">
            <img
              src={universeLogo}
              alt="Logo Image"
              className="h-20 md:h-[100px]"
            />
          </Link>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-xl text-white  md:mt-0">
            <div className="flex justify-center items-center gap-4"> <FaTelegram className="text-blue-500"/> Official Channel</div> 
            <div className="flex gap-1 items-center ">
              <div>Logout</div> <IoMdLogOut className="text-red-500" />
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
          {/* left part */}
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
              <div className="text-3xl font-bold">Id</div>
            </div>
            <div className="bg-[#34c759] w-full rounded-sm mt-5 h-10 flex items-center justify-center lg:w-[260px] mx-auto">
              RAMA 0.000
            </div>
            <div className="mt-2 h-10 flex items-center justify-center w-full lg:w-[250px] mx-auto">
              0xf3585...6347733
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
              <div> 0xf3585...6347733</div>
              <RxCopy className="text-xl font-bold hover:text-blue-700" />
            </div>
          </div>

          {/* Right Part */}
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

            {/* Partners table */}
            <div className="flex flex-col mt-10 border-blue-500 border-2 rounded-2xl p-6 text-center">
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
