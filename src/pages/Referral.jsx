import React, { useEffect, useState } from 'react';
import universeLogo from "../assets/images/universeLogo.png";
import { useParams } from 'react-router-dom';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { useStore } from '../Store/UserStore';

import { Spinner } from "../util/helpers";
import { useTransaction } from '../config/register';

import TransactionModal from "../components/TransactionModal"

const Referral = () => {


    // for Modal
    // ========================================================
    const [showModal, setShowModal] = useState(false);
    // =========================================================

    const [trxData, setTrxData] = useState();
    const { customId } = useParams();

    const getAllusers = useStore((state) => state.getAllusers);
    const IsUserExist = useStore((state) => state.IsUserExist);
    const registerUser = useStore((state) => state.registerUser);
    const getBalance = useStore((state) => state.getBalance)

    const { open } = useAppKit(); // This triggers wallet connection
    const { address, isConnected } = useAppKitAccount();
    const [balance, setBalance] = useState();

    const [isVerified, setIsVerified] = useState(false);


    const [isHovered, setIsHovered] = useState(false);
    const [sponsorId, setSponsorId] = useState(customId);

    const [sponsorAddress, setSponserAddress] = useState();

    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const [isUserExist, setIsUserExist] = useState(false);

    const handleSponsorIdChange = (e) => {
        setSponsorId(e.target.value);
        setIsVerified(false)
    };


    useEffect(() => {
        if (!address || !isConnected) {
            const openWalletConnect = async () => {
                await open();
            }

            openWalletConnect();
        }
    }, [])



    const { handleSendTx, hash } = useTransaction(trxData !== null && trxData);


    useEffect(() => {
        if (trxData) {
            try {
                handleSendTx(trxData);
            } catch (error) {
                setLoading(false)
                alert("somthing went Wrong")
            }

        }
    }, [trxData]);


    useEffect(() => {
        if (hash) {
            console.log("Transaction hash:", hash);


            // trxHashInfo
            setMessage('Registration successful!');
            setLoading(false)

            setShowModal(true)
        }
    }, [hash])


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (address) {
                    // First check if the user exists
                    const response = await IsUserExist(address);
                    setIsUserExist(response.isexist);

                    console.log("================response", response)

                    // Check if user exists


                    const bal = await getBalance(address);
                    setBalance(bal);
                    console.log("================response", bal)


                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [address, isConnected]);









    const finalReg = async () => {
        setLoading(true);
        try {

            if (!isVerified) {
                alert("Invalid User ID");
                setLoading(false);
                return;
            }

            if (isConnected && (address && isVerified)) {

                console.log('Registering with address:', sponsorAddress);
                const response = await registerUser(sponsorAddress.userAddress, address);
                console.log("trx response", response)

                setTrxData(response);


                setIsVerified(false);

                setLoading(false);


            }

        } catch (error) {
            setLoading(false);
            setMessage(`Error during registration: ${error.message}`);
        }
    }


    const handleRegister = async () => {
        setLoading(true);

        if (sponsorId) {


            if (isUserExist) {
                setMessage("You are Already Regesterd")
                setLoading(false);
                return;
            }

            const isNumber = /^[0-9]*$/.test(sponsorId)

            if (!isNumber) {
                setMessage("Not a Valid UserId")
                setLoading(false);
                return;
            }


            // Perform any action with the input data, like navigating to a user panel
            console.log("sponsorId ID entered:", sponsorId);

            let increaseSponser = sponsorId - 1;

            const SponserAdd = await getAllusers(increaseSponser)
            setSponserAddress(SponserAdd)
            console.log("User Address:", SponserAdd); // Log the fetched users to the console


            if (SponserAdd) {

                try {

                    if (!isConnected) {
                        await open();
                    }

                    setIsVerified(true)
                    setMessage("✅ Valid Sponser address!")

                    setLoading(false);

                } catch (error) {
                    setLoading(false);
                    setMessage(`Registration failed: ${error.message}`);
                }
            }
        } else {
            setLoading(false);
            // alert("Please enter a valid user ID.");
            setMessage("Please enter a valid user ID.")
        }


    }


    // To close the modal from the TransactionModal:
    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-black px-4 py-10">
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#eceefa] via-[#096f72e8] to-[#096f72e8] rounded-3xl shadow-2xl p-8 space-y-8">

                {/* Header */}
                <div className="text-center space-y-3">
                    <img src={universeLogo} alt="Universe Logo" className="w-24 h-24 mx-auto" />
                    <h1 className="text-yellow-400 text-3xl font-extrabold tracking-wide">UNIVERSE</h1>
                    <p className="text-blue-200 text-sm uppercase">— Step into the Infinity —</p>
                </div>



                {
                    showModal && (
                        <div className='absolute'>
                            <TransactionModal
                                isOpen={showModal}
                                hash={hash}
                                userWallet={address}
                                sponsorWallet={sponsorAddress?.userAddress}
                                closeModal={handleCloseModal} // Pass close function
                            />
                        </div>
                    )
                }

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

                    {/* Message to the User */}
                    {message && (
                        <p
                            className={`text-sm md:text-base p-3 text-center rounded-md shadow-md max-w-md mx-auto mt-4
    ${message.startsWith("✅ Valid ") || message.startsWith("Registration successful!")
                                    ? "text-green-400 bg-black/80 border border-green-500"
                                    : "text-red-500 bg-black/80 border border-red-500"}`}
                        >
                            {message}
                        </p>
                    )}

                    {/* Sponsor Info After Verification */}
                    {message && (
                        <div className="mt-4 px-4 py-2 rounded-lg bg-gray-800 text-white max-w-md mx-auto shadow-lg">
                            <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base text-center">
                                <p><span className="font-semibold">ID:</span> {sponsorId}</p>
                                <p><span className="font-semibold">Required Rama:</span> {sponsorAddress?.requireRama}</p>
                                <p><span className="font-semibold">Available Rama:</span> {balance}</p>
                            </div>
                        </div>
                    )}



                    {/* To show the Message to the User */}




                    <button
                        onClick={isVerified ? finalReg : handleRegister}

                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className={`mt-4 px-8 py-2 rounded-full font-bold text-lg transition-transform duration-300 ease-in-out cursor-pointer
              ${isHovered
                                ? "bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg scale-105"
                                : "bg-gradient-to-r from-yellow-500 to-yellow-700"
                            } text-black`}
                    >


                        {loading ? (
                            <Spinner loading={loading} />
                        ) : isVerified ? (
                            "Register"
                        ) : (
                            "Verifying User"
                        )}


                    </button>


                </div>

                {/* Footer */}
                <div className="text-center space-y-2 pt-4 border-t border-white/20">
                    <p className="text-blue-200 text-sm">≫≫≫ Viewing of your account ≪≪≪</p>
                    <p className="text-blue-200 flex items-center justify-center gap-2 text-sm">
                        <span>👤</span> <a
                            href="https://ramascan.com/"
                            target="_blank"
                            className="flex justify-center items-center gap-2"
                        >

                            Check in RamaScan
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Referral;
