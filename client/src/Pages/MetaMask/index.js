import React, { useEffect, useState } from 'react';
import logoMetaMask from './metamask.png';
import './metamask.style.css';
import Web3 from 'web3';
import AdminContractABI from '../../configs/AdminContractABI.json';

const MetaMask = () => {
    const [web3, setWeb3] = useState(null);
    const [adminContract, setAdminContract] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState("");

    const initializeWeb3 = async () => {
        try {
            // Check if MetaMask is installed
            if (window.ethereum) {
                // Use the current provider (MetaMask)
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Get the default account
                const accounts = await web3Instance.eth.getAccounts();
                setDefaultAccount(accounts[0]);

                // Initialize the AdminContract
                const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
                const adminContractInstance = new web3Instance.eth.Contract(
                    AdminContractABI.abis['0x7a45633e32059a99fd44987ba5bb83fc6d768d6f0285e26c7750f4238379d906'],
                    contractAddress
                );
                setAdminContract(adminContractInstance);
            } else {
                console.error("MetaMask is not installed");
            }
        } catch (error) {
            console.error('Error initializing web3:', error.message);
        }
    };

    useEffect(() => {
        initializeWeb3();
    }, []);

    const connectWallet = async () => {
        if (web3 && adminContract) {
            try {
                const isAdmin = await checkAdminAccess(defaultAccount);
                console.log(`Is admin? ${isAdmin}`);
                alert(`Is admin? ${isAdmin}`);
            } catch (error) {
                console.error('Error connecting wallet:', error.message);
            }
        }
    };

    const checkAdminAccess = async (account) => {
        try {
            const isAdmin = await adminContract.methods.isAdmin(account).call();
            return isAdmin;
        } catch (error) {
            console.error('Error checking admin access:', error.message);
        }
    };

    return (
        <div className='container-metamask'>
            <div className='container-metamask__title'>
                <h1>MetaMask Wallet Connection</h1>
            </div>
            <div className='container-metamask__logo'>
                <img src={logoMetaMask} alt="" />
            </div>
            <div className='container-metamask__btn'>
                <button onClick={connectWallet}>Continue with admin rights</button>
            </div>
        </div>
    );
};

export default MetaMask;
