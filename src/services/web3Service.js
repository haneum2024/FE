import Web3 from 'web3';
import contractAbi from '../assets/json/HappyMaru.json';
import {
  INFURA_ENDPOINT,
  ADMIN_PRIVATE_KEY,
} from 'react-native-dotenv';


const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_ENDPOINT));

const contractAddress = contractAbi.networks["11155111"].address;
const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);

const adminAccount = web3.eth.accounts.wallet.add(ADMIN_PRIVATE_KEY);
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

// admin account
export const getAccount = () => {
  return adminAccount[0].address;
};

// export const getNftsCount = async (): Promise<number> => {
//   return await contract.methods.getNftsCount().call();
// };
//

// 내가 가진 nft 반환
export const getNfts = async (ownerAddress) => {
  const fromAddress = adminAccount[0].address
  contract.methods.getNfts(ownerAddress).call({
    from: fromAddress,
  })
      .then(console.log)
      .catch(errors => console.log(errors));
};

export const createDogInfo = async (
    address,      // NFT를 받을 주소
    name,         // 강아지의 이름
    breed,        // 강아지의 품종
    birthDate,    // 강아지의 생년월일
    gender,       // 강아지의 성별
    neutraled,    // 강아지의 중성화 여부
    description,  // 강아지에 대한 설명
    image,        // 강아지의 이미지 URI
    noseData,     // 강아지의 코 데이터 (비문 데이터)
    tokenURI      // 토큰 URI (메타데이터 URI)
) => {


  // 스마트 계약의 createDogInfo 함수 호출
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

  // 가스 추정치 계산 (web3.eth.accounts[0]에서 실행)
  const gas = await tx.estimateGas({ from: adminAccount[0].address });
  console.log(gas);
  console.log(adminAccount);
  // 트랜잭션 데이터 인코딩
  const data = tx.encodeABI();

  // 트랜잭션 데이터 구성
  const txData = {
    from: adminAccount[0].address,  // 트랜잭션을 보내는 계정
    to: contractAddress,         // 스마트 계약 주소
    data: data,                  // 인코딩된 데이터
    gas,                         // 추정된 가스
  };

  // 트랜잭션 전송 및 결과 반환
  return web3.eth.sendTransaction(txData);
};