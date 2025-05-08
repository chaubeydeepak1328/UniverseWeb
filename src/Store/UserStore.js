import { create } from 'zustand';
import Web3 from 'web3';


const Contract = {
    "U3plus": "0x3Fb1113FFA45319F42608e94eE03ed68740E8Da6",
    "UIncome": "0x3AA8Dc47E57b4699C2Bb422E320E94e4b5158510",
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
                // Loop through each slot level and get the info
                // for (let i = 1; i <= Number(lastSloat); i++) {
                //     const slot = await contract.methods.getUserSlot(walletAdd, 0, i).call();
                //     const totalPositions = slot.positions.length;
                //     console.log("Slot response for level", i, slot , totalPositions);
                //     const cycles = Math.floor(totalPositions / 4);
                //     const users = totalPositions % 4;

                //     slotInfoArray.push({ users, cycles });
                // }

                for (let i = 1; i <= Number(lastSloat); i++) {
                    const slot = await contract.methods.getUserSlot(walletAdd, 0, i).call();

                    if (!slot || !slot.positions) {
                        console.warn(`Invalid slot data at level ${i}`, slot);
                        slotInfoArray.push({ users: 0, cycles: 0 });
                        continue;
                    }

                    const zeroAddress = "0x0000000000000000000000000000000000000000";
                    const totalPositions = slot.positions.filter(addr => addr !== zeroAddress).length;
                    const cycles = Math.floor(totalPositions / 4);
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


    registerUser: async (sponsorAddress, address) => {
        try {

            const { abi, contractAddress } = await fetchContractAbi("UIncome");

            const contract = new web3.eth.Contract(abi, contractAddress);
            console.log("====================", sponsorAddress, contractAddress);


            const balanceWei = await web3.eth.getBalance(address); // address = user's wallet
            const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

            console.log("Wallet Balance in ETH:", balanceEth);


            const trxData = contract.methods.register(sponsorAddress).encodeABI();
            const nonce = await web3.eth.getTransactionCount(address, "latest");
            const gasPrice = await web3.eth.getGasPrice();

            console.log("txData, nonce, gasPrice", trxData, nonce, gasPrice)

            const valueInWei = web3.utils.toWei('0.000045', 'ether');
            console.log("Value in Wei:", address, contractAddress, valueInWei, trxData); // Log the value in Wei


            let gasLimit;

            try {
                gasLimit = await web3.eth.estimateGas({
                    from: address,
                    // to: contractAddress,
                    // value: valueInWei,
                    // data: trxData
                });
            } catch (error) {
                console.error("Gas estimation failed:", error);
                alert("Gas estimation failed. Please check your inputs.");
                return;
            }


            console.log("Gas Limit:", gasLimit); // Log the gas limit


            // try {
            //     await contract.methods.register(sponsorAddress).call({
            //         from: address,
            //         value: valueInWei,
            //     });
            // } catch (err) {
            //     console.error("Simulation Error:", err.message);
            //     alert("Simulation failed: " + err.message);
            //     return;
            // }

            const gasCost = web3.utils.fromWei(
                (gasLimit * gasPrice).toString(),
                "ether"
            );

            console.log("Estimated Gas:", gasCost); // Log the estimated gas

            // const gasPrice = await web3.eth.getGasPrice();

            // const tx = await contract.methods.register(sponsorAddress)
            // .send({
            //     from: address,
            //     to: contractAddress,
            //     data: trxData,
            //     gas: gasLimit,
            //     gasPrice: gasPrice,
            //     value: valueInWei,
            //     gasPrice: gasPrice,
            // });

            const tx = {
                from: address,
                to: contractAddress,
                data: trxData,
                gas: gasLimit,
                gasPrice: gasPrice,
                // nonce: nonce,
                // chainId: "1370",
                value: valueInWei,
            };

            // get().addTransaction(tx);
            web3.eth
                .sendTransaction(tx)
                .on("transactionHash", (hash) => { console.log("Transaction Hash:", hash); })
                .on("receipt", (receipt) => {
                    console.log("Transaction Receipt:", receipt);
                    alert(`Transaction successful! Hash: ${receipt.transactionHash}`);
                })


            // console.log('Transaction Hash:', tx.transactionHash);
            // alert(`Transaction successful! Hash: ${tx.transactionHash}`);

            return tx;

        } catch (error) {
            console.error("Transaction Error:", error);
            alert(`Transaction failed: ${error.message}`);
            throw error;
        }
    }
}));
