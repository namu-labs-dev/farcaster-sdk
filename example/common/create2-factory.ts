
import { ethers } from 'ethers';

const url = 'http://localhost:8545';
const provider = new ethers.providers.JsonRpcProvider(url);

const accountFactoryAddress = '0x364af04695B8b214A04c4c065fE5405791fbb2e8';

const accountFactoryABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "salt",
          "type": "uint256"
        }
      ],
      "name": "getAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "salt",
          "type": "uint256"
        }
      ],
      "name": "createAccount",
      "outputs": [
        {
          "internalType": "contract SimpleAccount",
          "name": "ret",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
];

const accountAbi = [
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];


export async function getContractWalletAddress(ownerAddress: string, salt: number = 0) {
  const accountFactory = new ethers.Contract(accountFactoryAddress, accountFactoryABI, provider);
  const contractWallet = await accountFactory.getAddress(ownerAddress, salt);
    
  return contractWallet;

}

export async function getOwner(address: string) {
  const accountFactory = new ethers.Contract(address, accountAbi, provider);
  const owner = await accountFactory.owner();
  return owner

}