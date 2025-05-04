import React from 'react'
import universeLogo from "../assets/images/Universe_dahboard_Loogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDisconnect } from '@reown/appkit/react';
import { FaTelegram } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";




const { disconnect } = useDisconnect();

const Header = () => {
    const navigate = useNavigate();
    const handleDisconnect = async () => {
        try {
            await disconnect();
            navigate('/user-login');

        } catch (error) {
            console.error("Failed to disconnect:", error);
        }
    };
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mt-2 mx-4 md:mx-10">
            <Link to="/" className="rounded-3xl">
                <img src={universeLogo} alt="Logo" className="h-20 md:h-[100px]" />
            </Link>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-xl text-white mt-4 md:mt-0">
                {/* <div className="hover:text-blue-600">
                     <a
                       href="https://www.ramestta.com"
                       target="_blank"
                       rel="noopener noreferrer"
                     >
                       Ramestta Blockchain
                     </a>
                   </div> */}
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
