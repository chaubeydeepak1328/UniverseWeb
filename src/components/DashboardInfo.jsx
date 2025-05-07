import React, { useEffect, useState } from 'react'
import { FaCheckToSlot } from 'react-icons/fa6'
import { GiSplitArrows } from 'react-icons/gi'
import { MdOutlineContactMail } from 'react-icons/md'
import { PiUsersFourBold } from 'react-icons/pi'
import { RxCopy } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { useStore } from '../Store/UserStore'

const DashboardInfo = () => {

    const [address, setAddress] = useState(JSON.parse(localStorage.getItem("userData")).userAddress);
    const [ActivatedSlot, setActivatedSlot] = useState();
    const [InvitedPartners, setInvitedPartners] = useState();


    const homePannelInfo = useStore((state) => state.homePannelInfo)

    useEffect(() => {
        const DahPannelInfo = async () => {
            const storedUser = localStorage.getItem("userData");
            if (!storedUser) return;

            const parsedUser = JSON.parse(storedUser);
            setAddress(parsedUser.userAddress);

            const data = await homePannelInfo(parsedUser.userAddress);
            if (data) {
                setActivatedSlot(data.slotActivated);
                setInvitedPartners(data.InvitedPartner);
            } else {
                setActivatedSlot("N/A");
                setInvitedPartners("N/A");
            }
        };

        DahPannelInfo();
    }, []);




    return (
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
                            Partners Invited :{InvitedPartners}
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
                            Slot Activated : {ActivatedSlot}
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
    )
}

export default DashboardInfo
