import React, { useEffect, useState } from 'react';
import { useStore } from '../Store/UserStore';
import { useAppKitAccount } from '@reown/appkit/react';
import { ToastContainer, toast } from 'react-toastify';
import { FaRegCopy } from "react-icons/fa";


import '../App.css'
import { useTransaction } from '../config/register';

const RightUserPannel1 = () => {

    const [trxData, setTrxData] = useState();

    const { handleSendTx, hash } = useTransaction(trxData !== null && trxData);


    useEffect(() => {
        if (hash) {
            console.log("Transaction hash:", hash);
        }
    }, [hash])


    useEffect(() => {
        if (trxData) {
            handleSendTx(trxData);
        }
    }, [trxData]);




    const { address, isConnected } = useAppKitAccount()
    const registerUser = useStore((state) => state.registerUser);
    const IsUserExist = useStore((state) => state.IsUserExist);
    const getCurrentRamaPrice = useStore((state) => state.getCurrentRamaPrice)

    const [UserData, setUserData] = useState();

    useEffect(() => {
        console.log("Address:", address);
        console.log("Is Connected:", isConnected);
    }, [isConnected])

    const [sponsorAddress, setSponsorAddress] = useState('');

    const [isValidser, setIsValidser] = useState(false);
    const [message, setMessage] = useState('');

    const handleValidation = async () => {

        const udtoRama = await getCurrentRamaPrice();
        console.log("=======!::::", udtoRama);
        if (sponsorAddress.length !== 0) {

            const sponserExist = await IsUserExist(sponsorAddress);

            console.log(`this is sponser-->`, sponserExist.isexist)

            if (sponserExist.isexist) {

                setUserData(sponserExist)

                setMessage(`✅Valid Sponser address! You can Conitnue for registration`);
            } else {
                setMessage("Invalid sponser Address");
                return;
            }


        } else {
            setMessage('Please enter a valid address');
            return;
        }
        // Example validation logic
        // const isValid = sponsorAddress.length > 0; // Check if the address is not empty
        setIsValidser(true);
    }

    const handleRegister = async () => {
        // Example registration logic
        if (isValidser) {
            try {

                if (!isConnected) {
                    alert("Please Connect Wallet First");
                    return;
                }
                if (!sponsorAddress) {
                    alert("Please Provide Sponser Wallet Address");
                    return;
                }

                console.log('Registering with address:', sponsorAddress);
                const trxResponse = await registerUser(sponsorAddress, address);
                console.log("trxResponse", trxResponse)
                setTrxData(trxResponse);


                setMessage('Registration successful!');
                setSponsorAddress('');
                setIsValidser(false);
            } catch (error) {
                setMessage(`Registration failed: ${error.message}`);
            }
        } else {
            console.log('Invalid address. Please enter a valid referral address.');
        }
    }


    const staticReferal = "0x43e76a14e75ae2DE6c8D8799112f11e5E62b767d";



    const handlePast = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setSponsorAddress(text);
            toast.success("Address copied to clipboard!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            toast.error("Failed to paste from clipboard", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(staticReferal)
            .then(() =>
                toast.success("Referral address copied!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }))
            .catch(() => toast.error("Copy failed", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }))
    }






    // className = "w-full px-6 py-8 bg-white rounded-xl shadow-lg max-w-md mx-auto h-fit" 
    return (
        <div className="grid grid-cols-1 mt-10 border-[#3C71A9] border-2  p-6 text-center w-full px-6 py-8 bg-white rounded-xl shadow-lg max-w-md  text-white mx-auto h-fit"
            style={{
                background:
                    "linear-gradient(100deg, rgba(5, 53, 102, 1) 0%, rgba(169, 190, 10, 1) 100%)",
            }}>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Register Now</h2>

            <div className="space-y-4">
                <label htmlFor="walletAddress" className="block text-sm font-medium text-white">
                    Referral Address
                </label>

                <div className='relative'>
                    <input
                        type="text"
                        id="walletAddress"
                        value={sponsorAddress}
                        disabled={isValidser}
                        onChange={(e) => {
                            setSponsorAddress(e.target.value);
                            setMessage('')
                        }}
                        placeholder="Enter referral address"
                        className="w-full h-13 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white pr-16 walletAddress"
                    />

                    {!isValidser ? <button className='absolute right-1 top-1/2 -translate-y-1/2 p-2 border-1 rounded-xl bg-green-400 cursor-pointer' onClick={handlePast} >paste</button> : ""}
                </div>

                {message ? <p className={`text-sm p-2 ${(
                    message.startsWith("✅Valid Sponser address!") ||
                    message.startsWith("Registration successful!")
                ) ? "text-green-400 bg-black" : "text-red-600 bg-black"}`}>
                    {message}
                </p> : ""}

                <div className='w-100 flex gap-2 justify-center'>
                    {message && (
                        <div className='flex gap-2 justify-center'>
                            <h2 >id: {UserData?.userId}</h2> <h2 >Required Rama : {UserData?.userId}</h2> <h2 >Available Rama : {UserData?.userId}</h2>
                        </div>
                    )}
                </div>






                <div className="flex flex-col items-center text-sm font-medium text-white">
                    <div className='flex flex-row  flex-wrap justify-content-center items-center'>
                        <p>Don't have Refferal ? </p><button className='p-2 bg-warning cursor-pointer' onClick={handleCopy}>Copy Referral</button>
                    </div>
                    <div className='flex flex-row flex-wrap gap-4'>
                        <p>{staticReferal.slice(1, 7)} .... {staticReferal.slice(-6)}</p> <FaRegCopy className='cursor-pointer' onClick={handleCopy} />
                    </div>
                </div>



                {isValidser ? <button onClick={handleRegister}
                    className="w-full bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold py-2 rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer"
                >
                    Register Now
                </button> :
                    <button onClick={handleValidation}
                        className="w-full bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold py-2 rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer"
                    >
                        Validate Address
                    </button>}



            </div>
        </div>
    );
};

export default RightUserPannel1;
