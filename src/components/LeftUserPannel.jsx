import { useAppKitAccount } from '@reown/appkit/react';
import React, { useEffect, useState } from 'react'
import { useStore } from '../Store/UserStore';

import universeCoin from "../assets/images/universeCoin.png";

import { RxCopy } from "react-icons/rx";
import {
    FaExternalLinkAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const LeftUserPannel = () => {

    const [address, setAddress] = useState(JSON.parse(localStorage.getItem("userData")).userAddress);


    const LeftUserPanInfo = useStore((state) => state.LeftUserPanInfo)





    const [fetchData, setFetchData] = useState()

    useEffect(() => {
        const fetchUserData = async () => {
            if (address) {
                const res = await LeftUserPanInfo(address);
                console.log("*******************Fetched Matrix Earnings:", res?.grandTotal);

                if (res) {
                    setFetchData(res);
                }
            }
        };

        fetchUserData();
    }, [address]);



    const [userId, setUserId] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [data, setData] = useState(null);


    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserId(parsedUser.userId);
            setUserAddress(parsedUser.userAddress);
            setData(parsedUser.data);
        }
    }, []);


    console.log("User ID:", userId, userAddress, data);








    const handleCopy = (address) => {
        if (address) {
            navigator.clipboard.writeText(address);
            toast.success("Address copied to clipboard!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (


        <div
            className=" bg-transparent border border-cyan-400 text-cyan-400 px-4 py-1 text-sm font-medium  items-center justify-center flex flex-col rounded-2xl w-full lg:w-[350px] p-10 text-center backdrop-blur-md shadow-xl  lg:h-[102vh]"
        // style={{
        //     background:
        //         "linear-gradient(180deg, rgba(11, 11, 142, 1) 0%, rgba(115, 118, 120, 1) 100%)",
        // }}
        >


            <div className="flex justify-between items-center">
                <div className="text-md text-blue-500">
                    {/* <RiBitCoinLine /> */}
                    {/* <img
                        src={universeCoin}
                        alt="universeCoin"
                        className="h-10 w-10"
                    /> */}
                    <p className='uppercase text-white cursor-pointer'>Dashboard</p>
                </div>
                <div className=" lg:text-2xl font-bold">{userId ? "ID :" + userId : "Not Registered"}</div>
            </div>
            <div className="w-full flex justify-end mt-2">
                <p className=" text-xl lg:text-2xl text-green-500">${fetchData?.earnedDollar || 0}</p>
            </div>

            <div style={{ background: "linear-gradient(135deg, #00f20, #0575e6)" }} className="bg-transparent  border-1 w-full rounded-xl  mt-5 h-10 flex items-center justify-center lg:w-[260px] mx-auto">
                RAMA {fetchData?.grandTotal || 0}
            </div>
            <div className="mt-2 h-10 flex items-center justify-center w-full lg:w-[250px] mx-auto text-xl font-bold">
                {userAddress ? userAddress.slice(0, 7) + "..." + userAddress.slice(-7) : "0x"}
            </div>
            <div className="flex justify-between  mt-2 px-2">
                <FaExternalLinkAlt className="hover:text-blue-700 cursor-pointer" />
                <RxCopy onClick={() => handleCopy(userAddress)} className="text-xl font-bold hover:text-blue-700 cursor-pointer" />
            </div>
            <div className="bg-transparent border-1 w-full rounded-xl  mt-5 h-10 flex items-center justify-center lg:w-[260px] mx-auto">
                Ramestta Blockchain
            </div>
            <Link className="mt-2 h-10 flex items-center justify-center w-full lg:w-[250px] mx-auto hover:to-blue-700 ">
                https://ramestta.com
            </Link>
            <div className="bg-transparent border-1 w-full rounded-xl  mt-5 h-10 flex items-center justify-center lg:w-[260px] mx-auto">
                Sponser Address
            </div>
            <div className="lg:text-xl font-bold">
                <p> {data?.sponserAdd ? data?.sponserAdd?.slice(0, 7) + "..." + data?.sponserAdd?.slice(-7) : "Not Available"}</p>
                <p> {data?.sponserId && `ID: ${data?.sponserId}`}</p>
            </div>
            <div className="flex justify-between  mt-2 px-2">
                <FaExternalLinkAlt className="hover:text-blue-700 cursor-pointer" />
                <RxCopy onClick={() => handleCopy(data?.sponserAdd)} className="text-xl font-bold hover:text-blue-700 cursor-pointer" />
            </div>

        </div>
    )
}

export default LeftUserPannel
