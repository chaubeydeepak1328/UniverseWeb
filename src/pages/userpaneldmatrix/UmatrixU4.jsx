import React, { useState } from "react";
import universeLogo from "../../assets/images/universeLogo.png";
import universeCoin from "../../assets/images/universeCoin.png";
import { RxCopy } from "react-icons/rx";
import { FaExternalLinkAlt, FaTelegram } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { PiLineVerticalLight } from "react-icons/pi";
import { BsCaretUpFill } from "react-icons/bs";
import { PiUsersFourBold } from "react-icons/pi";
import { GiSplitArrows } from "react-icons/gi";
import { MdOutlineContactMail } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import Header from "../../components/Header";
import LeftUserPannel from "../../components/LeftUserPannel";



export default function UserPanel() {

    const navigate = useNavigate();



    const [currentIdIndex, setCurrentIdIndex] = useState(0);

    const matrixData = [
        {
            id: 1,
            values: [
                "$40",
                "$80",
                "$160",
                "$320",
                "$640",
                "$1280",
                "$2560",
                "$5120",
                "$10240",
                "$20480",
            ],

            slotsPosition: [
                ["1", "1", "0", "0"],
                ["1", "0", "0", "0"],
                ["1", "1", "1", "0"],
                ["1", "0", "0", "0"],
                ["1", "1", "1", "0"],
                ["1", "1", "0", "0"],
                ["1", "0", "0", "0"],
                ["1", "1", "1", "0"],
                ["0", "0", "0", "0"],
                ["0", "0", "0", "0"],
            ]
        },
        {
            id: 2,
            values: ["$40",
                "$80",
                "$160",
                "$320",
                "$640",
                "$1280",
                "$2560",
                "$5120",
                "$10240",
                "$20480",],
            slotsPosition: [
                ["1", "1", "1", "0"],
                ["1", "1", "1", "0"],
                ["1", "1", "0", "0"],
                ["1", "0", "0", "0"],
                ["1", "1", "1", "1"],
                ["1", "1", "0", "0"],
                ["1", "0", "0", "0"],
                ["1", "1", "1", "0"],
                ["0", "0", "0", "0"],
                ["0", "0", "0", "0"],
            ]
        },
    ];

    const { id, values, slotsPosition } = matrixData[currentIdIndex];

    const next = () => {
        if (currentIdIndex < matrixData.length - 1) setCurrentIdIndex(currentIdIndex + 1);
    };

    const prev = () => {
        if (currentIdIndex > 0) setCurrentIdIndex(currentIdIndex - 1);
    };




    return (
        <div
            className="rounded-3xl"
            style={{ background: "linear-gradient(180deg, #000000, #25752D)" }}
        >
            <div className="max-w-6xl mx-auto p-4">
                {/* Header */}
                <Header />

                {/* Panel */}
                <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
                    {/* Left Side */}
                    <LeftUserPannel />

                    {/* Right Side */}
                    <div className="w-full">
                        {/* Buttons */}
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
                                    <div>
                                        {" "}
                                        <PiUsersFourBold className="text-6xl text-[#f9ad13]" />
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
                                    <div>
                                        <GiSplitArrows className="text-5xl text-[#f9ad13]" />
                                    </div>
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
                                    <div>
                                        <FaCheckToSlot className="text-5xl text-[#f9ad13]" />
                                    </div>
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
                                    <div>
                                        <MdOutlineContactMail className="text-5xl text-[#f9ad13]" />
                                    </div>
                                    <div>
                                        <span className="text-lg md:text-2xl font-bold">
                                            Affiliated Link
                                        </span>
                                        <br />
                                        <span>Click to Copy</span>
                                    </div>
                                    <div>
                                        <RxCopy className="text-3xl  hover:text-[#f9ad13]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Universe U5 Section */}
                        <div
                            className="grid grid-cols-1 mt-10 border-[#3C71A9] border-1 rounded-2xl p-6 text-center"
                            style={{
                                background:
                                    "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
                            }}
                        >
                            <div className="flex justify-between items-center">
                                <button className="cursor-pointer" onClick={prev} disabled={currentIdIndex === 0} ><FaChevronLeft className="text-3xl hover:text-yellow-500" />
                                </button>
                                <div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="text-4xl md:text-5xl text-[#EFB90A] font-extrabold">
                                                Universe
                                            </span>
                                            <span className="text-2xl md:text-xl font-bold text-blue-500">
                                                {" "}
                                                U4
                                            </span>
                                        </div>

                                        <div>
                                            <div className="flex justify-center items-center gap-1">
                                                <div className="h-[20px] w-[20px] rounded-full flex justify-center items-center cursor-pointer border border-black bg-yellow-500">
                                                    <BsCaretUpFill className="text-black text-xl" />
                                                </div>
                                                <div className="ml-[20px]">1-3 Upgrade</div>
                                            </div>
                                            <div>
                                                <div className="flex justify-center items-center gap-1">
                                                    <div className="h-[20px] w-[20px] rounded-full flex justify-center items-center cursor-pointer border border-black bg-blue-500"></div>
                                                    <div>2-4 Your Wallet</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Levels */}
                                    {/* Levels */}
                                    <div className="flex flex-col items-center gap-4 mt-10">
                                        <div className="mt-10">
                                            <span className="border-2 text-2xl px-12 py-2"> Id {id} </span>
                                        </div>
                                        {/* First Card - First Line */}
                                        <div className="flex justify-center">
                                            <div className="flex flex-col items-center">
                                                <button
                                                    className="h-10 w-30 bg-[#DED8C8] rounded-xl flex justify-center items-center text-black text-lg"
                                                    onClick={() => navigate('/user-panel-home/UniverseU4', { state: { id: id, slotVal: 1, plan: values[0].replace(/\$/g, "").trim() } })}
                                                >
                                                    {values[0]}
                                                </button>
                                                {[...Array(2)].map((_, i) => (
                                                    <div key={i} className="flex justify-center gap-2">
                                                        {[...Array(4)].map((__, j) => (
                                                            <PiLineVerticalLight key={j} />
                                                        ))}
                                                    </div>
                                                ))}
                                                <div className="flex justify-center items-center gap-1">
                                                    {slotsPosition[0].map((value, j) => (
                                                        <button
                                                            key={j}
                                                            className={`h-[20px] w-[20px] rounded-full flex justify-center items-center cursor-pointer border border-black
                  ${value === "1" ? (j % 2 === 0 ? "bg-yellow-500" : "bg-blue-400") : ""} hover:opacity-80`}


                                                        >
                                                            {value === "1" && j % 2 === 0 && (
                                                                <BsCaretUpFill className="text-black text-xl" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Remaining Cards - Second Line */}
                                        <div className="flex flex-wrap justify-center gap-4 my-10">
                                            {values.slice(1).map((value, index) => (
                                                <div key={index + 1} className="flex flex-col items-center">
                                                    <button
                                                        onClick={() => navigate('/user-panel-home/UniverseU4', { state: { id: id, slotVal: index + 2, plan: value.replace(/\$/g, "").trim() } })}
                                                        className="h-10 w-30 bg-[#DED8C8] rounded-xl flex justify-center items-center text-black text-lg">
                                                        {value}
                                                    </button>
                                                    {[...Array(2)].map((_, i) => (
                                                        <div key={i} className="flex justify-center gap-2">
                                                            {[...Array(4)].map((__, j) => (
                                                                <PiLineVerticalLight key={j} />
                                                            ))}
                                                        </div>
                                                    ))}
                                                    <div className="flex justify-center items-center gap-1">
                                                        {slotsPosition[index + 1].map((val, j) => (
                                                            <button
                                                                key={j}
                                                                className={`h-[20px] w-[20px] rounded-full flex justify-center items-center cursor-pointer border border-black
                                                                ${val === "1" ? (j % 2 === 0 ? "bg-yellow-500" : "bg-blue-400") : ""} hover:opacity-80`}
                                                            >
                                                                {val === "1" && j % 2 === 0 && (
                                                                    <BsCaretUpFill className="text-black text-xl" />
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Levels */}
                                    {/* Levels */}
                                </div>
                                <button className="cursor-pointer" onClick={next} disabled={currentIdIndex === matrixData.length - 1}><FaAngleRight className="text-4xl hover:text-yellow-500" />
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="flex flex-col mt-10 border-2 rounded-2xl p-4 sm:p-6 text-center w-full">
                            <div className="text-2xl sm:text-3xl font-bold mb-4 text-start">
                                U5Profits’s
                            </div>

                            <div className="w-full overflow-x-auto">
                                <table className="w-full min-w-[700px] border-collapse text-sm sm:text-base">
                                    <thead className="">
                                        <tr>
                                            <th className="p-2 border">S. No.</th>
                                            <th className="p-2 border">USD</th>
                                            <th className="p-2 border">RAMA</th>
                                            <th className="p-2 border">Tx Hash</th>
                                            <th className="p-2 border">Date & Time</th>
                                            <th className="p-2 border">Status</th>
                                            <th className="p-2 border">Re-Generate</th>
                                            <th className="p-2 border">Net Profit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...Array(4)].map((_, i) => (
                                            <tr key={i} className="border-t">
                                                <td className="p-2 border">1</td>
                                                <td className="p-2 border">10</td>
                                                <td className="p-2 border">0xc03...38624</td>
                                                <td className="p-2 border">0.000 / $0.000</td>
                                                <td className="p-2 border">2022-11-12 10:12:56</td>
                                                <td className="p-2 border">0x4f0...98c0E</td>
                                                <td className="p-2 border">0xc03...38624</td>
                                                <td className="p-2 border">0.000 / $0.000</td>
                                            </tr>
                                        ))}
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