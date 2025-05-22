import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { PiLineVerticalLight } from "react-icons/pi";
import { BsCaretUpFill } from "react-icons/bs";

import { FaAngleRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import Header from "../../components/Header";
import LeftUserPannel from "../../components/LeftUserPannel";
import DashboardInfo from "../../components/DashboardInfo";
import { useStore } from "../../Store/UserStore";



export default function UserPanel() {

    const navigate = useNavigate();

    const [address, setAddress] = useState(JSON.parse(localStorage.getItem("userData")).userAddress);

    const getU4info = useStore((state) => state.getU4info)





    const dummyData = [
        {
            id: 'N/a',
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
                ["0", "0", "0", "0"],
                ["0", "0", "0", "0"],
                ["0", "0", "0", "0"],
                ["0", "0", "0", "0"],
                ["0", "0", "0", "0"],
                ["0", "0", "0", "0"],
                ["0", "0", "0", "0"],
                ["0", "0", "0", "0"],
                ["0", "0", "0", "0"],
                ["0", "0", "0", "0"],
            ]
        },
    ];


    const [currentIdIndex, setCurrentIdIndex] = useState(0);

    const [matrixData, setMatrixData] = useState(dummyData);





    // const { id, values, slotsPosition } = matrixData[currentIdIndex];

    useEffect(() => {
        const fetchU4 = async () => {
            try {
                const response = await getU4info(address);
                console.log("==========U4 response---->", response);
                if (response) {
                    setMatrixData(response.length == 0 ? dummyData : response); // Make sure this is an array
                }
            } catch (err) {
                console.error("Error fetching U4 info:", err);
            }
        };

        if (address) {
            fetchU4();
        }
    }, [address]);


    const currentMatrix = matrixData?.[currentIdIndex];
    const id = currentMatrix?.id;
    const values = currentMatrix?.values || [];
    const slotsPosition = currentMatrix?.slotsPosition || [];



    const [currentCount, setCurrentCount] = useState(0);






    const next = () => {
        if (currentIdIndex < matrixData.length - 1) setCurrentIdIndex(currentIdIndex + 1);

        if (currentCount < matrixData?.length - 1) setCurrentCount(currentCount + 1);
    };

    const prev = () => {
        if (currentIdIndex > 0) setCurrentIdIndex(currentIdIndex - 1);

        if (currentCount > 0) setCurrentCount(currentCount - 1);
    };



    // ==================================================================
    // Basic Matric Info 
    // ==================================================================

    const getU4MartixInfo = useStore((state) => state.getU4MartixInfo)

    const [MatrixDetails, setMatrixDetails] = useState();




    const fetchmatrixInfo = async () => {
        setLoading(true);
        const res = await getU4MartixInfo(address);
        setMatrixDetails(res);
        setLoading(false);
    };

    useEffect(() => {
        if (address) fetchmatrixInfo();
    }, [address]);






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


                        <DashboardInfo />

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
                                <button onClick={prev} className="w-10 h-10 bg-[#24b6ca] text-white text-3xl font-bold flex justify-center items-center rounded-sm cursor-pointer">
                                    {currentCount + 1}
                                </button>
                                <div>
                                    <div className="flex flex-wrap justify-between items-center ">
                                        <div>
                                            <span className="text-4xl md:text-5xl text-[#EFB90A] font-extrabold">
                                                Universe
                                            </span>
                                            <span className="text-2xl md:text-xl font-bold text-blue-500">
                                                {" "}
                                                U4 {">>>>"}
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
                                            <span className="rounded-xl border-2 text-[12px] lg:text-2xl px-6 lg:px-12 py-2 bg-yellow-500">
                                                Matrix ID {id ? id : "0"}
                                            </span>
                                        </div>

                                        {/* First Card - First Line */}
                                        <div className="flex justify-center">
                                            <div className="flex flex-col items-center">
                                                <button
                                                    className={`h-10 w-30 ${currentMatrix?.slotsPosition[0][0] == "1"
                                                        ? "bg-green-500"
                                                        : "bg-[#DED8C8]"
                                                        } rounded-xl flex justify-center items-center text-black text-lg cursor-pointer`}
                                                    onClick={() => {
                                                        if (id == "N/a") {
                                                            alert("data is Loading ")

                                                        } else {
                                                            navigate('/user-panel-home/UniverseU4', { state: { id: id, slotVal: 0, matrixData: matrixData } })

                                                            console.log({ id: id, slotVal: 0, matrixData: matrixData, plan: values[0].replace(/\$/g, "").trim() })
                                                        }
                                                    }}
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
                                                    {slotsPosition[0]?.map((value, j) => (
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
                                                        onClick={() => {

                                                            if (id == "N/a") {
                                                                alert("data is Loading ")

                                                            } else {
                                                                // navigate('/user-panel-home/UniverseU4', { state: { id: id, slotVal: 1, matrixData: matrixData, plan: values[0].replace(/\$/g, "").trim() } })
                                                                navigate('/user-panel-home/UniverseU4', { state: { id: id, slotVal: index + 2, matrixData: matrixData } });
                                                            }
                                                            console.log("id==========================================", { id: id, slotVal: index + 2, matrixData: matrixData, plan: value.replace(/\$/g, "").trim() })
                                                        }}
                                                        className={`h-10 w-30 ${currentMatrix?.slotsPosition[index + 1][0] === "1"
                                                            ? "bg-green-500"
                                                            : "bg-[#DED8C8]"
                                                            } rounded-xl flex justify-center items-center text-black text-lg cursor-pointer`}
                                                    >
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
                                <button onClick={next} className="w-10 h-10 bg-[#24b6ca] text-white text-3xl font-bold flex justify-center items-center rounded-sm cursor-pointer">
                                    {currentCount == matrixData?.length - 1 ? "0" : currentCount + 2}
                                </button>

                                <button className="cursor-pointer" onClick={next} disabled={currentIdIndex === matrixData?.length - 1}><FaAngleRight className="text-4xl hover:text-yellow-500" />
                                </button>
                            </div>
                        </div>

                        {/* Table */}



                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">

                            {/* Box */}
                            {(() => {
                                const matchedMatrix = MatrixDetails?.find(
                                    val => val.matrixID?.toString() === currentMatrix?.id?.toString()
                                );

                                const detail = matchedMatrix?.u5MatrixDetail || {};

                                const cards = [
                                    {
                                        title: 'Received',
                                        rama: detail.Received?.toString() || "0"
                                    },
                                    {
                                        title: 'Upgraded',
                                        rama: detail.Upgraded?.toString() || "0"
                                    },
                                    {
                                        title: 'Generated',
                                        rama: detail.Generated?.toString() || "0"
                                    },
                                    {
                                        title: 'Net Profit',
                                        rama: detail.NetProfit?.toString() || "0" // use correct key here if exists
                                    },
                                    {
                                        title: "Generated ID's",
                                        totalId: detail.GeneratedID?.toString() || "0"
                                    }
                                ];

                                return cards.map((item, index) =>
                                    item.title !== "Generated ID's" && item.title !== 'view Matrix' ? (
                                        <div
                                            key={index}
                                            style={{
                                                background:
                                                    "linear-gradient(45deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                                            }}
                                            className="p-3 rounded-2xl shadow hover:shadow-lg transition"
                                        >
                                            <h3 className="text-sm font-semibold text-white mb-2 ">{item.title}</h3>
                                            <div className="text-yellow-500 space-y-1">
                                                <p>
                                                    <span className="font- text-[13px]">Rama:</span> {item.rama}
                                                </p>
                                            </div>
                                        </div>
                                    ) : item.title === 'view Matrix' ? (
                                        <button
                                            key={index}
                                            style={{
                                                background:
                                                    "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                                            }}
                                            className="p-3 rounded-2xl shadow hover:shadow-lg transition"
                                        >
                                            <div className="text-yellow-500 flex justify-center gap-4"></div>
                                        </button>
                                    ) : (
                                        <div
                                            key={index}
                                            style={{
                                                background:
                                                    "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                                            }}
                                            className="p-5 rounded-2xl shadow hover:shadow-lg transition"
                                        >
                                            <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                                            <div className="text-yellow-500 space-y-1">
                                                <p style={{ fontSize: '15px' }}>
                                                    <span className="font-sm">TotalID :</span> {item.totalId}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                );
                            })()}


                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}