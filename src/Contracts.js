import { ethers } from "ethers";

export const Contract = (CONTRACT_ABI, CONTRACT_ADDRESS, isSigner = false) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  //   const ABI = CONTRACT_ABI;
  // const CONTRACT_ADDRESS = EXCHANGE_CONTRACT_ADDRESS;
  //   console.log(ABI, CONTRACT_ADDRESS);
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    );
    const contractWithSigner = contract.connect(signer);
    if (isSigner) return contractWithSigner;
    return contract;
  } catch (e) {
    console.log(e);
  }
};
