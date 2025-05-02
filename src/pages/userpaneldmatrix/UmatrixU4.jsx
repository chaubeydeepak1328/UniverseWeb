import React from "react";
import universeLogo from "../../assets/images/universeLogo.png";
import universeCoin from "../../assets/images/universeCoin.png";
import { RxCopy } from "react-icons/rx";
import { FaExternalLinkAlt, FaTelegram } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { PiLineVerticalLight } from "react-icons/pi";
import { BsCaretUpFill } from "react-icons/bs";
import { PiUsersFourBold } from "react-icons/pi";
import { GiSplitArrows } from "react-icons/gi";
import { MdOutlineContactMail } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";



export default function UserPanel() {
    const values = [
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
    ];
    const sanitizedUrls = values.map(
        (val) => `user-panel-home/universe/${val.replace(/\$/g, "").trim()}`
    );

    return (
        <div
            className="rounded-3xl"
            style={{ background: "linear-gradient(180deg, #000000, #25752D)" }}
        >
            <div className="max-w-6xl mx-auto p-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-2 mx-4 md:mx-10">
                    <Link to="/user-panel-home" className="rounded-3xl">
                        <img src={universeLogo} alt="Logo" className="h-20 md:h-[100px]" />
                    </Link>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-xl text-white mt-4 md:mt-0">
                        <a
                            href="https://t.me/ramauniverse"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-blue-600"
                        >
                            <FaTelegram className="text-blue-500" />
                            <span>Official Channel</span>
                        </a>
                        <div className="hover:text-red-600 flex items-center gap-2 cursor-pointer">
                            <span>Logout</span>
                            <RiLogoutCircleRLine className="text-red-500" />
                        </div>
                    </div>
                </div>

                {/* Panel */}
                <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
                    {/* Left Side */}
                    <div
                        className="flex flex-col rounded-2xl w-full lg:w-[350px] p-10 text-white text-center backdrop-blur-md shadow-xl h-[102vh]"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(11, 11, 142, 1) 0%, rgba(115, 118, 120, 1) 100%)",
                        }}
                    >
                        <div className="flex justify-between items-center">
                            <img
                                src={universeCoin}
                                alt="universeCoin"
                                className="h-10 w-10"
                            />
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
                        <Link className="mt-2 h-10 flex items-center justify-center w-full lg:w-[250px] mx-auto hover:text-blue-700">
                            https://ramestta.com
                        </Link>
                        <div className="bg-[#34c759] w-full rounded-sm mt-5 h-10 flex items-center justify-center lg:w-[260px] mx-auto">
                            Universe Contract
                        </div>
                        <div className="flex justify-between mt-2 px-2">
                            <FaExternalLinkAlt className="hover:text-blue-700" />
                            <span>0xf3585...6347733</span>
                            <RxCopy className="text-xl font-bold hover:text-blue-700" />
                        </div>
                    </div>

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
                                <button onClick={""} ><FaChevronLeft className="text-3xl hover:text-yellow-500" />
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
                                        {/* First Card - First Line */}
                                        <div className="flex justify-center">
                                            <div className="flex flex-col items-center">
                                                <Link
                                                    className="h-10 w-30 bg-[#DED8C8] rounded-xl flex justify-center items-center text-black text-lg"
                                                    to={`/${sanitizedUrls[0]}`}
                                                >
                                                    {values[0]}
                                                </Link>
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
                                                            {" "}
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

                                        {/* Remaining Cards - Second Line */}
                                        <div className="flex flex-wrap justify-center gap-4 my-10">
                                            {values.slice(1).map((value, index) => (
                                                <div key={index + 1} className="flex flex-col items-center">
                                                    <Link
                                                        className="h-10 w-30 bg-[#DED8C8] rounded-xl flex justify-center items-center text-black text-lg"
                                                        to={`/${sanitizedUrls[index + 1]}`}
                                                    >
                                                        {value}
                                                    </Link>
                                                    {[...Array(2)].map((_, i) => (
                                                        <div key={i} className="flex justify-center gap-2">
                                                            {[...Array(4)].map((__, j) => (
                                                                <PiLineVerticalLight key={j} />
                                                            ))}
                                                        </div>
                                                    ))}
                                                    <div className="flex justify-center items-center gap-1">
                                                        {[...Array(4)].map((_, j) => (
                                                            <button
                                                                key={j}
                                                                className={`h-[20px] w-[20px] rounded-full flex justify-center items-center cursor-pointer border border-black ${j % 2 === 0 ? "bg-yellow-500" : "bg-blue-400"
                                                                    } hover:opacity-80`}
                                                                onClick={() =>
                                                                    console.log(`Button ${j + 1} clicked`)
                                                                }
                                                            >
                                                                {" "}
                                                                {j % 2 === 0 ? (
                                                                    <BsCaretUpFill className="text-black text-xl" />
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={""}><FaAngleRight className="text-4xl hover:text-yellow-500" />
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