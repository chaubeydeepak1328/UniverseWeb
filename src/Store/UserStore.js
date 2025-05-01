// import { create } from 'zustand';
// import contractABI from '../Provider/ABI.json';
// import Web3 from 'web3';





// const INFURA_URL = "https://blockchain2.ramestta.com"
// const web3 = new Web3(INFURA_URL);

// const contractAddress = "0xa6e74cae22C51c35C89A9941243869a99af442AE";
// const contract = new web3.eth.Contract(contractABI, contractAddress);





// export const useStore = create((set) => ({
//     transactions: [],
//     addTransaction: (tx) => set((state) => ({ transactions: [...state.transactions, tx] })),

//     registerUser: async (sponsorAddress, address, isConnected) => {
//         try {
//             console.log("====================", sponsorAddress);

//             if (!isConnected) {
//                 alert("Please Connect Wallet First");
//                 return;
//             }
//             if (!sponsorAddress) {
//                 alert("Please Provide Sponser Wallet Address");
//                 return;
//             }

//             const valueInWei = web3.utils.toWei('0.02', 'ether');


//             const estimatedGas = await contract.methods.register(sponsorAddress).estimateGas({
//                 from: address,
//                 value: valueInWei
//             });

//             const gasPrice = await web3.eth.getGasPrice();

//             const tx = await contract.methods.register(sponsorAddress)
//                 .send({
//                     from: address,
//                     value: valueInWei,
//                     gas: estimatedGas,
//                     gasPrice: gasPrice
//                 });

//             get().addTransaction(tx);

//             console.log('Transaction Hash:', tx.transactionHash);
//             alert(`Transaction successful! Hash: ${tx.transactionHash}`);

//             return tx;

//         } catch (error) {
//             console.error("Transaction Error:", error);
//             alert(`Transaction failed: ${error.message}`);
//             throw error;
//         }
//     }
// }));



import { create } from 'zustand';
import Web3 from 'web3';


const Contract = {
    "U5": "0xEE2cFEE128dC97A45C32D629E0DD262c23546B84",
    "U4": "0x04d85a366c0B4be7c22AFC94f3Df5775190baF4d",
    "U3prem": "0x65C05fda54d11B61Bf28d2F2993E39439CF15294",
    "U3plus": "0xaC621ACF9B4F80fe2071B49747BCD35272d722b2",
    "UIncome": "0xa6e74cae22C51c35C89A9941243869a99af442AE",
    "UserMang": "0xBCce2Ff6c1Fe17392364c7B675B6Da7F52377C06",
    "PriceConv": "0x4edcF03Fba12114bdEA9EbD02690C9bf083dBCeD",
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
    transactions: [],
    addTransaction: (tx) => set((state) => ({ transactions: [...state.transactions, tx] })),

    registerUser: async (sponsorAddress, address, isConnected) => {
        try {

            const { abi, contractAddress } = await fetchContractAbi("UIncome");

            const contract = new web3.eth.Contract(abi, contractAddress);
            console.log("====================", sponsorAddress, contractAddress);

            if (!isConnected) {
                alert("Please Connect Wallet First");
                return;
            }
            if (!sponsorAddress) {
                alert("Please Provide Sponser Wallet Address");
                return;
            }


            const trxData = contract.methods.register(sponsorAddress).encodeABI();
            const nonce = await web3.eth.getTransactionCount(address, "latest");
            const gasPrice = await web3.eth.getGasPrice();

            console.log("txData, nonce, gasPrice", trxData, nonce, gasPrice)

            const valueInWei = web3.utils.toWei('22', 'ether');
            console.log("Value in Wei:", valueInWei, address); // Log the value in Wei


            const gasLimit = await web3.eth.estimateGas({
                from: address,
                to: contractAddress,
                value: valueInWei,
                data: trxData
            });

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
                nonce: nonce,
                gasPrice: gasPrice,
                chainId: "1370",
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


            console.log('Transaction Hash:', tx.transactionHash);
            alert(`Transaction successful! Hash: ${tx.transactionHash}`);

            return tx;

        } catch (error) {
            console.error("Transaction Error:", error);
            alert(`Transaction failed: ${error.message}`);
            throw error;
        }
    }
}));

