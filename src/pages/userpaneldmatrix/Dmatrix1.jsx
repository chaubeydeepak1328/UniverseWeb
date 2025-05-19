import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { PiLineVerticalLight } from "react-icons/pi";
import { GiCircle } from "react-icons/gi";
import { TfiReload } from "react-icons/tfi";
import { useLocation } from "react-router-dom";

import LeftUserPannel from "../../components/LeftUserPannel";
import Header from "../../components/Header";
import DashboardInfo from "../../components/DashboardInfo";
import { useStore } from "../../Store/UserStore";

export default function UserPanel() {

  const location = useLocation();
  const { slotNumber } = location.state || {};

  const [isLoadingU3, setIsLoadingU3] = useState(true);


  const [address, setAddress] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem("userData"));
      return data?.userAddress || "";
    } catch {
      return "";
    }
  });


  const getU3Details = useStore((state) => state.getU3Details);

  const [u3Data, setU3Data] = useState();

  useEffect(() => {
    const fetchU3Details = async () => {

      setIsLoadingU3(true);
      const response = await getU3Details(address);

      console.log(response);
      setU3Data(response)

      setIsLoadingU3(false);
    }

    fetchU3Details();
  }, [])


  // const dummyData = [
  //   { slotNo: 1, cycles: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]] },
  //   { slotNo: 2, cycles: [[1, 1, 1, 1]] },
  //   { slotNo: 3, cycles: [[1, 1, 1, 0]] },
  //   { slotNo: 4, cycles: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 0, 0]] },
  //   { slotNo: 5, cycles: [[1, 0, 0, 0]] },
  //   { slotNo: 6, cycles: [[1, 1, 0, 0]] },
  //   { slotNo: 7, cycles: [[1, 1, 1, 0]] },
  //   { slotNo: 8, cycles: [[0, 0, 0, 0]] },
  //   { slotNo: 9, cycles: [[0, 0, 0, 0]] },
  //   { slotNo: 10, cycles: [[0, 0, 0, 0]] },
  // ];



  const [slotIndex, setSlotIndex] = useState(slotNumber ? slotNumber : 0);
  const [cycleIndex, setCycleIndex] = useState(0);

  const slot = u3Data?.[slotIndex];
  const cycles = slot?.cycles;
  const currentCycle = cycles?.[cycleIndex];

  const prevSlot = () => {
    setSlotIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setCycleIndex(0);
  };

  const nextSlot = () => {
    setSlotIndex((prev) => (prev < u3Data?.length - 1 ? prev + 1 : prev));
    setCycleIndex(0);
  };

  const prevCycle = () => {
    setCycleIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const nextCycle = () => {
    setCycleIndex((prev) => (prev < cycles.length - 1 ? prev + 1 : prev));
  };

  // =======================================================================================================
  // Fetch the Table Details
  // ======================================================================================================

  const [tableData, setTableData] = useState([]);

  const fetchU3MatrixLogs = useStore((state) => state.fetchU3MatrixLogs);

  useEffect(() => {
    const fetchTableData = async () => {
      const res = await fetchU3MatrixLogs(address);

      console.log("res--------------->", res)

      setTableData(res)

    }
    if (address) fetchTableData()
  }, [])


  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Filter the Data on the basis of slot and cycles

  // const filterData = Array.isArray(tableData)
  //   ? tableData.filter(
  //     (val) =>
  //       Number(val.cycleNo) === Number(cycleIndex + 1) &&
  //       Number(val.slotLevel) === Number(slotIndex + 1)
  //   )
  //   : [];


  const filterData = Array.isArray(tableData)
    ? tableData
      .filter(
        (val) =>
          Number(val.cycleNo) === Number(cycleIndex + 1) &&
          Number(val.slotLevel) === Number(slotIndex + 1)
      )
      .sort((a, b) => Number(a.positionIndex) - Number(b.positionIndex)) // Sort by positionIndex ascending
    : [];


  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filterData?.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filterData?.length / recordsPerPage);



  function convertTimestampToDateTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    return date.toLocaleString(); // Returns local date and time string
  }





  return (
    <div
      className="bg-black min-h-screen rounded-3xl"
      style={{
        background: "linear-gradient(180deg, #000000, #25752D)",
      }}
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

              <div className="w-full">
                <div className="flex justify-start">
                  <span className="text-2xl md:text-5xl text-[#EFB90A] font-extrabold">
                    Universe
                  </span>{" "}
                  <span className="text-2xl md:text-xl font-bold text-blue-500">
                    U3 Plus {'>>>>'}
                  </span>
                </div>
              </div>



              <div className="flex flex-wrap justify-start items-center gap-0 mt-10 p-4">
                {/* Recycle Control */}
                <div className="flex flex-col items-center justify-center mt-30">
                  <FaChevronUp
                    onClick={isLoadingU3 ? undefined : prevCycle}
                    className={`cursor-pointer text-3xl ${isLoadingU3 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'}`}
                  />
                  <div className="flex justify-center items-center gap-2">
                    <div>RECYCLE</div>
                    <TfiReload className="text-xl text-pink-500" />
                    <div>
                      {cycleIndex + 1}/{cycles?.length}
                    </div>
                  </div>
                  <FaChevronDown
                    onClick={isLoadingU3 ? undefined : nextCycle}
                    className={`cursor-pointer text-3xl ${isLoadingU3 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'}`}
                  />
                </div>

                {/* Main ID Card with Navigation */}
                <div className="flex flex-col lg:flex-row justify-center items-center ml-0 lg:ml-[-50px]">
                  <div className="flex justify-center items-center gap-2">
                    <FaChevronLeft
                      onClick={isLoadingU3 ? undefined : prevSlot}
                      className={`cursor-pointer text-xl ${isLoadingU3 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'}`}
                    />
                    <button onClick={isLoadingU3 ? undefined : nextSlot} className="w-10 h-10 bg-[#24b6ca] text-white text-3xl font-bold flex justify-center items-center rounded-sm cursor-pointer">
                      {slot?.slotNo}
                    </button>
                  </div>

                  {/* ID Card */}
                  <div className="flex flex-col items-center p-6 rounded-2xl transition-transform duration-300">
                    <div className="h-16 w-40 bg-gradient-to-br from-green-500 to-yellow-200 rounded-xl flex justify-center items-center text-white text-2xl font-bold">
                      {/* ID : S{slot.slotNo}-C{cycleIndex + 1} */}
                      ID : 0
                    </div>
                    <div className="bg-[#24b6ca] w-30 h-8 ml-36 mt-[-10px] z-0 rounded-sm text-white flex justify-center items-center">
                      slot {slotIndex + 1}
                    </div>

                    {/* Vertical Lines */}
                    <div className="mt-4 space-y-1">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex justify-center gap-5">
                          {[...Array(4)].map((__, j) => (
                            <PiLineVerticalLight
                              key={j}
                              className="text-white text-xl"
                            />
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* Circles */}
                    <div className="flex justify-center gap-3 mt-2">
                      {currentCycle?.map((status, j) => (
                        j == 2 ? <GiCircle
                          key={j}
                          className="rounded-full text-xl size-8"
                          style={
                            status
                              ? (slotIndex === 0 ? { backgroundColor: 'white' } : { background: 'linear-gradient(to bottom, white 50%, #ff66d9 50%)' })
                              : { color: 'gray' }
                          }
                        />
                          : j == 3 ? <GiCircle
                            key={j}
                            // className={status ? "bg-white rounded-2xl text-xl" : "text-gray-500 text-xl"}
                            className={`text-xl rounded-full size-8 ${status ? "bg-green-300" : "text-gray-400"
                              }`}
                          /> : <GiCircle
                            key={j}
                            // className={status ? "bg-white rounded-2xl text-xl" : "text-gray-500 text-xl"}
                            className={`text-xl rounded-full size-8 ${status ? "text-white bg-white" : "text-gray-400"
                              }`}
                          />


                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-2">
                    <button onClick={nextSlot} className="w-10 h-10 bg-[#24b6ca] text-3xl font-bold flex justify-center items-center rounded-sm cursor-pointer">
                      {slotIndex + 2 <= u3Data?.length ? slotIndex + 2 : "-"}
                    </button>
                    <FaChevronRight
                      onClick={isLoadingU3 ? undefined : nextSlot}
                      className={`cursor-pointer text-xl ${isLoadingU3 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full overflow-x-auto py-4  max-w-6xl mx-auto">
              {/* Selection Controls */}


              {/* Table Display */}
              {tableData?.length > 0 || tableData?.length == null ? (
                <div>
                  <table className="w-full min-w-[700px] border-collapse text-sm sm:text-base">
                    <thead>
                      <tr className="bg-gray-100">

                        <th className="p-3 text-left text-black">Sno</th>
                        <th className="p-3 text-left text-black">Slot</th>
                        <th className="p-3 text-left text-black">Cycle</th>
                        <th className="p-3 text-left text-black">Position</th>
                        <th className="p-3 text-left text-black">initiatedFrom</th>
                        <th className="p-3 text-left text-black">finalReceiver</th>
                        <th className="p-3 text-left text-black">USD</th>
                        <th className="p-3 text-left text-black">RAMA</th>
                        <th className="p-3 text-left text-black">Tx Hash</th>
                        <th className="p-3 text-left text-black">Date & Time</th>
                        <th className="p-3 text-left text-black">Status</th>
                        <th className="p-3 text-left text-black">Net Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecords?.map((tx, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3">{index + 1}</td>
                          <td className="p-3">{tx?.slotLevel}</td>
                          <td className="p-3">{tx?.cycleNo}</td>
                          <td className="p-3">{tx?.positionIndex}</td>
                          <td className="p-3"> {tx?.initiatedFrom.slice(0, 7) + "....." + tx?.initiatedFrom.slice(-7)}</td>
                          <td className="p-3"> {tx?.finalReceiver.slice(0, 7) + "....." + tx?.finalReceiver.slice(-7)}</td>
                          <td className="p-3">{tx?.amountInUSD}</td>
                          <td className="p-3">{tx?.amountInRAMA}</td>
                          <td className="p-3 font-mono text-blue-600 truncate"> <a target="_blank" href={`https://ramascan.com/tx/${tx?.txHash}`}> {tx?.txHash.slice(0, 7) + "....." + tx?.txHash.slice(-7)}</a></td>
                          <td className="p-3">{convertTimestampToDateTime(tx?.timestamp)}</td>
                          <td className="p-3">{tx?.finalReceiver == address ? "Credit" : "forwarded"}</td>
                          <td className="p-3">{tx?.finalReceiver == address ? tx.amountInUSD : "0"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination Controls */}
                  <div className="flex  justify-center lg:justify-end gap-6 items-center mt-4">
                    <button
                      className="px-4 py-2 text-black bg-gray-100 rounded disabled:opacity-50 cursor-pointer"
                      onClick={() => setCurrentPage(p => p - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>

                    <span>Page {currentPage} of {Number(totalPages)}</span>

                    <button
                      className="px-4 py-2 text-black bg-gray-100 rounded disabled:opacity-50 cursor-pointer"
                      onClick={() => setCurrentPage(p => p + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 text-gray-500">
                  Select a Slot and Position to view transactions
                </div>
              )}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

