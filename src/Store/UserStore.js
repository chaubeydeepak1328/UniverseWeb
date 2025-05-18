import { create } from 'zustand';
import Web3, { errors } from 'web3';
import axios from 'axios';

const Contract = {
    "UserMang": "0x1F34dfCbaD8e3a502e28c8c98f4E48AD047dfb25",
    "U3plus": "0xc07A43Ad7b68F56955D10C2AFf1dF88Fe5895A50",
    "U5": "0x5Ec894603bbdC8Ed032B5fd6dE78132c44f8Ae92",
    "PriceConv": "0x611F0dBf5169dfbaBbeE5830FA3Ea00DE8AeD7E5",
    "UIncome": "0x1864249F46Fb8E59Dc51FE6cb197bcb66aCbf71C",
    "U4": "0x83Cf1A072812d5417C5593B638dEdF8Bc5426Daa",
    "U3prem": "0x56Fba3cFF3Cdd16607a80E6cb779784dFf0bE11a",
    "contReg": "0xc6E55AC39b6135Af3bE66F5413C1DAe789EBF481",
}

const fetchContractAbi = async (contractName) => {
    try {
        const response = await fetch(`https://latest-backendapi.ramascan.com/api/v2/smart-contracts/${Contract[contractName]}`);
        const data = await response.json();
        console.log("Contract ABI:", data.abi); // Log the ABI to the console
        console.log("Contract Address:", Contract[contractName]); // Log the contract address to the console
        return {
            abi: data.abi,
            contractAddress: Contract[contractName]
        };
    } catch (error) {
        console.error("Error fetching contract ABI:", error);
        throw error;
    }
}



export const trxHashInfo = async () => {

    const hashVal = "0x2456943f6eccd2c4e1e903c825cf02ceaaf6dcfdb8e7b76e9529b77b7332e8c8"
    const response = await fetch(`https://latest-backendapi.ramascan.com/api/v2/transactions/${hashVal}`);
    const data = await response.json();
    console.log(data)

    return data.status;
}



const INFURA_URL = "https://blockchain2.ramestta.com"
const web3 = new Web3(INFURA_URL);






export const useStore = create((set, get) => ({


    // User Wallet Info

    // UserwalletAddress: '',
    // setUserWalletAddress: (address) => set({ UserwalletAddress: address }),




    // Smart Contract Data

    getBalance: async (walletAdd) => {
        try {
            if (!walletAdd) {
                throw new Error("Wallet address is required.");
            }

            const balanceWei = await web3.eth.getBalance(walletAdd);
            const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

            return parseFloat(balanceEth).toFixed(4); // Optional: return balance with 4 decimal places
        } catch (error) {
            console.error("Failed to fetch balance:", error.message);
            return null; // Or throw error depending on use case
        }
    },


    getCurrentRamaPrice: async () => {
        try {


            const [priceConv, u3plus, u5] = await Promise.all([
                fetchContractAbi("PriceConv"),
                fetchContractAbi("U3plus"),
                fetchContractAbi("U5")
            ]);

            const contract1 = new web3.eth.Contract(priceConv.abi, priceConv.contractAddress);
            const contract2 = new web3.eth.Contract(u3plus.abi, u3plus.contractAddress);
            const contract3 = new web3.eth.Contract(u5.abi, u5.contractAddress);


            // U3 Transaction 


            // u5 Transaction

            const userAddress = await contract1.methods.usdToRama(20).call();

            console.log("Users:", userAddress);
            return userAddress.toString();
        } catch (error) {

        }
    },

    // generatedId: async (address) => {
    //     try {
    //         const [U5, U4, U3prem] = await Promise.all([
    //             fetchContractAbi("U5"),
    //             fetchContractAbi("U4"),
    //             fetchContractAbi("U3prem"),
    //         ]);


    //         const contract1 = new web3.eth.Contract(U5.abi, U5.contractAddress);
    //         const contract2 = new web3.eth.Contract(U4.abi, U4.contractAddress);
    //         const contract3 = new web3.eth.Contract(U3prem.abi, U3prem.contractAddress);


    //         const u5generated = await contract1.methods.getGeneratedMatrices(address).call();

    //         const u5DataRama = await contract1.methods.getTotalIncomeAcrossMatrices(address).call();


    //         if (u5generated) {
    //             const u4generated = await contract2.methods.getGeneratedMatrices(address).call();
    //             const u4DataRama = await contract2.methods.getTotalIncomeAcrossMatrices(address).call();

    //             const u3premgenerated = await contract3.methods.getGeneratedMatrices(address).call();
    //             const u3PremDataRama = await contract3.methods.getTotalIncomeAcrossMatrices(address).call();



    //             // const rama = web3.utils.fromWei(u5DataRama.totalReceivedAmountInRAMA, 'ether');
    //             const convertValuesToEther = (weiObject) =>
    //                 Object.fromEntries(
    //                     Object.entries(weiObject).map(([key, value]) => [key, web3.utils.fromWei(value, 'ether')])
    //                 );


    //             const u5RamaConverted = convertValuesToEther(u5DataRama);
    //             const u4RamaConverted = convertValuesToEther(u4DataRama);
    //             const u3PremRamaConverted = convertValuesToEther(u3PremDataRama);

    //             console.log(u5RamaConverted, u4RamaConverted, u3PremRamaConverted)



    //             return {
    //                 "U5": {
    //                     "generatedId": u5generated,
    //                     "RamaPrice": u5RamaConverted
    //                 },
    //                 "U4": {
    //                     "generatedId": u4generated,
    //                     "RamaPrice": u4RamaConverted
    //                 },
    //                 "U3 Premium": {
    //                     "generatedId": u3premgenerated,
    //                     "RamaPrice": u3PremRamaConverted
    //                 }
    //             };
    //         }
    //     } catch (error) {
    //         console.error("Error in generatedId:", error);
    //         throw error;
    //     }
    // },
    generatedId: async (address) => {
        try {
            const [U5, U4, U3prem] = await Promise.allSettled([
                fetchContractAbi("U5"),
                fetchContractAbi("U4"),
                fetchContractAbi("U3prem"),
            ]);

            const results = {};

            const convertValuesToEther = (weiObject) =>
                Object.fromEntries(
                    Object.entries(weiObject).map(([key, value]) => [
                        key,
                        web3.utils.fromWei(value, 'ether'),
                    ])
                );

            if (U5.status === "fulfilled") {
                try {
                    const contract1 = new web3.eth.Contract(U5.value.abi, U5.value.contractAddress);
                    const u5generated = await contract1.methods.getGeneratedMatrices(address).call();
                    const u5DataRama = await contract1.methods.getTotalIncomeAcrossMatrices(address).call();

                    results["U5"] = {
                        generatedId: u5generated,
                        RamaPrice: convertValuesToEther(u5DataRama),
                    };
                } catch (err) {
                    console.error("Error fetching U5 data:", err.message);
                }
            }

            if (U4.status === "fulfilled") {
                try {
                    const contract2 = new web3.eth.Contract(U4.value.abi, U4.value.contractAddress);
                    const u4generated = await contract2.methods.getGeneratedMatrices(address).call();
                    const u4DataRama = await contract2.methods.getTotalIncomeAcrossMatrices(address).call();

                    results["U4"] = {
                        generatedId: u4generated,
                        RamaPrice: convertValuesToEther(u4DataRama),
                    };
                } catch (err) {
                    console.error("Error fetching U4 data:", err.message);
                }
            }

            if (U3prem.status === "fulfilled") {
                try {
                    const contract3 = new web3.eth.Contract(U3prem.value.abi, U3prem.value.contractAddress);
                    const u3premgenerated = await contract3.methods.getGeneratedMatrices(address).call();
                    const u3PremDataRama = await contract3.methods.getTotalIncomeAcrossMatrices(address).call();

                    results["U3 Premium"] = {
                        generatedId: u3premgenerated,
                        RamaPrice: convertValuesToEther(u3PremDataRama),
                    };
                } catch (err) {
                    console.error("Error fetching U3 Premium data:", err.message);
                }
            }

            return results;

        } catch (error) {
            console.error("Unhandled error in generatedId:", error.message);
            return {}; // or throw error if you prefer
        }
    },


    homePannelInfo: async (address) => {
        try {

            const [U3Plus, UserMang] = await Promise.all([
                fetchContractAbi("U3plus"),
                fetchContractAbi("UserMang"),
            ]);

            const contract = new web3.eth.Contract(U3Plus.abi, U3Plus.contractAddress);

            const contract1 = new web3.eth.Contract(UserMang.abi, UserMang.contractAddress);


            const endSlot = await contract.methods.getLastUpgradedSlot(address).call();
            const slotLevel = Number(endSlot);
            console.log("slotlevel================", slotLevel)


            if (slotLevel) {
                const user = await contract1.methods.getUser(address).call();

                return {
                    InvitedPartner: user.directReferrals.length,
                    slotActivated: slotLevel
                }
            }
        } catch (error) {
            console.error("Error:", error);
            alert(`Some Error Occured ${error.message}`);
            throw error;
        }

    },


    getAllusers: async (userId) => {
        try {


            const [UserMang, PriceConvs] = await Promise.all([
                fetchContractAbi("UserMang"),
                fetchContractAbi("PriceConv"),
            ]);


            const contract = new web3.eth.Contract(UserMang.abi, UserMang.contractAddress);

            const contract1 = new web3.eth.Contract(PriceConvs.abi, PriceConvs.contractAddress);

            const userAddress = await contract.methods.allUsers(userId).call();


            // Get USD → RAMA value
            const valueInUSD = BigInt(20 * 1e6); // 20 USD in micro USD as BigInt
            const ramaAmount = await contract1.methods.usdToRama(valueInUSD).call();

            const requireRama = Number(ramaAmount) / 1e18;
            const formattedRama = requireRama.toFixed(4);

            if (userAddress && ramaAmount) {

                const userInfo = await contract.methods.getUser(userAddress).call();
                console.log(userInfo);

                if (userInfo) {
                    const sponserId = await contract.methods.getUserIDByAddress(userInfo.sponsor).call();

                    console.log("sponser Id", sponserId)
                    const data = {
                        userAddress: userAddress.toString(),
                        userId: userInfo.id.toString(),
                        sponserAdd: userInfo.sponsor.toString(),
                        sponserId: sponserId.toString(),
                        regTime: userInfo.registrationTime,
                        requireRama: formattedRama,
                        directReferral: userInfo.directReferrals,
                    }
                    return data;
                }

            }

        } catch (error) {
            console.error("Error:", error);
            alert(`user Id Exist ${error.message}`);
            throw error;
        }
    },

    IsUserExist: async (walletAdd) => {
        try {
            // const walletAdd = "0x25fB86046a1ccfa490a21Dbb9BA08E2803a45B8b";
            if (!walletAdd) {
                throw new Error("Invalid wallet address");
            }
            // const { abi, contractAddress } = await fetchContractAbi("UserMang");

            const [UserMang, PriceConvs] = await Promise.all([
                fetchContractAbi("UserMang"),
                fetchContractAbi("PriceConv"),
            ]);

            const contract = new web3.eth.Contract(UserMang.abi, UserMang.contractAddress);

            const contract1 = new web3.eth.Contract(PriceConvs.abi, PriceConvs.contractAddress);

            const isExist = await contract.methods.isRegistered(walletAdd).call();

            console.log("is Users exist:", isExist, walletAdd);
            if (isExist) {

                const user = await contract.methods.getUser(walletAdd).call();
                console.log(user)
                if (user) {

                    const sponserId = await contract.methods.getUserIDByAddress(user.sponsor).call();




                    // Get USD → RAMA value
                    const valueInUSD = BigInt(20 * 1e6); // 20 USD in micro USD as BigInt
                    const ramaAmount = await contract1.methods.usdToRama(valueInUSD).call();

                    const requireRama = Number(ramaAmount) / 1e18;
                    const formattedRama = requireRama.toFixed(4);

                    return {
                        isexist: true,
                        walletAdd: walletAdd,
                        userId: user.id.toString(),
                        sponserId: sponserId.toString(),
                        requireRama: formattedRama,
                        sponserAdd: user.sponsor,
                        regTime: user.registrationTime,
                        directReferral: user.directReferrals,
                    }
                }
            }
            return {
                isexist: false,
                walletAdd: walletAdd
            }
        } catch (error) {
            console.error("Error:", error);
            alert(`Error checking user: ${error.message}`);
            throw error;
        }
    },

    registerUser: async (sponsorAddress, userAddress) => {
        try {



            console.log("sponsorAddress, userAddress", sponsorAddress, userAddress)
            const [UIncome, PriceConvs] = await Promise.all([
                fetchContractAbi("UIncome"),
                fetchContractAbi("PriceConv"),
            ]);

            const contract = new web3.eth.Contract(UIncome.abi, UIncome.contractAddress);
            const priceContract = new web3.eth.Contract(PriceConvs.abi, PriceConvs.contractAddress);

            console.log("====================", sponsorAddress, UIncome.contractAddress);

            // Check wallet balance (for debug/logging)
            const balanceWei = await web3.eth.getBalance(userAddress);
            const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
            console.log("Wallet Balance in ETH:", balanceEth);

            // Get USD → RAMA value
            const valueInUSD = 20 * 1e6; // 20 USD in micro USD
            const ramaAmount = await priceContract.methods.usdToRama(valueInUSD).call();

            console.log("value in RAMA is", parseFloat(ramaAmount) / parseFloat(1e18));

            // const maybeWei = "20000000000000000";
            const inEth = web3.utils.fromWei(ramaAmount, 'ether');
            console.log("Converted to ETH:", inEth);


            // Prepare transaction
            const trxData = contract.methods.register(sponsorAddress).encodeABI();
            const gasPrice = await web3.eth.getGasPrice();

            let gasLimit;
            try {
                gasLimit = await web3.eth.estimateGas({
                    from: userAddress,
                    to: UIncome.contractAddress,
                    value: BigInt(ramaAmount),
                    data: trxData,
                });
            } catch (error) {
                console.error("❌ Gas estimation failed:", error);
                alert("Gas estimation failed. Please check contract and inputs.");
                return;
            }

            console.log("Estimated Gas:", gasLimit);
            const gasCost = web3.utils.fromWei((BigInt(gasLimit) * BigInt(gasPrice)).toString(), "ether");
            console.log("Estimated Gas Cost in ETH:", gasCost);


            const tx = {
                from: userAddress,
                to: UIncome.contractAddress,
                data: trxData,
                gas: gasLimit,
                gasPrice: gasPrice,
                value: ramaAmount,
            };

            // Send transaction
            // web3.eth
            //     .sendTransaction(tx)
            //     .on("transactionHash", (hash) => {
            //         console.log("✅ Transaction Hash:", hash);
            //     })
            //     .on("receipt", (receipt) => {
            //         console.log("🎉 Transaction Receipt:", receipt);
            //         alert(`Transaction successful! Hash: ${receipt.transactionHash}`);
            //     })
            //     .on("error", (err) => {
            //         console.error("❌ Transaction failed:", err);
            //         alert(`Transaction failed: ${err.message}`);
            //     });

            return tx;

        } catch (error) {
            console.error("❌ Error in registerUser:", error);
            alert(`Transaction failed: ${error.message}`);
            throw error;
        }
    },

    getU3Plus: async (walletAdd) => {
        try {
            if (!walletAdd) {
                throw new Error("Invalid wallet address");
            }

            const { abi, contractAddress } = await fetchContractAbi("U3plus");
            const contract = new web3.eth.Contract(abi, contractAddress);

            // Activated slot
            const endSlot = await contract.methods.getLastUpgradedSlot(walletAdd).call();


            const lastSloat = endSlot.toString()
            console.log("lastSloat", lastSloat)


            const slotInfoArray = [];

            if (lastSloat) {

                for (let i = 1; i <= Number(lastSloat); i++) {
                    const activeCycle = await contract.methods.getSlotInfo(walletAdd, i).call();


                    const cycles = activeCycle.currentCycle.toString();
                    // console.log("curCycle", cycles);


                    if (!cycles || !activeCycle.currentCycle) {
                        console.warn(`Invalid cycle data at level ${i}`, slot);
                        slotInfoArray.push({ users: 0, cycles: 0 });
                        continue;
                    }

                    // wallet address ,same matrix,slotLeve/current slot  current cycle for each slot
                    const positionInfo = await contract.methods.getAllPositionMembers(walletAdd, i, cycles).call();

                    // console.log("positionInfo", positionInfo)
                    const zeroAddress = "0x0000000000000000000000000000000000000000";
                    const usersArray = [0, 1, 2, 3].map(index => positionInfo[index] !== zeroAddress ? 1 : 0);
                    const users = usersArray.reduce((sum, val) => sum + val, 0);


                    slotInfoArray.push({ users, cycles: cycles });
                }


                console.log(lastSloat, slotInfoArray)



                return {
                    lastSlot: lastSloat,
                    slotinfo: slotInfoArray,
                };
            }

        } catch (error) {
            console.error("Error:", error);
            alert(`Error checking user: ${error.message}`);
        }
    },

    getU3PlusInfo: async (address) => {
        try {

            // const dummyData = [
            //     { slotNo: 1, cycles: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]] },
            //     { slotNo: 2, cycles: [[1, 1, 1, 1]] },
            //     { slotNo: 3, cycles: [[1, 1, 1, 0]] },
            //     { slotNo: 4, cycles: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 0, 0]] },
            //     { slotNo: 5, cycles: [[1, 0, 0, 0]] },
            //     { slotNo: 6, cycles: [[1, 1, 0, 0]] },
            //     { slotNo: 7, cycles: [[1, 1, 1, 0]] },
            //     { slotNo: 8, cycles: [[0, 0, 0, 0]] },
            //     { slotNo: 9, cycles: [[0, 0, 0, 0]] },
            //     { slotNo: 10, cycles: [[0, 0, 0, 0]] },
            // ];


            // const { abi, contractAddress } = await fetchContractAbi("UserMang");
            // const contract = new web3.eth.Contract(abi, contractAddress);

            // // Activated slot
            // const lastSloat = await contract.methods.getUsersSlotLevel(walletAdd).call();

            // const slotInfoArray = [];

            // if (lastSloat) {

            //     for (let i = 1; i <= Number(lastSloat); i++) {
            //         const slot = await contract.methods.getUserSlot(walletAdd, 0, i).call();

            //         if (!slot || !slot.positions) {
            //             console.warn(`Invalid slot data at level ${i}`, slot);
            //             slotInfoArray.push({ users: 0, cycles: 0 });
            //             continue;
            //         }

            //         // wallet address ,same matrix,slotLeve/current slot  current cycle for each slot
            //         const currentCycle = await contract.methods.getCurrentCycle(walletAdd, 0, i).call();

            //         const zeroAddress = "0x0000000000000000000000000000000000000000";
            //         const totalPositions = slot.positions.filter(addr => addr !== zeroAddress).length;
            //         const cycles = (parseInt(currentCycle) - 1)
            //         const users = totalPositions % 4;

            //         slotInfoArray.push({ users, cycles });
            //     }


            //     return {
            //         lastSlot: lastSloat,
            //         slotinfo: slotInfoArray,
            //     };
            // }



            // const tx = await web3.eth.getTransaction()


        } catch (error) {
            console.error("Error:", error);
            alert(`Error checking user: ${error.message}`);
        }
    },

    // getU5info: async (address) => {
    //     try {
    //         const { abi, contractAddress } = await fetchContractAbi("U5");
    //         const contract = new web3.eth.Contract(abi, contractAddress);

    //         const genMatrices = await contract.methods.getGeneratedMatrices(address).call();

    //         const slotIndex = 5; // slots 0 to 4
    //         const values = ["$10", "$30", "$90", "$270", "$810"];

    //         const result = [];

    //         for (let i = 0; i < genMatrices.length; i++) {
    //             const matrixId = parseInt(genMatrices[i]);
    //             const slotsPosition = [];

    //             for (let j = 0; j < slotIndex; j++) {
    //                 const slotPositions = await contract.methods.getU5MatrixPositions(matrixId, j).call();
    //                 const filledSlots = slotPositions.isFilledPositions.map(pos => (pos === true ? "1" : pos === false ? "0" : ""));
    //                 slotsPosition.push(filledSlots);
    //             }

    //             result.push({
    //                 id: matrixId,
    //                 values: values,
    //                 slotsPosition: slotsPosition
    //             });
    //         }

    //         console.log("Slot Data Matrix (U5):", result);
    //         return result;

    //     } catch (error) {
    //         console.error("Error:", error);
    //         alert(`Error checking: ${error.message}`);
    //     }
    // },

    getU5info: async (address) => {
        try {
            const { abi, contractAddress } = await fetchContractAbi("U5");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const genMatrices = await contract.methods.getGeneratedMatrices(address).call();

            const slotIndex = 5;
            const values = ["$10", "$30", "$90", "$270", "$810"];

            const result = await Promise.all(
                genMatrices.map(async (matrixIdStr) => {
                    const matrixId = parseInt(matrixIdStr);

                    // Prepare parallel calls for all 5 slots for current matrixId
                    const slotPromises = Array.from({ length: slotIndex }, (_, j) =>
                        contract.methods.getU5MatrixPositions(matrixId, j).call()
                    );

                    const slotResults = await Promise.all(slotPromises);

                    const slotsPosition = slotResults.map(slotPositions =>
                        slotPositions.isFilledPositions.map(pos => (pos === true ? "1" : pos === false ? "0" : ""))
                    );

                    return {
                        id: matrixId,
                        values: values,
                        slotsPosition: slotsPosition
                    };
                })
            );

            console.log("Slot Data Matrix (U5):", result);
            return result;

        } catch (error) {
            console.error("Error:", error);
            alert(`Error checking: ${error.message}`);
        }
    },

    getU5Boxinfo: async (address, matrixID) => {

        const { abi, contractAddress } = await fetchContractAbi("U5");
        const contract = new web3.eth.Contract(abi, contractAddress);

        const info = await contract.methods.userMatrices(address, matrixID).call();


        if (info) {

            const slotCount = 5;
            const posCount = 6;

            let totalChunks = 0;


            for (let i = 0; i <= slotCount; i++) {

                for (let j = i; j <= posCount; i++) {


                    const chunkcount = await contract.methods.getchunksCount(matrixID, i, j).call();

                    totalChunks += chunkcount;

                }
            }

            return totalChunks;


        }

    },


    // getTrxU5: async () => {

    //     // matrixId, slotIndex, positionIndex, chunkIndex

    //     // const { abi, address } = await fetchContractAbi("U5");

    //     // const contract = new web3.eth.Contract(abi, contractAddress);



    //     // const trxData = await contract.methods.getChunkDetails(matrixId, slotIndex, positionIndex, chunkIndex).call();


    //     // const slotStatus = await contract.methods.getChunkDetails(matrixId, slotIndex).call();

    //     // return {
    //     //     usd: trxData.receivedAmountInUSDT,
    //     //     rama: trxData.receivedAmounIntRAMA,
    //     //     TrxHash: "jcdhskfgygf43kur934y4ju4o3",
    //     //     dateTime: trxData.receiveDate,
    //     //     status: slotStatus,
    //     //     ReGenerate: "jkh",
    //     //     NetProfit: "shdkh"

    //     // }

    //     const response = await fetch(`https://latest-backendapi.ramascan.com/api/v2/addresses/${Contract[U5]}/logs`);

    //     const data = await response.json();

    //     const res = data.filter(val =>
    //         val.decoded &&
    //         val.decoded.method_call &&
    //         val.decoded.method_call.startsWith("SlotPaymentReceived")
    //     );

    //     console.log(res);
    //     return res;






    // },


    getFilteredLogs: async () => {
        try {
            const response = await fetch(`https://latest-backendapi.ramascan.com/api/v2/addresses/${Contract["U5"]}/logs`);
            const data = await response.json();

            const res = data.items
                .filter(val =>
                    val.decoded &&
                    val.decoded.method_call &&
                    val.decoded.method_call.startsWith("SlotPaymentReceived")
                )
                .map(val => {
                    const paramObj = {};
                    val.decoded.parameters.forEach(param => {
                        paramObj[param.name] = param.value;
                    });
                    return paramObj;
                });

            console.log("getFilteredLogs", res);
            return res;
        } catch (error) {
            console.error("Error fetching or processing data:", error);
            return [];
        }
    },



    getU3Details: async (walletAdd) => {
        try {
            if (!walletAdd) {
                throw new Error("Invalid wallet address");
            }

            const { abi, contractAddress } = await fetchContractAbi("U3plus");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const endSlot = await contract.methods.getLastUpgradedSlot(walletAdd).call();
            const lastSlot = Number(endSlot);

            const zeroAddress = "0x0000000000000000000000000000000000000000";
            const slotInfoArray = [];

            for (let slotNo = 1; slotNo <= lastSlot; slotNo++) {
                const activeSlot = await contract.methods.getSlotInfo(walletAdd, slotNo).call();
                const currentCycle = Number(activeSlot.currentCycle);

                const allCycles = [];

                for (let cycle = 1; cycle <= currentCycle; cycle++) {
                    const positionInfo = await contract.methods.getAllPositionMembers(walletAdd, slotNo, cycle).call();

                    const cycleArray = [0, 1, 2, 3].map(index =>
                        positionInfo[index] && positionInfo[index] !== zeroAddress ? 1 : 0
                    );

                    allCycles.push(cycleArray);
                }

                slotInfoArray.push({
                    slotNo,
                    cycles: allCycles.length > 0 ? allCycles : [[0, 0, 0, 0]],
                });
            }

            // Ensure 10 slots minimum
            for (let i = lastSlot + 1; i <= 10; i++) {
                slotInfoArray.push({
                    slotNo: i,
                    cycles: [[0, 0, 0, 0]],
                });
            }

            return slotInfoArray;
        } catch (error) {
            console.error("Error:", error);
            alert(`Error checking user: ${error.message}`);
        }
    },



    getSplitBonus: async () => {
        const response = await axios.get(`https://latest-backendapi.ramascan.com/api/v2/addresses/${Contract["U3plus"]}/logs`);

        // filtering the data Payment Spilted

        const data1 = response.data

        const splitPayment = data1.items.filter((val) => val.decoded.method_call.startsWith("PaymentSplited"));

        // const paymentArr = splitPayment.forEach(())
        console.log(splitPayment)
        return splitPayment
    },

    getU5table: async (matrixId, slotIndex, selectedPos) => {

        console.log("matrixId, slotIndex, selectedPos", matrixId, slotIndex, selectedPos)
        try {
            if (matrixId == null || slotIndex == null || selectedPos == null) {
                let missingParam = !matrixId
                    ? "matrix id"
                    : !slotIndex
                        ? "slot index"
                        : "position index";
                throw new Error(`Please provide ${missingParam}`);
            }

            const { abi, contractAddress } = await fetchContractAbi("U5");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const tableData = await contract.methods
                .getAllChunksForPosition(matrixId, slotIndex, selectedPos).call();

            const trx = (tableData?.initiatedFrom || []).map((_, i) => ({
                initiatedFrom: tableData.initiatedFrom[i].toString(),
                forwardedFrom: tableData.forwardedFrom[i].toString(),
                forwardedTo: tableData.forwardedTo[i].toString(),
                receivedAmountInRAMA: web3.utils.fromWei(tableData.receivedAmountInRAMA[i].toString(), 'ether'),
                totalAmountAccountedForRegenerationInRAMA: tableData.totalAmountAccountedForRegenerationInRAMA[i].toString(),
                totalAmountForwardedForSlotUpgradeInRAMA: web3.utils.fromWei(tableData.totalAmountForwardedForSlotUpgradeInRAMA[i].toString(), 'ether'),
                totalProfitInRAMA: web3.utils.fromWei(tableData.totalProfitInRAMA[i].toString(), 'ether'),
                receivedDate: tableData.receivedDate[i].toString(),
            }));

            console.log("Fetched Transactions:", trx);
            return trx;
        } catch (error) {
            console.error("Error in getU5table:", error.message || error);
            return [];
        }
    },



    // getU5table: async (matrixId, slotIndex, selectedPos) => {
    //     console.log("matrixId, slotIndex, selectedPos", matrixId, slotIndex, selectedPos);

    //     try {


    //         const eventTopic = web3.utils.keccak256("chunkReceived(uint256,uint256,uint256,uint256,uint256,uint256)");
    //         // 2. Fetch logs for the U5 contract
    //         // const latestBlock = await web3.eth.getBlockNumber(latestBlock);
    //         const latestBlock = await web3.eth.getBlockNumber();


    //         console.log("-----------Latest block", latestBlock)
    //         const logs = await web3.eth.getPastLogs({
    //             fromBlock: "earliest",
    //             toBlock: latestBlock,
    //             address: Contract["U5"], // Ensure this is the correct U5 address
    //             topics: [
    //                 // eventTopic,
    //                 "0x6441096f6dc9ec5c293f0c0f151e796cb14acaf79f8e4a23606923f142a569b9",
    //                 // web3.utils.padLeft(web3.utils.toHex(matrixId), 64),
    //                 // web3.utils.padLeft(web3.utils.toHex(slotIndex), 64),
    //                 // web3.utils.padLeft(web3.utils.toHex(selectedPos), 64),
    //             ]
    //         });

    //         console.log("Logs----------->", logs)

    //         // 3. Decode the logs
    //         const result = [];
    //         for (const log of logs) {
    //             // Decode the data (6 uint256 parameters)
    //             const decoded = web3.eth.abi.decodeLog(
    //                 [
    //                     { type: 'uint256', name: 'matrixID', indexed: true },
    //                     { type: 'uint256', name: 'matrixOwnerSlot', indexed: true },
    //                     { type: 'uint256', name: 'matrixOwnerSlotPosition', indexed: true },
    //                     { type: 'uint256', name: 'amountInUSD' },
    //                     { type: 'uint256', name: 'amountInRAMA' },
    //                     { type: 'uint256', name: 'indexSitAt' },
    //                 ],
    //                 log.data,
    //                 log.topics.slice(1)
    //                 // log.topics.slice(1) // No indexed parameters except the event topic
    //             );

    //             // 4. Fetch block timestamp
    //             const block = await web3.eth.getBlock(log.blockNumber);


    //             result.push({
    //                 // transactionHash: log.transactionHash,
    //                 timestamp: block.timestamp,
    //                 matrixID: decoded.matrixID,
    //                 matrixOwnerSlot: decoded.matrixOwnerSlot,
    //                 matrixOwnerSlotPosition: decoded.matrixOwnerSlotPosition,
    //                 amountInUSD: decoded.amountInUSD,
    //                 amountInRAMA: decoded.amountInRAMA,
    //                 indexSRAI: decoded.indexSitAt
    //             });



    //         }

    //         console.log("📦 Final JSON result:", result);
    //         return result;
    //     } catch (error) {
    //         console.error("❌ Error:", error);
    //         throw error;
    //     }
    // },






    // getU4info: async (address) => {
    //     try {
    //         const { abi, contractAddress } = await fetchContractAbi("U4");
    //         const contract = new web3.eth.Contract(abi, contractAddress);

    //         const genMatrices = await contract.methods.getGeneratedMatrices(address).call();

    //         console.log("matrix U4 data--->", genMatrices)


    //         const slotIndex = 10;
    //         const values = [
    //             "$40",
    //             "$80",
    //             "$160",
    //             "$320",
    //             "$640",
    //             "$1280",
    //             "$2560",
    //             "$5120",
    //             "$10240",
    //             "$20480",
    //         ];

    //         if (!genMatrices || genMatrices.length === 0) {
    //             console.log("No matrix found for this address");
    //             return [];
    //         }


    //         const result = await Promise.all(
    //             genMatrices.map(async (matrixIdStr) => {
    //                 try {
    //                     const matrixId = parseInt(matrixIdStr);

    //                     // Prepare parallel calls for all 10 slots for current matrixId
    //                     const slotPromises = Array.from({ length: slotIndex }, (_, j) =>
    //                         contract.methods.getU5MatrixPositions(matrixId, j + 1).call()
    //                     );

    //                     const slotResults = await Promise.all(slotPromises);

    //                     const slotsPosition = slotResults.map(slotPositions =>
    //                         slotPositions.isFilledPositions.map(pos => (pos === true ? "1" : pos === false ? "0" : ""))
    //                     );

    //                     return {
    //                         id: matrixId,
    //                         values: values,
    //                         slotsPosition: slotsPosition
    //                     };
    //                 } catch (error) {
    //                     console.error(`Matrix ID ${matrixIdStr} failed:`, error);
    //                     return null; // Skip this matrixId
    //                 }
    //             })
    //         );

    //         console.log("Slot Data Matrix (U4):", result);
    //         return result;

    //     } catch (error) {
    //         console.error("Error:", error);
    //         alert(`Error checking: ${error.message}`);
    //     }
    // },



    getU4info: async (address) => {
        try {
            const { abi, contractAddress } = await fetchContractAbi("U4");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const genMatrices = await contract.methods.getGeneratedMatrices(address).call();

            if (!Array.isArray(genMatrices) || genMatrices.length === 0) {
                console.log("No matrix found for this address");
                return [];
            }

            const values = [
                "$40", "$80", "$160", "$320", "$640",
                "$1280", "$2560", "$5120", "$10240", "$20480"
            ];

            // Process all matrix IDs concurrently with Promise.all
            const matrices = await Promise.all(
                genMatrices.map(async (matrixIdStr) => {
                    const matrixId = parseInt(matrixIdStr);
                    if (isNaN(matrixId)) return null;

                    try {
                        const slotCalls = [...Array(values.length)].map((_, index) =>
                            contract.methods.getU5MatrixPositions(matrixId, index + 1).call()
                        );

                        const slotResults = await Promise.all(slotCalls);

                        const slotsPosition = slotResults.map(result => {
                            const filled = result?.isFilledPositions || [];
                            return filled.map(pos => (pos ? "1" : "0"));
                        });

                        return {
                            id: matrixId,
                            values,
                            slotsPosition,
                        };
                    } catch (err) {
                        console.warn(`Error processing matrix ID ${matrixId}:`, err.message);
                        return null;
                    }
                })
            );

            const filtered = matrices.filter(Boolean);
            console.log("Optimized U4 matrix data:", filtered);
            return filtered;
        } catch (err) {
            console.error("getU4info error:", err.message);
            alert(`Error checking: ${err.message}`);
            return [];
        }
    },



    getU3premInfo: async (address) => {
        try {
            const { abi, contractAddress } = await fetchContractAbi("U3prem");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const genMatrices = await contract.methods.getGeneratedMatrices(address).call();

            console.log("matrix U4 data--->", genMatrices)


            const slotIndex = 5;
            const values = ["$640", "$1280", "$2560", "$5120", "$10240"];

            const result = await Promise.all(
                genMatrices.map(async (matrixIdStr) => {
                    const matrixId = parseInt(matrixIdStr);

                    // Prepare parallel calls for all 10 slots for current matrixId
                    const slotPromises = Array.from({ length: slotIndex }, (_, j) =>
                        contract.methods.getU5MatrixPositions(matrixId, j + 1).call()
                    );

                    const slotResults = await Promise.all(slotPromises);

                    const slotsPosition = slotResults.map(slotPositions =>
                        slotPositions.isFilledPositions.slice(0, -1).map(pos => (pos === true ? "1" : pos === false ? "0" : ""))
                    );

                    return {
                        id: matrixId,
                        values: values,
                        slotsPosition: slotsPosition
                    };
                })
            );

            console.log("Slot Data Matrix ******************(U3Prem)***************:", result);
            return result;

        } catch (error) {
            console.error("Error:", error);
            alert(`Error checking: ${error.message}`);
        }
    },


    getU4table: async (matrixId, slotIndex, selectedPos) => {

        console.log("matrixId, slotIndex, selectedPos", matrixId, slotIndex, selectedPos)
        try {
            if (matrixId == null || slotIndex == null || selectedPos == null) {
                let missingParam = !matrixId
                    ? "matrix id"
                    : !slotIndex
                        ? "slot index"
                        : "position index";
                throw new Error(`Please provide ${missingParam}`);
            }

            const { abi, contractAddress } = await fetchContractAbi("U4");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const tableData = await contract.methods
                .getAllChunksForPosition(matrixId, slotIndex, selectedPos).call();

            const trx = (tableData?.initiatedFrom || []).map((_, i) => ({
                initiatedFrom: tableData.initiatedFrom[i].toString(),
                forwardedFrom: tableData.forwardedFrom[i].toString(),
                forwardedTo: tableData.forwardedTo[i].toString(),
                receivedAmountInRAMA: web3.utils.fromWei(tableData.receivedAmountInRAMA[i].toString(), 'ether'),
                totalAmountAccountedForRegenerationInRAMA: tableData.totalAmountAccountedForRegenerationInRAMA[i].toString(),
                totalAmountForwardedForSlotUpgradeInRAMA: web3.utils.fromWei(tableData.totalAmountForwardedForSlotUpgradeInRAMA[i].toString(), 'ether'),
                totalProfitInRAMA: web3.utils.fromWei(tableData.totalProfitInRAMA[i].toString(), 'ether'),
                receivedDate: tableData.receivedDate[i].toString(),
            }));

            console.log("Fetched Transactions:", trx);
            return trx;
        } catch (error) {
            console.error("Error in getU5table:", error.message || error);
            return [];
        }
    },



    getU3Premtable: async (matrixId, slotIndex, selectedPos) => {

        console.log("matrixId, slotIndex, selectedPos", matrixId, slotIndex, selectedPos)
        try {
            if (matrixId == null || slotIndex == null || selectedPos == null) {
                let missingParam = !matrixId
                    ? "matrix id"
                    : !slotIndex
                        ? "slot index"
                        : "position index";
                throw new Error(`Please provide ${missingParam}`);
            }

            const { abi, contractAddress } = await fetchContractAbi("U3prem");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const tableData = await contract.methods
                .getAllChunksForPosition(matrixId, slotIndex, selectedPos).call();

            const trx = (tableData?.initiatedFrom || []).map((_, i) => ({
                initiatedFrom: tableData.initiatedFrom[i].toString(),
                forwardedFrom: tableData.forwardedFrom[i].toString(),
                forwardedTo: tableData.forwardedTo[i].toString(),
                receivedAmountInRAMA: web3.utils.fromWei(tableData.receivedAmountInRAMA[i].toString(), 'ether'),
                totalAmountAccountedForRegenerationInRAMA: tableData.totalAmountAccountedForRegenerationInRAMA[i].toString(),
                totalAmountForwardedForSlotUpgradeInRAMA: web3.utils.fromWei(tableData.totalAmountForwardedForSlotUpgradeInRAMA[i].toString(), 'ether'),
                totalProfitInRAMA: web3.utils.fromWei(tableData.totalProfitInRAMA[i].toString(), 'ether'),
                receivedDate: tableData.receivedDate[i].toString(),
            }));

            console.log("Fetched Transactions:", trx);
            return trx;
        } catch (error) {
            console.error("Error in getU5table:", error.message || error);
            return [];
        }
    },

    // ===========================================================================================================================
    // Filtering the Data on the basis of log 
    // ===========================================================================================================================


    fetchU3MatrixLogs: async (Waladdress) => {

        try {
            const { abi, contractAddress } = await fetchContractAbi("U3plus");


            const TOPIC0 = "0x2bbc8d9aa6da5698030aa4a655c975f5a89fa1d065a2c99d64be4e93d746c388";
            // const TOPIC3 = "0x" + Waladdress.toLowerCase().replace("0x", "").padStart(64, "0");


            const topicEncodedAddress = "0x" + Waladdress.toLowerCase().replace("0x", "").padStart(64, "0");



            // if user is receiver 
            const [logsByInitiator, logsByReceiver] = await Promise.all([
                web3.eth.getPastLogs({
                    fromBlock: 0,
                    toBlock: "latest",
                    address: contractAddress,
                    topics: [TOPIC0, topicEncodedAddress] // Topic1 = initiatedFrom
                }),
                web3.eth.getPastLogs({
                    fromBlock: 0,
                    toBlock: "latest",
                    address: contractAddress,
                    topics: [TOPIC0, undefined, undefined, topicEncodedAddress] // Topic3 = finalReceiver
                })
            ]);



            console.log("🔍 Unfiltered logs:", logsByInitiator, logsByReceiver);



            const allLogs = [...logsByInitiator, ...logsByReceiver];

            // Deduplicate logs by transactionHash
            const uniqueLogsMap = new Map();
            allLogs.forEach(log => uniqueLogsMap.set(log.transactionHash, log));
            const uniqueLogs = Array.from(uniqueLogsMap.values());

            // Decode
            const eventAbi = abi.find(e => e.name === "PaymentReceivedInCurrentCyclePosition" && e.type === "event");

            const decoded = await Promise.all(
                uniqueLogs.map(async (log) => {
                    const decodedLog = web3.eth.abi.decodeLog(eventAbi.inputs, log.data, log.topics.slice(1));
                    const block = await web3.eth.getBlock(log.blockNumber);

                    return {
                        initiatedFrom: decodedLog.initiatedFrom,
                        forwardedFrom: decodedLog.forwardedFrom,
                        finalReceiver: decodedLog.finalReceiver,
                        slotLevel: decodedLog.slotLevel,
                        positionIndex: decodedLog.positionIndex,
                        cycleNo: decodedLog.cycleNo,
                        amountInUSD: decodedLog.amountInUSD,
                        amountInRAMA: web3.utils.fromWei(decodedLog.amountInRAMA.toString(), "ether"),
                        txHash: log.transactionHash,
                        blockNumber: log.blockNumber,
                        timestamp: Number(block.timestamp),
                        formattedDate: new Date(Number(block.timestamp) * 1000).toLocaleString(),
                    };
                })
            );




            console.log("✅ Logs fetched:",);

            return decoded
        } catch (err) {
            console.error("❌ Error fetching U3 logs:", err.message);
        }
    },






}));
