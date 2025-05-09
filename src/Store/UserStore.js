import { create } from 'zustand';
import Web3 from 'web3';


const Contract = {
    "U3plus": "0x3Fb1113FFA45319F42608e94eE03ed68740E8Da6",
    "UIncome": "0xe99d6BEB132d780DdA86208f3efc47270413463A",
    "U3prem": "0x5268362bCE89c9a73f298614e847cA8fDeAcB725",
    "U4": "0x4a6AD84A4FffD8fBEF84cBE95Fd01AC2953B47f6",
    "U5": "0x8b78CC614B8b379a43BeEdC48Fe2Aa1B08B8Fe7d",
    "UserMang": "0xD475815fccD43Cc50F5D84100263073aB7f81183",
    "PriceConv": "0x6D0a10dCB7c459f73259f3d3C4b6Cd1a6c393af2",
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




const INFURA_URL = "https://blockchain2.ramestta.com"
const web3 = new Web3(INFURA_URL);






export const useStore = create((set) => ({


    // User Wallet Info

    // UserwalletAddress: '',
    // setUserWalletAddress: (address) => set({ UserwalletAddress: address }),




    // Smart Contract Data

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

    generatedId: async (address) => {
        try {
            const [U5, U4, U3prem] = await Promise.all([
                fetchContractAbi("U5"),
                fetchContractAbi("U4"),
                fetchContractAbi("U3prem"),
            ]);

            const contract1 = new web3.eth.Contract(U5.abi, U5.contractAddress);
            const contract2 = new web3.eth.Contract(U4.abi, U4.contractAddress);
            const contract3 = new web3.eth.Contract(U3prem.abi, U3prem.contractAddress);

            const u5generated = await contract1.methods.getGeneratedMatrices(address).call();

            if (u5generated) {
                const u4generated = await contract2.methods.matricesGenerated(address).call();
                const u3premgenerated = await contract3.methods.matricesGenerated(address).call();

                return {
                    u5gen: u5generated,
                    u4gen: u4generated,
                    u3genprem: u3premgenerated,
                };
            }
        } catch (error) {
            console.error("Error in generatedId:", error);
            throw error;
        }
    },


    homePannelInfo: async (address) => {
        try {
            const { abi, contractAddress } = await fetchContractAbi("UserMang");
            const contract = new web3.eth.Contract(abi, contractAddress);
            const slotLevel = await contract.methods.getUsersSlotLevel(address).call();
            console.log("slotlevel================", slotLevel)


            if (slotLevel) {
                const user = await contract.methods.getUser(address).call();

                return {
                    InvitedPartner: user.directReferrals.length,
                    slotActivated: slotLevel
                }
            }
        } catch (error) {
            console.error("Error:", error);
            alert(`user Id Exist ${error.message}`);
            throw error;
        }

    },


    getAllusers: async (userId) => {
        try {
            const { abi, contractAddress } = await fetchContractAbi("UserMang");

            const contract = new web3.eth.Contract(abi, contractAddress);
            const userAddress = await contract.methods.allUsers(userId).call();

            if (userAddress) {

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
            const { abi, contractAddress } = await fetchContractAbi("UserMang");

            const contract = new web3.eth.Contract(abi, contractAddress);
            const isExist = await contract.methods.isRegistered(walletAdd).call();

            console.log("is Users exist:", isExist, walletAdd);
            if (isExist) {

                const user = await contract.methods.getUser(walletAdd).call();
                console.log(user)
                return {
                    isexist: true,
                    walletAdd: walletAdd,
                    userId: user.id.toString(),
                    sponserAdd: user.sponsor,
                    regTime: user.registrationTime,
                    directReferral: user.directReferrals,
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
            const valueInUSD = 20 * 1000000; // 20 USD in micro USD
            const ramaAmount = await priceContract.methods.usdToRama(valueInUSD).call();

            // Prepare transaction
            const trxData = contract.methods.register(sponsorAddress).encodeABI();
            const gasPrice = await web3.eth.getGasPrice();

            let gasLimit;
            try {
                gasLimit = await web3.eth.estimateGas({
                    from: userAddress,
                    to: UIncome.contractAddress,
                    value: ramaAmount,
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
            web3.eth
                .sendTransaction(tx)
                .on("transactionHash", (hash) => {
                    console.log("✅ Transaction Hash:", hash);
                })
                .on("receipt", (receipt) => {
                    console.log("🎉 Transaction Receipt:", receipt);
                    alert(`Transaction successful! Hash: ${receipt.transactionHash}`);
                })
                .on("error", (err) => {
                    console.error("❌ Transaction failed:", err);
                    alert(`Transaction failed: ${err.message}`);
                });

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

            const { abi, contractAddress } = await fetchContractAbi("UserMang");
            const contract = new web3.eth.Contract(abi, contractAddress);

            // Activated slot
            const lastSloat = await contract.methods.getUsersSlotLevel(walletAdd).call();


            const slotInfoArray = [];

            if (lastSloat) {

                for (let i = 1; i <= Number(lastSloat); i++) {
                    const slot = await contract.methods.getUserSlot(walletAdd, 0, i).call();

                    if (!slot || !slot.positions) {
                        console.warn(`Invalid slot data at level ${i}`, slot);
                        slotInfoArray.push({ users: 0, cycles: 0 });
                        continue;
                    }

                    // wallet address ,same matrix,slotLeve/current slot  current cycle for each slot
                    const currentCycle = await contract.methods.getCurrentCycle(walletAdd, 0, i).call();

                    const zeroAddress = "0x0000000000000000000000000000000000000000";
                    const totalPositions = slot.positions.filter(addr => addr !== zeroAddress).length;
                    const cycles = (parseInt(currentCycle) - 1)
                    const users = totalPositions % 4;

                    slotInfoArray.push({ users, cycles });
                }


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


            const { abi, contractAddress } = await fetchContractAbi("UserMang");
            const contract = new web3.eth.Contract(abi, contractAddress);

            // Activated slot
            const lastSloat = await contract.methods.getUsersSlotLevel(walletAdd).call();

            const slotInfoArray = [];

            if (lastSloat) {

                for (let i = 1; i <= Number(lastSloat); i++) {
                    const slot = await contract.methods.getUserSlot(walletAdd, 0, i).call();

                    if (!slot || !slot.positions) {
                        console.warn(`Invalid slot data at level ${i}`, slot);
                        slotInfoArray.push({ users: 0, cycles: 0 });
                        continue;
                    }

                    // wallet address ,same matrix,slotLeve/current slot  current cycle for each slot
                    const currentCycle = await contract.methods.getCurrentCycle(walletAdd, 0, i).call();

                    const zeroAddress = "0x0000000000000000000000000000000000000000";
                    const totalPositions = slot.positions.filter(addr => addr !== zeroAddress).length;
                    const cycles = (parseInt(currentCycle) - 1)
                    const users = totalPositions % 4;

                    slotInfoArray.push({ users, cycles });
                }


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
}));
