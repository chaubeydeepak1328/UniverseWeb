import React, { useEffect, useState } from 'react'
import universeLogo from "../assets/images/Universe_dahboard_Loogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDisconnect } from '@reown/appkit/react';
import { FaTelegram } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { removeAddress } from '../util/helpers';
import { useStore } from '../Store/UserStore';




const { disconnect } = useDisconnect();

const Header = () => {

    const ramaPriceInUsD = useStore((state) => state.ramaPriceInUsD);

    const [ramaInUSD, setRamaInUSD] = useState();

    const navigate = useNavigate();
    const handleDisconnect = async () => {
        try {
            await disconnect();
            removeAddress()
            navigate('/user-login');

        } catch (error) {
            console.error("Failed to disconnect:", error);
        }
    };

    useEffect(() => {
        const fetchRamaPrice = async () => {
            const res = await ramaPriceInUsD();

            console.log("Rama price in usd", res)
            setRamaInUSD(res)
        }

        fetchRamaPrice();
    })
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mt-2 mx-4 md:mx-10">
            <Link to="/user-panel-home" className="rounded-3xl">
                <img src={universeLogo} alt="Logo" className="h-20 md:h-[100px]" />
            </Link>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-xl text-white mt-4 md:mt-0">
                <div className="bg-transparent border border-cyan-400 text-cyan-400 rounded-full px-4 py-1 text-sm font-medium flex items-center justify-center">
                    <p>1 RAMA = ${ramaInUSD?.toString() || "0.00"}</p>
                </div>
                <div className="hover:text-blue-600">
                    <a
                        href="https://t.me/ramauniverse"
                        target="_blank"
                        className="flex justify-center items-center gap-2"
                    >
                        <div>
                            <FaTelegram className="text-blue-500" />
                        </div>
                        <div>Official Channel</div>
                    </a>
                </div>
                <div onClick={handleDisconnect} className="hover:text-red-600 flex items-center gap-2 cursor-pointer">
                    <div>Logout</div>
                    <RiLogoutCircleRLine className="text-red-500" />
                </div>
            </div>
        </div>
    )
}

export default Header
