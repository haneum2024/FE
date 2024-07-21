import Web3 from 'web3';
import contractAbi from '../assets/json/HappyMaru.json';
import {ADMIN_PRIVATE_KEY, INFURA_ENDPOINT,} from 'react-native-dotenv';

const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_ENDPOINT));
const contractAddress = contractAbi.networks["11155111"].address;
const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);
const account = web3.eth.accounts.wallet.add(ADMIN_PRIVATE_KEY);
const adminAddress = account[0].address;

web3.eth.defaultAccount = web3.eth.accounts[0];

export const getAccount = () => {
  return account[0].address;
};

// export const getNftsCount = async (): Promise<number> => {
//   return await contract.methods.getNftsCount().call();
// };
//
export const getNfts = async (address) => {
  contract.methods.getNfts(address).call({
  })
      .then(console.log)
      .catch(errors => console.log(errors));
};


export const createDogInfo = async (
    address,
    name,
    breed,
    birthDate,
    gender,
    neutraled,
    description,
    image,
    noseData,
    tokenURI
) => {

  const tx = contract.methods.createDogInfo(
      address,
      name,
      breed,
      birthDate,
      gender,
      neutraled,
      description,
      image,
      noseData,
      tokenURI
  );
  const gas = await tx.estimateGas({ from: adminAddress });
  console.log(gas);
  const data = tx.encodeABI();
  const txData = {
    from: adminAddress,
    to: contractAddress,
    data: data,
    gas,
  };

  return web3.eth.sendTransaction(txData);
};
