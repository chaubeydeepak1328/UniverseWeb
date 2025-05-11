import React, { useEffect, useState } from "react";
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
import { FaChevronLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import LeftUserPannel from "../../components/LeftUserPannel";
import Header from "../../components/Header";
import { useStore } from "../../Store/UserStore";
import DashboardInfo from "../../components/DashboardInfo";



export default function UserPanel() {

  const navigate = useNavigate();

  const [address, setAddress] = useState(JSON.parse(localStorage.getItem("userData")).userAddress);


  const getU5info = useStore((state) => state.getU5info)




  const dummyData = [
    {
      id: "N/a",
      values: ["$10", "$30", "$90", "$270", "$810"],
      slotsPosition: [
        ["0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0"],
      ]
    },
    // {
    //   id: 2,
    //   values: ["$10", "$30", "$90", "$270", "$810"],
    //   slotsPosition: [
    //     ["0", "0", "0", "0", "0"],
    //     ["0", "0", "0", "0", "0"],
    //     ["0", "0", "0", "0", "0"],
    //     ["0", "0", "0", "0", "0"],
    //     ["0", "0", "0", "0", "0"],
    //   ]
    // },
  ];


  const [currentIdIndex, setCurrentIdIndex] = useState(0);


  const [matrixData, setMatrixData] = useState(dummyData);


  useEffect(() => {
    const fetchU5 = async () => {
      try {
        const response = await getU5info(address);
        console.log("==========U5 response---->", response);
        if (response) {
          setMatrixData(response); // Make sure this is an array
        }
      } catch (err) {
        console.error("Error fetching U5 info:", err);
      }
    };

    if (address) {
      fetchU5();
    }
  }, [address]);




  const currentMatrix = matrixData?.[currentIdIndex];
  const id = currentMatrix?.id;
  const values = currentMatrix?.values || [];
  const slotsPosition = currentMatrix?.slotsPosition || [];




  const [currentCount, setCurrentCount] = useState(0);



  const next = () => {
    if (currentIdIndex < matrixData?.length - 1) setCurrentIdIndex(currentIdIndex + 1);

    if (currentCount < matrixData?.length - 1) setCurrentCount(currentCount + 1);
  };

  const prev = () => {
    if (currentIdIndex > 0) setCurrentIdIndex(currentIdIndex - 1);

    if (currentCount > 0) setCurrentCount(currentCount - 1);

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


            <DashboardInfo />

            {/* Universe U5 Section */}
            <div
              className="grid grid-cols-1 mt-10 border-[#3C71A9] border-1 rounded-2xl p-6 text-center"
              style={{
                background:
                  "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
              }}
            >
              <div className="flex items-center justify-between">
                <button className="cursor-pointer" onClick={prev} disabled={currentIdIndex === 0}><FaChevronLeft className="text-3xl hover:text-yellow-500" />
                </button>

                <button onClick={prev} className="w-10 h-10 bg-[#24b6ca] text-white text-3xl font-bold flex justify-center items-center rounded-sm cursor-pointer">
                  {currentCount + 1}
                </button>
                <div>
                  <div className="flex flex-wrap gap-y-4 justify-between">
                    <div>
                      <span className="text-4xl md:text-5xl text-[#EFB90A] font-extrabold">
                        Universe
                      </span>
                      <span className="text-2xl md:text-xl font-bold text-blue-500">
                        {" "}
                        U5 {">>>>>"}
                      </span>
                    </div>

                    <div>

                      <div className="flex justify-center items-center gap-1">
                        <div className="h-[20px] w-[20px] rounded-full flex justify-center items-center cursor-pointer border border-black bg-yellow-500">
                          <BsCaretUpFill className="text-black text-xl" />
                        </div>
                        <div>1-3-5 Upgrade</div>
                      </div>
                      <div>
                        <div className="flex justify-center items-center gap-1">
                          <div className="h-[20px] w-[20px] rounded-full flex justify-center items-center cursor-pointer border border-black bg-blue-500">
                          </div>
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


                    {/* First Card */}
                    <div className="flex justify-center">
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => {
                            if (id == "N/a") {
                              alert("data is Loading ")

                            } else {
                              navigate('/user-panel-home/universe', { state: { id: id, slotVal: 0, matrixData: matrixData } })

                              console.log({ id: id, slotVal: 0, matrixData: matrixData, plan: values[0].replace(/\$/g, "").trim() })
                            }
                          }}

                          className={`h-10 w-30 ${currentMatrix?.slotsPosition[0][0] == "1"
                            ? "bg-green-500"
                            : "bg-[#DED8C8]"
                            } rounded-xl flex justify-center items-center text-black text-lg cursor-pointer`}
                        >
                          {values[0]}
                        </button>
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className="flex justify-center gap-2">
                            {[...Array(5)].map((__, j) => (
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

                    {/* Remaining Cards */}
                    <div className="flex flex-wrap justify-center gap-4 my-10">
                      {values.slice(1).map((value, index) => (
                        <div key={index + 1} className="flex flex-col items-center">
                          <button
                            onClick={() => {

                              if (id == "N/a") {
                                alert("data is Loading ")

                              } else {
                                // navigate('/user-panel-home/universe', { state: { id: id, slotVal: 1, matrixData: matrixData, plan: values[0].replace(/\$/g, "").trim() } })
                                navigate('/user-panel-home/universe', { state: { id: id, slotVal: index + 1, matrixData: matrixData } });
                              }
                              console.log("id==========================================", { id: id, slotVal: index + 1, matrixData: matrixData, plan: value.replace(/\$/g, "").trim() })
                            }}
                            // className="h-10 w-30 bg-[#DED8C8] rounded-xl flex justify-center items-center text-black text-lg cursor-pointer"

                            className={`h-10 w-30 ${currentMatrix?.slotsPosition[index + 1][0] === "1"
                              ? "bg-green-500"
                              : "bg-[#DED8C8]"
                              } rounded-xl flex justify-center items-center text-black text-lg cursor-pointer`}

                          >
                            {value}
                          </button>
                          {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex justify-center gap-2">
                              {[...Array(5)].map((__, j) => (
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
                  {currentCount == matrixData.length - 1 ? "0" : currentCount + 2}
                </button>

                <button className="cursor-pointer" onClick={next} disabled={currentIdIndex === matrixData?.length - 1}><FaAngleRight className="text-4xl hover:text-yellow-500" />
                </button>
              </div>







            </div>

            {/* Table */}
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