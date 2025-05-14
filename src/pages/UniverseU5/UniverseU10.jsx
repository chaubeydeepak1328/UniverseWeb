import React, { use, useEffect, useState } from "react";
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
import { Link, useLocation } from "react-router-dom";
import { MdOutlineContactMail } from "react-icons/md";
import { BsCaretUpFill } from "react-icons/bs";
import Header from "../../components/Header";
import LeftUserPannel from "../../components/LeftUserPannel";
import DashboardInfo from "../../components/DashboardInfo";
import { useStore } from "../../Store/UserStore";

export default function UserPanel() {

    const location = useLocation();
    const { id, slotVal, matrixData } = location.state || {};

    console.log("id, slotVal, matrixData", id, slotVal, matrixData)








    const dummyData = [
        ["$10", "$30", "$90", "$270", "$810"],
        ["$10", "$30", "$90", "$270", "$810"],
        ["$10", "$30", "$90", "$270", "$810"],
        ["$10", "$30", "$90", "$270", "$810"],
        ["$10", "$30", "$90", "$270", "$810"],
    ];


    // const matrixData = [
    //     {
    //         id: 1,
    //         values: ["$10", "$30", "$90", "$270", "$810"],
    //         slotsPosition: [
    //             ["1", "1", "0", "0", "0"],
    //             ["1", "0", "0", "0", "0"],
    //             ["1", "1", "1", "0", "0"],
    //             ["0", "0", "0", "0", "0"],
    //             ["0", "0", "", "0", "0"],
    //         ]
    //     },
    //     {
    //         id: 2,
    //         values: ["$10", "$30", "$90", "$270", "$810"],
    //         slotsPosition: [
    //             ["1", "1", "1", "0", "0"],
    //             ["1", "1", "1", "0", "0"],
    //             ["1", "1", "0", "0", "0"],
    //             ["1", "0", "0", "0", "0"],
    //             ["1", "1", "1", "1", "0"],
    //         ]
    //     },
    // ];

    const maximumCycle = 5; //position
    const maximumSlot = dummyData[0]?.length || 0; //slots

    const [cycleIndex, setCycleIndex] = useState(0); // vertical
    const [slotIndex, setSlotIndex] = useState(slotVal);



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



    const getFilteredLogs = useStore((state) => state.getFilteredLogs);

    useEffect(() => {
        handlePositionClick(cycleIndex)



        const u5logs = async () => {
            const res = getFilteredLogs();

            console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&", res)
        }

        u5logs();
    }, [cycleIndex])


    const [selectedPos, setSeletedPos] = useState(-1);

    const handlePositionClick = (index) => {
        setSeletedPos(index);
        console.log("Selected Position:", selectedPos);
    }



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

                        <DashboardInfo />

                        {/* Universe U3 Plus Section */}
                        <div
                            className="grid grid-cols-1 mt-10 rounded-2xl p-6 text-center"
                            style={{
                                background:
                                    "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
                            }}
                        >
                            <div className="flex gap-5 justify-center mt-10">
                                <span className="border-2 text-sm lg:text-2xl lg:px-12 py-2 bg-yellow-500 rounded-xl"> Detailed View U5{'>>>>>'} </span>

                                <span className="border-2 text-sm lg:text-2xl lg:px-12 py-2  bg-green-500 rounded-xl"> Matrix ID: {id} </span>
                            </div>

                            <div className="mt-10">
                                <span className="border-2 text-2xl px-12 py-2  bg-blue-500 rounded-xl">slot {slotIndex + 1}</span>
                            </div>

                            {/* Matrix View */}
                            <div className="flex flex-wrap justify-center gap-8 lg:mt-10 p-4">


                                <div className="flex flex-col items-center justify-center mt-5 lg:mt-30">
                                    <FaChevronUp
                                        className="text-3xl hover:text-4xl hover:text-blue-500 cursor-pointer"
                                        onClick={handleUp}
                                    />
                                    <div className="flex justify-center items-center gap-2 mt-2">
                                        <div>Position</div>
                                        <div>
                                            {cycleIndex + 1}/{'5'}
                                        </div>
                                    </div>
                                    <FaChevronDown
                                        className="text-3xl hover:text-4xl hover:text-blue-500 cursor-pointer"
                                        onClick={handleDown}
                                    />
                                </div>

                                <div className="flex lg:flex-row justify-center gap-5  lg:gap-30 items-center ml-0 lg:ml-[-50px]">
                                    <div className="flex justify-center items-center gap-2">
                                        <FaChevronLeft
                                            className="hover:text-blue-500 text-xl cursor-pointer"
                                            onClick={handleLeft}
                                        />
                                        <button onClick={handleLeft} className="w-10 h-10 bg-[#24b6ca] text-white text-3xl font-bold flex justify-center items-center rounded-sm cursor-pointer">
                                            {slotIndex + 1}
                                        </button>
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
                                                {matrixData.find((val) => val.id == id).slotsPosition[slotIndex].map((val, j) => (
                                                    <button
                                                        key={j}

                                                        onClick={() => handlePositionClick(j)}
                                                        className={`h-[20px] w-[20px] rounded-full flex justify-center items-center cursor-pointer border border-black
                                                            ${j === selectedPos
                                                                ? "ring-2 ring-green-500 shadow-[0_0_20px_3px_rgba(34,197,94,0.7)]"
                                                                : ""}   ${val === "1" ? (j % 2 === 0 ? "bg-yellow-500" : "bg-blue-400") : ""} hover:opacity-80`}
                                                    >
                                                        {val === "1" && j % 2 === 0 && (
                                                            <BsCaretUpFill className="text-black text-xl" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center items-center gap-2">
                                        <button onClick={handleRight} className="w-10 h-10 bg-[#24b6ca] text-3xl font-bold flex justify-center items-center rounded-sm cursor-pointer">
                                            {slotIndex == 4 ? "0" : slotIndex + 2}
                                        </button>
                                        <FaChevronRight
                                            className="hover:text-blue-500 text-xl cursor-pointer"
                                            onClick={handleRight}
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>


                        {/* Partners Table */}
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

