import React from 'react'
import { Link } from 'react-router-dom';
import { PiLineVerticalLight } from "react-icons/pi";
import { GiCircle } from "react-icons/gi";
import { TfiReload } from "react-icons/tfi";
import { LuUsers } from "react-icons/lu";

const RightUserPannel = () => {
    const values = [
        0.005, 0.001, 0.003, 0.003, 0.002, 0.004, 0.002, 0.003, 0.007, 0.008,
    ];
    const url = [
        "user-panel-dmatrix1",
        "user-panel-dmatrix2",
        "user-panel-dmatrix3",
        "user-panel-dmatrix4",
        "user-panel-dmatrix5",
        "user-panel-dmatrix6",
        "user-panel-dmatrix7",
        "user-panel-dmatrix8",
        "user-panel-dmatrix9",
        "user-panel-dmatrix10",
    ];
    return (
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
            <div
                className="grid grid-cols-1 mt-10 border-[#3C71A9] border-1 rounded-2xl p-6 text-center"
                style={{
                    background:
                        "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
                }}
            >
                <div>
                    <span className="text-4xl md:text-5xl text-[#EFB90A] font-extrabold">
                        Universe
                    </span>{" "}
                    <span className="text-2xl md:text-xl font-bold">U3 Plus</span>
                </div>

                {/* First Card - First Row */}
                <div className="flex justify-center mt-10">
                    {values.slice(0, 1).map((value, index) => (
                        <Link
                            key={index}
                            to={`/${url[index]}`}
                            className="flex flex-col items-center"
                        >
                            <div className="h-10 w-20 sm:w-24 md:w-28 lg:w-32 bg-blue-500 rounded-xl flex justify-center items-center text-white text-lg sm:text-xl">
                                {value}
                            </div>
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="flex justify-center gap-2">
                                    {[...Array(4)].map((__, j) => (
                                        <PiLineVerticalLight key={j} />
                                    ))}
                                </div>
                            ))}
                            <div className="flex justify-center gap-2">
                                {[...Array(4)].map((_, j) => (
                                    <GiCircle key={j} />
                                ))}
                            </div>
                            <div className="flex justify-center items-center gap-2 mt-2">
                                <div>0</div>
                                <LuUsers />
                                <div>0</div>
                                <TfiReload className="text-pink-600 font-bold" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 5 Cards - Second Row */}
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {values.slice(1, 6).map((value, index) => (
                        <Link
                            key={index + 1}
                            to={`/${url[index + 1]}`}
                            className="flex flex-col items-center"
                        >
                            <div className="h-10 w-20 sm:w-24 md:w-28 lg:w-32 bg-blue-500 rounded-xl flex justify-center items-center text-white text-lg sm:text-xl">
                                {value}
                            </div>
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="flex justify-center gap-2">
                                    {[...Array(4)].map((__, j) => (
                                        <PiLineVerticalLight key={j} />
                                    ))}
                                </div>
                            ))}
                            <div className="flex justify-center gap-2">
                                {[...Array(4)].map((_, j) => (
                                    <GiCircle key={j} />
                                ))}
                            </div>
                            <div className="flex justify-center items-center gap-2 mt-2">
                                <div>0</div>
                                <LuUsers />
                                <div>0</div>
                                <TfiReload className="text-pink-600 font-bold" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Remaining Cards - Third Row */}
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {values.slice(6).map((value, index) => (
                        <Link
                            key={index + 6}
                            to={`/${url[index + 6]}`}
                            className="flex flex-col items-center"
                        >
                            <div className="h-10 w-20 sm:w-24 md:w-28 lg:w-32 bg-blue-500 rounded-xl flex justify-center items-center text-white text-lg sm:text-xl">
                                {value}
                            </div>
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="flex justify-center gap-2">
                                    {[...Array(4)].map((__, j) => (
                                        <PiLineVerticalLight key={j} />
                                    ))}
                                </div>
                            ))}
                            <div className="flex justify-center gap-2">
                                {[...Array(4)].map((_, j) => (
                                    <GiCircle key={j} />
                                ))}
                            </div>
                            <div className="flex justify-center items-center gap-2 mt-2">
                                <div>0</div>
                                <LuUsers />
                                <div>0</div>
                                <TfiReload className="text-pink-600 font-bold" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Other Evergreen Sections */}
            {["U3", "U5", "U4", "U3 Premium"].map((name, idx) => (
                <div
                    key={idx}
                    className="grid grid-cols-1 mt-10 border-[#3C71A9] border-2 rounded-2xl p-6 text-center"
                    style={{
                        background:
                            "linear-gradient(100deg, rgba(5, 53, 102, 1) 0%, rgba(169, 190, 10, 1) 100%)",
                    }}
                >
                    <div>
                        <span className="text-4xl md:text-5xl text-[#EFB90A] font-extrabold">
                            Universe
                        </span>{" "}
                        {name}
                        <br />
                        <span className="text-2xl md:text-xl font-bold">
                            0.000 RAMA
                        </span>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <Link
                            to="user-panel-umatrix1"
                            className="h-10 w-30 rounded-sm flex justify-center items-center text-white text-lg md:text-xl"
                            style={{
                                background:
                                    "linear-gradient(100deg, rgba(239, 185, 10, 1) 0%, rgba(156, 148, 121, 1) 100%)",
                            }}
                        >
                            0.005
                        </Link>
                        <div className="bg-white h-6 w-20 text-black font-bold mt-0">
                            No of Id
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RightUserPannel
