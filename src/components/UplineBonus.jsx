import React from "react";
import { Link } from "react-router-dom";
import { RxCopy } from "react-icons/rx";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import universeLogo from "../assets/images/universeLogo.png";
import universeCoin from "../assets/images/universeCoin.png";
import { FaTelegram } from "react-icons/fa";
import { PiUsersFourBold } from "react-icons/pi";
import { GiSplitArrows } from "react-icons/gi";
import { MdOutlineContactMail } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";
import LeftUserPannel from "./LeftUserPannel";
import Header from "./Header";
import DashboardInfo from "./DashboardInfo";

export default function UplineBonus() {
  const values = [0.005, 0.001, 0.003, 0.003, 0.002, 0.004, 0.002];
  return (
    <div className=" px-4"
      style={{
        background: "linear-gradient(180deg, #000000, #25752D)",
      }}
    >
      <div className="max-w-6xl  h-auto m-auto p-4">
        {/* Top Header */}
        <Header />
        {/* Main Panel */}
        <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
          {/* Left Side Card */}
          <LeftUserPannel />

          {/* Right Part */}
          <div className="w-full">

            <DashboardInfo />


            {/* Partners table */}
            <div className="flex flex-col mt-10  border-1 rounded-2xl p-6 text-center"
              style={{
                background:
                  "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
              }}>
              <div className="text-3xl font-bold mb-5 text-start text-[#EFB90A]">
                Partners
              </div>

              <div className="overflow-x-auto">
                {" "}
                {/* Enables horizontal scrolling on small screens */}
                <table className="w-full min-w-[600px] border-collapse">
                  <thead>
                    <tr className="">
                      <th className="p-2 border">ID</th>
                      <th className="p-2 border">Date</th>
                      <th className="p-2 border">From Wallet</th>
                      <th className="p-2 border">Tx Hash</th>
                      <th className="p-2 border">Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-2 border">34</td>
                      <td className="p-2 border">12/02/2024</td>
                      <td className="p-2 border">0xc09...12344</td>
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