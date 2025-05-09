import { useAppKitAccount } from '@reown/appkit/react';
import { useEstimateGas, useSendTransaction } from 'wagmi';
import { parseGwei } from 'viem';

const TEST_TX = {
    to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    value: parseGwei('0.0001')
};

export const useTransaction = () => {
    const { address } = useAppKitAccount();
    const { data: gas } = useEstimateGas({ ...TEST_TX });
    const { sendTransaction, data: hash } = useSendTransaction();

    const handleSendTx = () => {
        try {
            sendTransaction({
                ...TEST_TX,
                gas,
            });
        } catch (err) {
            console.log('Error sending transaction:', err);
        }
    };

    return {
        handleSendTx,
        hash,
    };
};
