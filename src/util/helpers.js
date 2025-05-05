export const removeAddress = () => {
    localStorage.removeItem('walletAdd');
};

export const setWalletAddress = (address) => {
    localStorage.setItem('walletAdd', address);
};


export const getWalletAddress = () => {
    return localStorage.getItem('walletAdd');
}