import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { PiLineVerticalLight } from "react-icons/pi";
import { GiCircle } from "react-icons/gi";
import { TfiReload } from "react-icons/tfi";
import { LuUsers } from "react-icons/lu";
import { PiUsersFourBold } from "react-icons/pi";
import { GiSplitArrows } from "react-icons/gi";
import { FaCheckToSlot } from "react-icons/fa6";
import { MdOutlineContactMail } from "react-icons/md";
import { RxCopy } from "react-icons/rx";

import { useStore } from '../Store/UserStore';
import { useAppKitAccount } from '@reown/appkit/react';


const RightUserPannel = () => {
    const { address } = useAppKitAccount();
    const getU3Plus = useStore((state) => state.getU3Plus);
    const [lastSlot, setLastSlot] = useState()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const lastSlot = await getU3Plus(address);
                console.log("lastSlot:", lastSlot);
                setLastSlot(lastSlot)
            } catch (error) {
                console.error("Error fetching U3Plus:", error);
            }
        };

        fetchData();
    }, [lastSlot]);

    const values = [
        10, 20, 40, 80, 160, 320, 640, 1280, 2560, 5120,
    ].slice(0, lastSlot); // Adjust the number of values as needed
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

    // Dynamic the page 
    const slotData = [
        { users: 1, cycles: 2 },
        { users: 1, cycles: 1 },
        { users: 3, cycles: 0 },
        { users: 2, cycles: 3 }, // Last active with 2 users
        { users: 0, cycles: 0 },
        { users: 0, cycles: 0 },
        { users: 0, cycles: 0 },
        { users: 0, cycles: 0 },
        { users: 0, cycles: 0 },
        { users: 0, cycles: 0 },
    ];

    // Determine last active slot with users > 0
    const lastActiveIndex = slotData.reduce((acc, curr, idx) => curr.users > 0 ? idx : acc, -1);


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
                        <div><RxCopy className="text-3xl  hover:text-[#f9ad13]" /></div>
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
                    <span className="text-2xl md:text-xl font-bold text-blue-500">
                        U3 Plus
                    </span>
                </div>

                {/* First Card - First Row */}
                <div className="flex justify-center mt-10">
                    {values.slice(0, 1).map((value, index) => {
                        const slot = slotData[index];
                        const isLastActive = index === lastActiveIndex;
                        const circleClass = isLastActive && slot.users === 2 ? "text-white" : "";

                        return (
                            <Link
                                key={index}
                                to="/user-panel-dmatrix1"
                                className="flex flex-col items-center"
                            >
                                <div className="h-10 w-20 sm:w-24 md:w-28 lg:w-26 bg-[#DED8C8] rounded-xl flex justify-center items-center text-black text-lg sm:text-xl">
                                    {value}$
                                </div>
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="flex justify-center gap-2">
                                        {[...Array(4)].map((__, j) => (
                                            <PiLineVerticalLight key={j} />
                                        ))}
                                    </div>
                                ))}
                                <div className="flex justify-center gap-2">
                                    {[...Array(4)].map((_, j) => {
                                        const isFilled = j < slot.users; // Fill based on user count
                                        return (
                                            <GiCircle
                                                key={j}
                                                className={isFilled ? "bg-white rounded-2xl" : "text-gray-500"}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="flex justify-center items-center gap-2 mt-2">
                                    <div>{slot.users}</div>
                                    <LuUsers />
                                    <div>{slot.cycles}</div>
                                    <TfiReload className="text-pink-600 font-bold" />
                                </div>
                            </Link>
                        );
                    })}

                </div>

                {/* 5 Cards - Second Row */}

                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {values.slice(1, 6).map((value, index) => {
                        const slotIndex = index + 1;
                        const slot = slotData[slotIndex];
                        {/* console.log(slot, "slot") */ }
                        const isLastActive = slotIndex === lastActiveIndex;
                        const circleClass = isLastActive && slot.users === 2 ? "text-white" : "";

                        return (
                            <Link
                                key={slotIndex}
                                to="/user-panel-dmatrix1"
                                className="flex flex-col items-center"
                            >
                                <div className="h-10 w-20 sm:w-24 md:w-28 lg:w-26 bg-[#DED8C8] rounded-xl flex justify-center items-center text-black text-lg sm:text-xl">
                                    {value}$
                                </div>
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="flex justify-center gap-2">
                                        {[...Array(4)].map((__, j) => (
                                            <PiLineVerticalLight key={j} />
                                        ))}
                                    </div>
                                ))}
                                <div className="flex justify-center gap-2">
                                    {[...Array(4)].map((_, j) => {
                                        const isFilled = j < slot.users; // Fill based on user count
                                        return (
                                            <GiCircle
                                                key={j}
                                                className={isFilled ? "bg-white rounded-2xl" : "text-gray-500"}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="flex justify-center items-center gap-2 mt-2">
                                    <div>{slot.users}</div>
                                    <LuUsers />
                                    <div>{slot.cycles}</div>
                                    <TfiReload className="text-pink-600 font-bold" />
                                </div>
                            </Link>
                        );
                    })}

                </div>

                {/* Remaining Cards - Third Row */}
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {values.slice(6).map((value, index) => {
                        const slotIndex = index + 6;
                        const slot = slotData[slotIndex];
                        const isLastActive = slotIndex === lastActiveIndex;
                        const circleClass = isLastActive && slot.users === 2 ? "text-white" : "";

                        return (
                            <Link
                                key={slotIndex}
                                to="/user-panel-dmatrix1"
                                className="flex flex-col items-center"
                            >
                                <div className="h-10 w-20 sm:w-24 md:w-28 lg:w-26 bg-[#DED8C8] rounded-xl flex justify-center items-center text-black text-lg sm:text-xl">
                                    {value}$
                                </div>
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="flex justify-center gap-2">
                                        {[...Array(4)].map((__, j) => (
                                            <PiLineVerticalLight key={j} />
                                        ))}
                                    </div>
                                ))}
                                {/* <div className="flex justify-center gap-2">
                                    {[...Array(4)].map((_, j) => (
                                        <GiCircle key={j} className={circleClass} />
                                    ))}
                                </div> */}

                                <div className="flex justify-center gap-2">
                                    {[...Array(4)].map((_, j) => {
                                        const isFilled = j < slot.users; // Fill based on user count
                                        return (
                                            <GiCircle
                                                key={j}
                                                className={isFilled ? "bg-white rounded-2xl" : "text-gray-500"}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="flex justify-center items-center gap-2 mt-2">
                                    <div>{slot.users}</div>
                                    <LuUsers />
                                    <div>{slot.cycles}</div>
                                    <TfiReload className="text-pink-600 font-bold" />
                                </div>
                            </Link>
                        );
                    })}

                </div>
            </div>


            {["U5", "U4", "U3 Premium"].map((name, idx) => {
                // Map each name to its unique URL
                const urlMap = {
                    U5: "user-panel-umatrix5",
                    U4: "user-panel-umatrix4",
                    "U3 Premium": "user-panel-umatrix-3plus",
                };

                // Map each name to its unique value
                const valueMap = {
                    U5: "$ 10",
                    U4: "$ 40",
                    "U3 Premium": "$ 640",
                };

                return (
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
                            <span className="text-2xl md:text-xl font-bold">0.000 RAMA</span>
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            <Link
                                to={urlMap[name]}
                                className="h-10 w-30 rounded-sm flex justify-center items-center text-white text-lg md:text-xl"
                                style={{
                                    background:
                                        "linear-gradient(100deg, rgba(239, 185, 10, 1) 0%, rgba(156, 148, 121, 1) 100%)",
                                }}
                            >
                                {valueMap[name]}
                            </Link>
                            <div className="bg-white h-6 w-20 text-black font-bold mt-0">
                                No of Id
                            </div>
                        </div>
                    </div>
                );
            })}

        </div>
    )
}

export default RightUserPannel
