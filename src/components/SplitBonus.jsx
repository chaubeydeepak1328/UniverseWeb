import React, { useEffect, useState } from "react";
import LeftUserPannel from "./LeftUserPannel";
import Header from "./Header";
import DashboardInfo from "./DashboardInfo";
import { useStore } from "../Store/UserStore";

export default function UplineBonus() {
    const [address, setAddress] = useState(JSON.parse(localStorage.getItem("userData") || '{}')?.userAddress);
    const [splitData, setSplitData] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedCycle, setSelectedCycle] = useState(null);

    const getSplitBonus = useStore((state) => state.getSplitBonus);

    useEffect(() => {
        const fetchSplit = async () => {
            const data = await getSplitBonus(address);
            console.log("&&&&&&&&&&&&&&&&&&&", data)
            setSplitData(data);

        };
        if (address) fetchSplit();
    }, [address]);

    const handleSlotChange = (e) => {
        setSelectedSlot(Number(e.target.value));
        setSelectedCycle(null); // Reset cycle when slot changes
    };

    const handleCycleChange = (e) => {
        setSelectedCycle(Number(e.target.value));
    };

    const slotOptions = splitData.map(item => item.slot);
    const cycleOptions = selectedSlot != null
        ? splitData.find(item => item.slot === selectedSlot)?.cycleList || []
        : [];

    const selectedData = splitData.find(item => item.slot === selectedSlot);
    const splitPayments = selectedData?.splitPayments?.filter(p => p.cycle === selectedCycle) || [];

    return (
        <div className="px-4" style={{ background: "linear-gradient(180deg, #000000, #25752D)" }}>
            <div className="max-w-6xl h-auto m-auto p-4">
                <Header />
                <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
                    <LeftUserPannel />
                    <div className="w-full">
                        <DashboardInfo />

                        <div className="flex flex-col mt-10 rounded-2xl p-6 text-center"
                            style={{ background: "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)" }}>
                            <div className="text-3xl font-bold mb-5 text-start text-[#EFB90A]">
                                Split Bonus Details
                            </div>

                            <div className="flex gap-4 mb-6">
                                <select value={selectedSlot ?? ''} onChange={handleSlotChange} className="p-2 rounded bg-white text-black">
                                    <option value="" disabled>Select Slot</option>
                                    {slotOptions.map(slot => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </select>

                                <select value={selectedCycle ?? ''} onChange={handleCycleChange} className="p-2 rounded bg-white text-black" disabled={selectedSlot === null}>
                                    <option value="" disabled>Select Cycle</option>
                                    {cycleOptions.map(cycle => (
                                        <option key={cycle} value={cycle}>{cycle}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[600px] border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="p-2 border">Initiated From</th>
                                            <th className="p-2 border">Splited With</th>
                                            <th className="p-2 border">Second Upline</th>
                                            <th className="p-2 border">RAMA</th>
                                            <th className="p-2 border">USD</th>
                                            <th className="p-2 border">Receiver</th>
                                            <th className="p-2 border">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {splitPayments.map((item, idx) => (
                                            <tr key={idx} className="border-t">
                                                <td className="p-2 border">{item.initiatedFrom.slice(0, 6) + "...." + item.initiatedFrom.slice(-8)}</td>
                                                <td className="p-2 border">{item.splitedWith.slice(0, 6) + "...." + item.splitedWith.slice(-8)}</td>
                                                <td className="p-2 border">{item.isReceiverSecondUpline ? "Yes" : "No"}</td>
                                                <td className="p-2 border">
                                                    {Number(item.amountInRAMA?.toString()) / 1e18} RAMA
                                                </td>
                                                <td className="p-2 border">
                                                    ${Number(item.amountInUSD?.toString())}
                                                </td>
                                                <td className="p-2 border">{item.receiver.slice(0, 6) + "...." + item.receiver.slice(-8)}</td>
                                                <td className="p-2 border">
                                                    {new Date(Number(item.timeStamp?.toString()) * 1000).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                        {splitPayments.length === 0 && (
                                            <tr>
                                                <td className="p-2 border text-center" colSpan="7">No split payments for this cycle.</td>
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
