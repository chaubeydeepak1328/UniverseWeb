import React, { useEffect, useState } from "react";
import LeftUserPannel from "./LeftUserPannel";
import Header from "./Header";
import DashboardInfo from "./DashboardInfo";
import { useStore } from "../Store/UserStore";






export default function UplineBonus() {
    const values = [0.005, 0.001, 0.003, 0.003, 0.002, 0.004, 0.002];

    // const [address, setAddress] = useState(JSON.parse(localStorage.getItem("userData") || '{}')?.userAddress);


    const [splitData, setSplitData] = useState()

    const getSplitBonus = useStore((state) => state.getSplitBonus);
    const fetchU3MatrixLogs = useStore((state) => state.fetchU3MatrixLogs);


    useEffect(() => {
        const fetch = async () => {
            await fetchU3MatrixLogs(); // 👈 this is what actually fills u3MatrixLogs
        };
        fetch();
    }, []);
    




    useEffect(() => {

        const fetchSplit = async () => {

            const data = await getSplitBonus();
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$u3plsu split Bonus", data)
            setSplitData(data)
        }


        fetchSplit();
    }, [])


    return (
        <div className=" px-4"
            style={{
                background: "linear-gradient(180deg, #000000, #25752D)",
            }}
        >
            <div className="max-w-6xl  h-auto m-auto p-4">
                {/* Top Header */}
                <Header />
                <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
                    {/* left part */}
                    <LeftUserPannel />

                    {/* Right Part */}
                    <div className="w-full">
                        <DashboardInfo />

                        {/* Partners table */}
                        <div className="flex flex-col mt-10  border-1 rounded-2xl p-6 text-center"
                            style={{
                                background:
                                    "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
                            }}>
                            <div className="text-3xl font-bold mb-5 text-start text-[#EFB90A]">
                                Split Bonus Details
                            </div>

                            <div className="overflow-x-auto">
                                {" "}
                                {/* Enables horizontal scrolling on small screens */}
                                <table className="w-full min-w-[600px] border-collapse">
                                    <thead>
                                        <tr className="">
                                            <th className="p-2 border">Type</th>
                                            <th className="p-2 border">From Wallet</th>
                                            <th className="p-2 border">Tx Hash</th>
                                            <th className="p-2 border">from slot</th>
                                            <th className="p-2 border">from cycle</th>
                                            <th className="p-2 border">Level</th>
                                            <th className="p-2 border">Profit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t">
                                            <td className="p-2 border">34</td>
                                            <td className="p-2 border">0xc09...12344</td>
                                            <td className="p-2 border">0xc03...38624</td>
                                            <td className="p-2 border">2</td>
                                            <td className="p-2 border">2</td>
                                            <td className="p-2 border">2</td>
                                            <td className="p-2 border">0.000 / $0.000</td>
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