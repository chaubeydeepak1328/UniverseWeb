import React, { useEffect, useState } from 'react';
import universeLogo from "../assets/images/universeLogo.png";
import { useParams } from 'react-router-dom';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { useStore } from '../Store/UserStore';

const Referral = () => {

    const { customId } = useParams();

    const getAllusers = useStore((state) => state.getAllusers);
    const registerUser = useStore((state) => state.registerUser);

    const { open } = useAppKit(); // This triggers wallet connection
    const { address, isConnected } = useAppKitAccount();

    const [isVerified, setIsVerified] = useState(false);


    const [isHovered, setIsHovered] = useState(false);
    const [sponsorId, setSponsorId] = useState(customId);

    const [sponsorAddress, setSponserAddress] = useState();

    const [message, setMessage] = useState('');

    const handleSponsorIdChange = (e) => {
        setSponsorId(e.target.value);
    };


    useEffect(() => {
        const openWalletConnect = async () => {
            await open();
        }

        openWalletConnect();
    }, [])



    useEffect(() => {
        const finalReg = async () => {
            try {

                if (isConnected && address) {

                    console.log('Registering with address:', sponsorAddress);
                    await registerUser(sponsorAddress, address);
                    setMessage('Registration successful!');
                    setSponserAddress('');
                    setIsVerified(false);


                }

            } catch (error) {
                setMessage(`Error during registration: ${error.message}`);
            }
        }

        if (isVerified) finalReg();
    }, [isVerified, address, isConnected])


    const handleRegister = async (e) => {
        e.preventDefault(); // prevent navigation

        if (sponsorId) {


            const isNumber = /^[0-9]*$/.test(sponsorId)

            if (!isNumber) {
                setMessage("Not a Valid UserId")
                return;
            }


            // Perform any action with the input data, like navigating to a user panel
            console.log("sponsorId ID entered:", sponsorId);

            const SponserAdd = await getAllusers(sponsorId)
            setSponserAddress(SponserAdd)
            console.log("User Address:", SponserAdd); // Log the fetched users to the console


            if (SponserAdd) {

                try {

                    if (!isConnected) {
                        await open();
                    }

                    setIsVerified(true)

                } catch (error) {
                    setMessage(`Registration failed: ${error.message}`);
                }
            }
        } else {
            // alert("Please enter a valid user ID.");
            setMessage("Please enter a valid user ID.")
        }


    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-black px-4 py-10">
            <div className="w-full max-w-md bg-gradient-to-b from-[#eceefa] via-[#096f72e8] to-[#096f72e8] rounded-3xl shadow-2xl p-8 space-y-8">

                {/* Header */}
                <div className="text-center space-y-3">
                    <img src={universeLogo} alt="Universe Logo" className="w-24 h-24 mx-auto" />
                    <h1 className="text-yellow-400 text-3xl font-extrabold tracking-wide">UNIVERSE</h1>
                    <p className="text-blue-200 text-sm uppercase">— Step into the Infinity —</p>
                </div>

                {/* Sponsor ID Section */}
                <div className="text-center space-y-3">
                    <h2 className="text-white text-2xl font-semibold">Sponsor ID</h2>
                    <p className="text-blue-200 text-sm">
                        ℹ Check the ID of your inviter. You can edit before proceeding to payment.
                    </p>
                    <input
                        type="text"
                        value={sponsorId}
                        onChange={handleSponsorIdChange}
                        className="w-48 mx-auto block px-4 py-2 bg-black/30 text-white text-center border border-blue-500 rounded-md focus:outline-none text-lg"
                    />


                    {/* To show the Message to the User */}

                    {message ? <p className={`text-sm p-2 ${(
                        message.startsWith("✅Valid Sponser address!") ||
                        message.startsWith("Registration successful!")
                    ) ? "text-green-400 bg-black" : "text-red-600 bg-black"}`}>
                        {message}
                    </p> : ""}

                    <div className='w-100 flex gap-2 justify-center'>
                        {message && (
                            <div className='flex gap-2 justify-center'>
                                <h2 >id: {sponsorId}</h2> <h2 >Required Rama : 0</h2> <h2 >Available Rama :20</h2>
                            </div>
                        )}
                    </div>


                    {/* To show the Message to the User */}




                    <button
                        onClick={handleRegister}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className={`mt-4 px-8 py-2 rounded-full font-bold text-lg transition-transform duration-300 ease-in-out cursor-pointer
              ${isHovered
                                ? "bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg scale-105"
                                : "bg-gradient-to-r from-yellow-500 to-yellow-700"
                            } text-black`}
                    >
                        Register
                    </button>


                </div>

                {/* Footer */}
                <div className="text-center space-y-2 pt-4 border-t border-white/20">
                    <p className="text-blue-200 text-sm">≫≫≫ Viewing of your account ≪≪≪</p>
                    <p className="text-blue-200 flex items-center justify-center gap-2 text-sm">
                        <span>👤</span> Check in RamaScan
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Referral;
