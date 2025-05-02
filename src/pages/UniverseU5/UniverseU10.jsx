import React, { useState } from "react";
import universeLogo from "../../assets/images/universeLogo.png";
import universeCoin from "../../assets/images/universeCoin.png";
import { RxCopy } from "react-icons/rx";
import {
    FaExternalLinkAlt,
    FaTelegram,
    FaChevronLeft,
    FaChevronRight,
    FaChevronUp,
} from "react-icons/fa";
import { FaChevronDown, FaCheckToSlot } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { PiLineVerticalLight, PiUsersFourBold } from "react-icons/pi";
import { GiCircle, GiSplitArrows } from "react-icons/gi";
import { TfiReload } from "react-icons/tfi";
import { LuUsers } from "react-icons/lu";
import { Link } from "react-router-dom";
import { MdOutlineContactMail } from "react-icons/md";
import { BsCaretUpFill } from "react-icons/bs";
import Header from "../../components/Header";
import LeftUserPannel from "../../components/LeftUserPannel";

export default function UserPanel() {
    const values = [1];
    const url = ["user-panel-dmatrix1"];

    const sanitizedUrls = url.map((u) =>
        u.replace(/[^\w-]/gi, "-").toLowerCase()
    );





    const dummyData = [
        ["$4098", "$1345", "$2222"],
        ["$4598", "$3442", "$3333"],
        ["$3453", "$3543", "$4444"],
        ["$9898", "$1122", "$5555"],
        ["$7788", "$2233", "$6666"],
    ];
    const maximumCycle = dummyData.length;
    const maximumSlot = dummyData[0]?.length || 0;

    const [cycleIndex, setCycleIndex] = useState(0); // vertical
    const [slotIndex, setSlotIndex] = useState(0);   // horizontal




    const handleLeft = () => {
        if (slotIndex > 0) setSlotIndex(slotIndex - 1);
    };

    const handleRight = () => {
        if (slotIndex < maximumSlot - 1) setSlotIndex(slotIndex + 1);
    };

    const handleUp = () => {
        if (cycleIndex > 0) setCycleIndex(cycleIndex - 1);
    };

    const handleDown = () => {
        if (cycleIndex < maximumCycle - 1) setCycleIndex(cycleIndex + 1);
    };



    return (
        <div
            className="bg-black min-h-screen rounded-3xl"
            style={{ background: "linear-gradient(180deg, #000000, #25752D)" }}
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
                            {/* Card List */}
                            <Link to="/user-panel-home/upline-bonus" className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl text-black p-4" style={{ background: "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)" }}>
                                <div className="flex justify-center items-center gap-6">
                                    <PiUsersFourBold className="text-6xl text-[#f9ad13]" />
                                    <div>
                                        <div className="text-lg md:text-2xl font-bold">Partners Invited :</div>
                                        <span>Income : 0000000.00 RAMA</span>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/user-panel-home/split-bonus" className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl text-black p-4" style={{ background: "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)" }}>
                                <div className="flex justify-center items-center gap-6">
                                    <GiSplitArrows className="text-5xl text-[#f9ad13]" />
                                    <div>
                                        <span className="text-lg md:text-2xl font-bold">Split Bonus</span>
                                        <br />
                                        <span>Income : 0000000.00 RAMA</span>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/user-panel-home/slot-activate" className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl text-black p-4" style={{ background: "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)" }}>
                                <div className="flex justify-center items-center gap-6">
                                    <FaCheckToSlot className="text-5xl text-[#f9ad13]" />
                                    <div>
                                        <span className="text-lg md:text-2xl font-bold">Slot Activated</span>
                                        <br />
                                        <span>Income : 0000000.00 RAMA</span>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl text-black p-4 cursor-pointer" style={{ background: "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)" }}>
                                <div className="flex justify-center items-center gap-6">
                                    <MdOutlineContactMail className="text-5xl text-[#f9ad13]" />
                                    <div>
                                        <span className="text-lg md:text-2xl font-bold">Affiliated Link</span>
                                        <br />
                                        <span>Click to Copy</span>
                                    </div>
                                    <RxCopy className="text-3xl hover:text-[#f9ad13]" />
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
                            <div className="mt-10">
                                <span className="border-2 text-2xl px-12 py-2"> Detailed View U5{'>>>>>'} </span>
                            </div>

                            <div className="mt-10">
                                <span className="border-2 text-2xl px-12 py-2">slot 1</span>
                            </div>

                            {/* Matrix View */}
                            <div className="flex flex-wrap justify-start items-center gap-0 mt-10 p-4">


                                <div className="flex flex-col items-center justify-center mt-30">
                                    <FaChevronUp
                                        className="text-3xl hover:text-4xl hover:text-blue-500 cursor-pointer"
                                        onClick={handleUp}
                                    />
                                    <div className="flex justify-center items-center gap-2 mt-2">
                                        <div>Position</div>
                                        <div>
                                            {cycleIndex + 1}/{dummyData.length}
                                        </div>
                                    </div>
                                    <FaChevronDown
                                        className="text-3xl hover:text-4xl hover:text-blue-500 cursor-pointer"
                                        onClick={handleDown}
                                    />
                                </div>

                                <div className="flex flex-col lg:flex-row justify-center gap-30 items-center ml-0 lg:ml-[-50px]">
                                    <div className="flex justify-center items-center gap-2">
                                        <FaChevronLeft
                                            className="hover:text-blue-500 text-xl cursor-pointer"
                                            onClick={handleLeft}
                                        />
                                        <div className="w-10 h-10 bg-[#24b6ca] text-white text-3xl font-bold flex justify-center items-center rounded-sm">
                                            {slotIndex + 1}
                                        </div>
                                    </div>

                                    {/* User Card */}
                                    <div className="flex justify-center">
                                        <div className="flex flex-col items-center">
                                            <button className="h-10 w-30 bg-[#DED8C8] rounded-xl flex justify-center items-center text-black text-lg px-4">
                                                {dummyData[cycleIndex][slotIndex]}
                                            </button>

                                            {[...Array(2)].map((_, i) => (
                                                <div key={i} className="flex justify-center gap-2">
                                                    {[...Array(5)].map((__, j) => (
                                                        <PiLineVerticalLight key={j} />
                                                    ))}
                                                </div>
                                            ))}

                                            <div className="flex justify-center items-center gap-1">
                                                {[...Array(5)].map((_, j) => (
                                                    <button
                                                        key={j}
                                                        className={`h-[20px] w-[20px] rounded-full flex justify-center items-center cursor-pointer border border-black ${j % 2 === 0 ? "bg-yellow-500" : "bg-blue-400"
                                                            } hover:opacity-80`}
                                                        onClick={() => console.log(`Button ${j + 1} clicked`)}
                                                    >
                                                        {j % 2 === 0 ? (
                                                            <BsCaretUpFill className="text-black text-xl" />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center items-center gap-2">
                                        <div className="w-10 h-10 bg-[#24b6ca] text-3xl font-bold flex justify-center items-center rounded-sm">
                                            {slotIndex + 2}
                                        </div>
                                        <FaChevronRight
                                            className="hover:text-blue-500 text-xl cursor-pointer"
                                            onClick={handleRight}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Partners Table */}
                        <div className="flex flex-col mt-10 border-2 rounded-2xl p-6 text-center">
                            <div className="text-3xl font-bold mb-5 text-start">Partners</div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[600px] border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="p-2 border">Id</th>
                                            <th className="p-2 border">Name</th>
                                            <th className="p-2 border">Level</th>
                                            <th className="p-2 border">Income</th>
                                            <th className="p-2 border">Joined At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Example row */}
                                        <tr>
                                            <td className="p-2 border">1</td>
                                            <td className="p-2 border">John Doe</td>
                                            <td className="p-2 border">U3</td>
                                            <td className="p-2 border">100 RAMA</td>
                                            <td className="p-2 border">2025-05-01</td>
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

