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
            const { abi, contractAddress } = await fetchContractAbi("PriceConv");


            const contract = new web3.eth.Contract(abi, contractAddress);
            const userAddress = await contract.methods.usdToRama(20).call();

            console.log("Users:", userAddress);
            return userAddress.toString();
        } catch (error) {

        }
    },


    getAllusers: async (userId) => {
        try {
            const { abi, contractAddress } = await fetchContractAbi("UserMang");

            const contract = new web3.eth.Contract(abi, contractAddress);
            const userAddress = await contract.methods.allUsers(userId).call();

            console.log("Users:", userAddress); // Log the fetched users to the console
            return userAddress.toString();
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
        // const walletAdd = "0x25fB86046a1ccfa490a21Dbb9BA08E2803a45B8b";

        try {
            if (!walletAdd) {
                throw new Error("Invalid wallet address");
            }
            const { abi, contractAddress } = await fetchContractAbi("UserMang");

            const contract = new web3.eth.Contract(abi, contractAddress);
            const lastSloat = await contract.methods.getUsersSlotLevel(walletAdd).call();

            // const 

            return lastSloat.toString();
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

