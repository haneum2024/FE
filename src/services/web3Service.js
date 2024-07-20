import Web3 from 'web3';
import contractAbi from '../assets/json/HappyMaru.json';
import {
  INFURA_ENDPOINT,
  ADMIN_PRIVATE_KEY,
} from 'react-native-dotenv';


console.log(INFURA_ENDPOINT);
const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_ENDPOINT));

const contractAddress = contractAbi.networks["11155111"].address;
console.log(contractAddress)
const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);

const account = web3.eth.accounts.wallet.add(ADMIN_PRIVATE_KEY);
web3.eth.defaultAccount = web3.eth.accounts[0];

// console.log(account.address);
//↳ 0xd1F028Ab4c423Ee69f153D39da1768e3AF16604E
// console.log(account.privateKey);
//↳ 0x21739cb6cd7b109c100ec9fa1df8bab0c0c23b20b82dd32649b8d6be025cc9bf

// wallet address: 0xd1F028Ab4c423Ee69f153D39da1768e3AF16604E
// private address: 0x21739cb6cd7b109c100ec9fa1df8bab0c0c23b20b82dd32649b8d6be025cc9bf

// export const sendNft = async (to: string, tokenId: number): Promise<any> => {
//   const fromAddress: string = account[0].address;
//   const tx = contract.methods.sendNft(fromAddress, to, tokenId);
//   const gas: number = await tx.estimateGas({ from: fromAddress });
//   const data: string = tx.encodeABI();
//   const txData = {
//     from: fromAddress,
//     to: contractAddress,
//     data: data,
//     gas,
//   };
//
//   return web3.eth.sendTransaction(txData);
// };

export const getAccount = () => {
  return account[0].address;
};

// export const getNftsCount = async (): Promise<number> => {
//   return await contract.methods.getNftsCount().call();
// };
//
export const getNfts = async () => {
  const fromAddress = account[0].address
  contract.methods.getNfts().call({
    from: fromAddress,
  })
      .then(console.log)
      .catch(errors => console.log(errors));
};

export const createDogInfo = async (
    name,
    breed,
    birthDate,
    gender,
    neutraled,
    description,
    image,
    tokenURI
) => {
  const fromAddress = account[0].address;

  const tx = contract.methods.createDogInfo(
      name,
      breed,
      birthDate,
      gender,
      neutraled,
      description,
      image,
      tokenURI
  );
  const gas = await tx.estimateGas({ from: fromAddress });
  console.log(gas);
  const data = tx.encodeABI();
  const txData = {
    from: fromAddress,
    to: contractAddress,
    data: data,
    gas,
  };

  return web3.eth.sendTransaction(txData);
};
