import Web3 from 'web3';
import contractAbi from '../assets/json/HappyMaru.json';

let web3;
let contract;

export const initWeb3 = async () => {
    if (!web3) {
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7785'));
        contract = new web3.eth.Contract(contractAbi.abi, contractAbi.address);
    }
};

export const getContract = () => {
    return contract;
};

export const getAccounts = async () => {
    return await web3.eth.getAccounts();
};
