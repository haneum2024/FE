import Web3, {errors} from 'web3';
import contractAbi from '../assets/json/HappyMaru.json';

const web3 = new Web3(new Web3.providers.HttpProvider('http://10.0.2.2:7545'));
const contractAddress = '0x07fF25E299CF4F801258E89FeC9a428cAf46aE57';
const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);

const account = web3.eth.accounts.wallet.add('0x5f91e96e8d9f14471cc4b417b01ed7b094bd97b37da8242d1b35865b01b54d7b');
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
  contract.methods.getNfts().call({
    from: account[0].address,
  })
      .then(console.log)
      .catch(errors => console.log(errors));
};
//
// export const createDogInfo = async (
//     name: string,
//     breed: string,
//     birthDate: string,
//     gender: string,
//     neutraled: boolean,
//     description: string,
//     image: string,
//     tokenURI: string
// ): Promise<any> => {
//   const fromAddress: string = account.address;
//   const tx = contract.methods.createDogInfo(
//       name,
//       breed,
//       birthDate,
//       gender,
//       neutraled,
//       description,
//       image,
//       tokenURI
//   );
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
