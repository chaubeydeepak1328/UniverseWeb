import { useEffect, useState } from "react";
import LeftUserPannel from "./LeftUserPannel";
import Header from "./Header";
import DashboardInfo from "./DashboardInfo";
import { useStore } from "../Store/UserStore";

export default function UplineBonus() {


  const [address, setAddress] = useState(JSON.parse(localStorage.getItem("userData")).userAddress);


  const partnerTable = useStore((state) => state.partnerTable);

  const [partnerDetails, setPartnerDetails] = useState([]);

  useEffect(() => {
    const fetchPartnerDetails = async () => {
      const res = await partnerTable(address);
      if (res) setPartnerDetails(res);
    };

    if (address) fetchPartnerDetails();
  }, [address]);

  return (
    <div className="px-4"
      style={{
        background: "linear-gradient(180deg, #000000, #25752D)",
      }}
    >
      <div className="max-w-6xl h-auto m-auto p-4">
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
            <div className="flex flex-col mt-10 border-1 rounded-2xl p-6 text-center"
              style={{
                background:
                  "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
              }}>
              <div className="text-3xl font-bold mb-5 text-start text-[#EFB90A]">
                Partners
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse text-white text-sm">
                  <thead>
                    <tr>
                      <th className="p-2 border">ID</th>
                      <th className="p-2 border">Date</th>
                      <th className="p-2 border">My Partners</th>
                      {/* <th className="p-2 border">Tx Hash</th> */}
                      <th className="p-2 border">Profit (RAMA / USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partnerDetails?.length > 0 ? (
                      partnerDetails.map((partner, index) => (
                        <tr key={index} className="border-t border-gray-600">
                          <td className="p-2 border text-center">{index + 1}</td>
                          <td className="p-2 border text-center">
                            {new Date(parseInt(partner.registrationTime) * 1000).toLocaleDateString()}
                          </td>
                          <td className="p-2 border text-center">
                            {partner.wallet?.slice(0, 6)}...{partner.wallet?.slice(-4)}
                          </td>
                          {/* <td className="p-2 border text-center">—</td> */}
                          <td className="p-2 border text-center">
                            {parseFloat(partner.totalProfit)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="p-4 text-center text-gray-400">
                          No partner data available
                        </td>
                      </tr>
                    )}
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
