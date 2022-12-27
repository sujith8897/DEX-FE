import "./App.css";
import { useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Contract } from "./Contracts";

const EXCHANGE_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const TOKEN_A_CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const TOKEN_B_CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

const EXCHANGE_RATE = 1;

// Token A = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"
// Token B = "0x0165878A594ca255338adfa4d48449f69242Eb8F"

// const TOKEN_ABI = [
//   {
//     inputs: [],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     inputs: [],
//     name: "_totalSupply",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_owner",
//         type: "address",
//       },
//       {
//         internalType: "address",
//         name: "_spender",
//         type: "address",
//       },
//     ],
//     name: "allowance",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     name: "allowed",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_spender",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "_value",
//         type: "uint256",
//       },
//     ],
//     name: "approve",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_owner",
//         type: "address",
//       },
//     ],
//     name: "balanceOf",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "balance",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     name: "balances",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "defaultExchangeTransferAmount",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "exchangeAddress",
//     outputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "owner",
//     outputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "totalSupply",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_to",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "_value",
//         type: "uint256",
//       },
//     ],
//     name: "transfer",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_from",
//         type: "address",
//       },
//       {
//         internalType: "address",
//         name: "_to",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "_value",
//         type: "uint256",
//       },
//     ],
//     name: "transferFrom",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];

export const TOKEN_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "_totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultExchangeTransferAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "exchangeAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "transferToExchange",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const EXCHANGE_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenExchangeRate",
        type: "uint256",
      },
    ],
    name: "addToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "exchangeRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "getExchangeRateOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "isTokenExists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "removeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "tokens",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "sellToken",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "sellAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "buyToken",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "buyAmount",
        type: "uint256",
      },
    ],
    name: "trade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [balanceOfAddress, setBalanceOfAddress] = useState("");

  const [tokens, setTokens] = useState({
    [TOKEN_A_CONTRACT_ADDRESS]: {
      address: TOKEN_A_CONTRACT_ADDRESS,
      abi: TOKEN_ABI,
      name: "TokenA",
      totalSupply: "100",
      exchangeRate: 1,
      addedToExchange: false,
    },
    [TOKEN_B_CONTRACT_ADDRESS]: {
      address: TOKEN_B_CONTRACT_ADDRESS,
      abi: TOKEN_ABI,
      name: "TokenB",
      totalSupply: "100",
      exchangeRate: 1,
      addedToExchange: false,
    },
  });
  const [walletAddress, setWalletAddress] = useState({
    [TOKEN_A_CONTRACT_ADDRESS]: "",
    [TOKEN_B_CONTRACT_ADDRESS]: "",
  });
  const [toAddress, setToAddress] = useState({
    [TOKEN_A_CONTRACT_ADDRESS]: "",
    [TOKEN_B_CONTRACT_ADDRESS]: "",
  });
  const [balance, setBalance] = useState({
    [TOKEN_A_CONTRACT_ADDRESS]: null,
    [TOKEN_B_CONTRACT_ADDRESS]: null,
  });
  const [exchangeAmount, setExchangeAmount] = useState({
    [TOKEN_A_CONTRACT_ADDRESS]: "",
    [TOKEN_B_CONTRACT_ADDRESS]: "",
  });
  const [loadingTokens, setLoadingTokens] = useState({
    [TOKEN_A_CONTRACT_ADDRESS]: {
      isLoadingBalance: false,
      isLoadingTransfer: false,
    },
    [TOKEN_B_CONTRACT_ADDRESS]: {
      isLoadingBalance: false,
      isLoadingTransfer: false,
    },
    [EXCHANGE_CONTRACT_ADDRESS]: {
      isLoadingBalance: false,
      isLoadingTransfer: false,
    },
  });
  const [waiting, setWaiting] = useState({
    [TOKEN_A_CONTRACT_ADDRESS]: false,
    [TOKEN_B_CONTRACT_ADDRESS]: false,
  });
  const [dex, setDex] = useState({
    [TOKEN_A_CONTRACT_ADDRESS]: "",
    [TOKEN_B_CONTRACT_ADDRESS]: "",
  });

  const [addedTokens, setAddedTokens] = useState({});

  const [connectWalletAddress, setConnectedWalletAddress] = useState(null);

  const [selectedToken, setSelectedToken] = useState("");
  const [totalSupply, setTotalSupply] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [allowedValue, setAllowedValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleChangeToken = async (event) => {
  //   // setSelectedToken(event.target.value);
  //   await handleTotalSupply(event.target.value);
  // };

  const handleChangeWalletAddress = (e, token) => {
    setWalletAddress({
      ...walletAddress,
      [token]: e.target.value,
    });
    setBalance({
      ...balance,
      [token]: null,
    });
  };

  const handleChangeToAddress = (e, token) => {
    setToAddress({
      ...toAddress,
      [token]: e.target.value,
    });
  };

  const handleDex = (e, token) => {
    let val = e.target.value;
    if (val.length === 0) {
      setDex({
        ...dex,
        [TOKEN_A_CONTRACT_ADDRESS]: "",
        [TOKEN_B_CONTRACT_ADDRESS]: "",
      });
      return;
    }
    if (!isNaN(val)) {
      if (token === TOKEN_A_CONTRACT_ADDRESS) {
        setDex({
          ...dex,
          [TOKEN_A_CONTRACT_ADDRESS]: val.toString(),
          [TOKEN_B_CONTRACT_ADDRESS]: (val * EXCHANGE_RATE).toString(),
        });
      } else {
        setDex({
          ...dex,
          [TOKEN_A_CONTRACT_ADDRESS]: (val * (1 / EXCHANGE_RATE)).toString(),
          [TOKEN_B_CONTRACT_ADDRESS]: val.toString(),
        });
      }
    }
  };

  const handleExchangeAmount = (e, token) => {
    const val = e.target.value;
    if (!isNaN(val)) {
      setExchangeAmount({
        ...exchangeAmount,
        [token]: val,
      });
    }
  };

  const connectWallet = async () => {
    await checkWalletConnect();
  };

  const checkWalletConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsWalletConnected(true);
      } catch (error) {
        console.log(error);
        setIsWalletConnected(false);
      }
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log(accounts);
      setConnectedWalletAddress(accounts[0]);
    } else {
      setIsWalletConnected(false);
    }
  };

  const handleTotalSupply = async (tokenAddress) => {
    await checkWalletConnect();
    console.log("Getting total supply...");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const ABI = tokens[tokenAddress]?.abi;
    const CONTRACT_ADDRESS = tokens[tokenAddress]?.address;
    console.log(ABI, CONTRACT_ADDRESS);

    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const transactionResponse = await contract.totalSupply();
      const total_supply = ethers.utils.formatEther(transactionResponse);
      console.log(total_supply, tokens);
      setTokens({
        ...tokens,
        [tokenAddress]: {
          ...tokens[tokenAddress],
          totalSupply: total_supply,
        },
      });
      // await listenForTransactionMine(transactionResponse, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBalanceOf = async (token) => {
    await checkWalletConnect();
    if (!isWalletConnected) await connectWallet();
    if (loadingTokens[token].isLoadingBalance) return;
    setLoadingTokens({
      ...loadingTokens,
      [token]: {
        ...loadingTokens[token],
        isLoadingBalance: true,
      },
    });
    console.log(`Getting Balance...`);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    // console.log(signer);
    // console.log("Account:", await signer.getAddress());
    const ABI = tokens[token]?.abi;
    const CONTRACT_ADDRESS = tokens[token]?.address;
    console.log(ABI, CONTRACT_ADDRESS);
    // console.log(contract);
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const transactionResponse = await contract.balanceOf(
        walletAddress[token]
      );
      // console.log(transactionResponse);
      const _balance = ethers.utils.formatEther(transactionResponse);
      console.log(_balance);
      setBalance({
        ...balance,
        [token]: _balance,
      });

      // await listenForTransactionMine(transactionResponse, provider);
    } catch (error) {
      console.log(error);
      setLoadingTokens({
        ...loadingTokens,
        [token]: {
          ...loadingTokens[token],
          isLoadingBalance: false,
        },
      });
    }

    // setWalletAddress("");
    setLoadingTokens({
      ...loadingTokens,
      [token]: {
        ...loadingTokens[token],
        isLoadingBalance: false,
      },
    });
  };

  const transferToExchange = async (token) => {
    await checkWalletConnect();
    // if (!isWalletConnected) await connectWallet();
    if (loadingTokens[token].isLoadingTransfer) return;
    setLoadingTokens({
      ...loadingTokens,
      [token]: {
        ...loadingTokens[token],
        isLoadingTransfer: true,
      },
    });
    console.log(`Transferring tokens...`);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const ABI = tokens[token]?.abi;
    const CONTRACT_ADDRESS = tokens[token]?.address;
    console.log(ABI, CONTRACT_ADDRESS);

    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      // const value = parseInt(exchangeAmount) * 1000000000000000000;
      // const value = BigNumber.from(
      //   parseInt(exchangeAmount) * 1000000000000000000
      // );
      // const value = exchangeAmount;
      const value = ethers.utils.parseUnits(exchangeAmount[token], 18);
      console.log(value);
      const contractWithSigner = contract.connect(signer);
      const transactionResponse = await contractWithSigner.transfer(
        toAddress[token],
        value
      );
      // setWaiting({
      //   ...waiting,
      //   [token]: true,
      // });
      // setTimeout(() => {
      //   setWaiting({
      //     ...waiting,
      //     [token]: false,
      //   });
      // }, [15000]);
      // if (walletAddress) {
      //   setTimeout(async () => {
      //     await handleBalanceOf(token);
      //   }, [2000]);
      // }
    } catch (error) {
      console.log(error);
      setLoadingTokens({
        ...loadingTokens,
        [token]: {
          ...loadingTokens[token],
          isLoadingTransfer: false,
        },
      });
    }
    setLoadingTokens({
      ...loadingTokens,
      [token]: {
        ...loadingTokens[token],
        isLoadingTransfer: false,
      },
    });
  };

  const handleClearWalletAddress = (token) => {
    setWalletAddress({
      ...walletAddress,
      [token]: "",
    });
    setBalance({
      ...balance,
      [token]: null,
    });
  };

  const handleClearToAddress = (token) => {
    setToAddress({
      ...toAddress,
      [token]: "",
    });
  };

  const handleTrade = async () => {
    await checkWalletConnect();
    const val = await handleIsAllowed(TOKEN_A_CONTRACT_ADDRESS);
    console.log(val, val <= 0);
    if (val <= 0) {
      return setIsModalOpen(true);
    }
    // if (!isWalletConnected) await connectWallet();
    if (loadingTokens[EXCHANGE_CONTRACT_ADDRESS].isLoadingTransfer) return;
    setLoadingTokens({
      ...loadingTokens,
      [EXCHANGE_CONTRACT_ADDRESS]: {
        ...loadingTokens[EXCHANGE_CONTRACT_ADDRESS],
        isLoadingTransfer: true,
      },
    });
    console.log(`Trading tokens...`);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const ABI = EXCHANGE_ABI;
    const CONTRACT_ADDRESS = EXCHANGE_CONTRACT_ADDRESS;
    console.log(ABI, CONTRACT_ADDRESS);

    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      // const value = parseInt(exchangeAmount) * 1000000000000000000;
      // const value = BigNumber.from(
      //   parseInt(exchangeAmount) * 1000000000000000000
      // );
      // const value = exchangeAmount;
      const sellToken = tokens[TOKEN_A_CONTRACT_ADDRESS].name;
      console.log(sellToken, dex[TOKEN_A_CONTRACT_ADDRESS]);

      // const sellValue = (
      //   1000000000000000000 * dex[TOKEN_A_CONTRACT_ADDRESS]
      // ).toString();
      const sellValue = dex[TOKEN_A_CONTRACT_ADDRESS];
      console.log(sellValue, sellValue.length);

      const sellAmount = ethers.utils.parseUnits(sellValue, 18);
      console.log(sellAmount);

      const buyToken = tokens[TOKEN_B_CONTRACT_ADDRESS].name;
      console.log(buyToken, dex[TOKEN_B_CONTRACT_ADDRESS]);

      // const buyValue = (
      //   1000000000000000000 * dex[TOKEN_B_CONTRACT_ADDRESS]
      // ).toString();
      const buyValue = dex[TOKEN_B_CONTRACT_ADDRESS];
      console.log(buyValue, buyValue.length);

      const buyAmount = ethers.utils.parseUnits(buyValue, 18);
      // const buyAmount = sellAmount;
      console.log(buyAmount);

      // console.log(sellToken, sellAmount, buyToken, buyAmount);
      const contractWithSigner = contract.connect(signer);
      const tokenContract = new ethers.Contract(
        TOKEN_A_CONTRACT_ADDRESS,
        tokens[TOKEN_A_CONTRACT_ADDRESS].abi,
        provider
      );
      // const tx = await tokenContract
      //   .connect(signer)
      //   .approve(connectWalletAddress, sellAmount);
      const transactionResponse = await contractWithSigner.trade(
        sellToken,
        sellAmount,
        buyToken,
        buyAmount
      );
      // setWaiting({
      //   ...waiting,
      //   [TOKEN_A_CONTRACT_ADDRESS]: true,
      //   [TOKEN_B_CONTRACT_ADDRESS]: true,
      // });
      // setTimeout(() => {
      //   setWaiting({
      //     ...waiting,
      //     [TOKEN_A_CONTRACT_ADDRESS]: false,
      //     [TOKEN_B_CONTRACT_ADDRESS]: false,
      //   });
      // }, [15000]);
      // if (walletAddress) {
      //   setTimeout(async () => {
      //     await handleBalanceOf(token);
      //   }, [2000]);
      // }
    } catch (error) {
      console.log(error);
      setLoadingTokens({
        ...loadingTokens,
        [EXCHANGE_CONTRACT_ADDRESS]: {
          ...loadingTokens[EXCHANGE_CONTRACT_ADDRESS],
          isLoadingTransfer: false,
        },
      });
    }
    setLoadingTokens({
      ...loadingTokens,
      [EXCHANGE_CONTRACT_ADDRESS]: {
        ...loadingTokens[EXCHANGE_CONTRACT_ADDRESS],
        isLoadingTransfer: false,
      },
    });
  };

  const handleAddToken = async (token) => {
    await checkWalletConnect();
    const isExists = await handleIsTokenExists(token);
    if (isExists) return;
    // if (!isWalletConnected) await connectWallet();
    if (loadingTokens[EXCHANGE_CONTRACT_ADDRESS].isLoadingTransfer) return;
    setLoadingTokens({
      ...loadingTokens,
      [EXCHANGE_CONTRACT_ADDRESS]: {
        ...loadingTokens[EXCHANGE_CONTRACT_ADDRESS],
        isLoadingTransfer: true,
      },
    });
    console.log(`Transferring tokens...`);
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const ABI = EXCHANGE_ABI;
    // const CONTRACT_ADDRESS = EXCHANGE_CONTRACT_ADDRESS;
    // console.log(ABI, CONTRACT_ADDRESS);

    try {
      // const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      // const value = parseInt(exchangeAmount) * 1000000000000000000;
      // const value = BigNumber.from(
      //   parseInt(exchangeAmount) * 1000000000000000000
      // );
      // const value = exchangeAmount;
      const value = ethers.utils.parseUnits(
        tokens[token].exchangeRate.toString(),
        18
      );
      console.log(value);
      // const contractWithSigner = contract.connect(signer);
      const contractWithSigner = Contract(
        EXCHANGE_ABI,
        EXCHANGE_CONTRACT_ADDRESS,
        true
      );
      const transactionResponse = await contractWithSigner.addToken(
        tokens[token].name,
        tokens[token].address,
        value
      );
      setTokens({
        ...tokens,
        [token]: {
          ...tokens[token],
          addedToExchange: true,
        },
      });
    } catch (error) {
      console.log(error);
      setLoadingTokens({
        ...loadingTokens,
        [EXCHANGE_CONTRACT_ADDRESS]: {
          ...loadingTokens[EXCHANGE_CONTRACT_ADDRESS],
          isLoadingTransfer: false,
        },
      });
    }
    setLoadingTokens({
      ...loadingTokens,
      [EXCHANGE_CONTRACT_ADDRESS]: {
        ...loadingTokens[EXCHANGE_CONTRACT_ADDRESS],
        isLoadingTransfer: false,
      },
    });
  };

  const handleIsTokenExists = async (token) => {
    await checkWalletConnect();
    try {
      const contract = Contract(EXCHANGE_ABI, EXCHANGE_CONTRACT_ADDRESS, false);
      const tx = await contract.isTokenExists(tokens[token].name);
      setTokens({
        ...tokens,
        [token]: {
          ...tokens[token],
          addedToExchange: !tx,
        },
      });
      console.log(!tx);
      return !tx;
    } catch (e) {
      console.log(e);
    }
  };

  const handleIsAllowed = async (token) => {
    await checkWalletConnect();
    console.log("checking allowance...");
    try {
      const contract = Contract(
        tokens[token].abi,
        tokens[token].address,
        false
      );
      const tx = await contract.allowance(
        connectWalletAddress,
        EXCHANGE_CONTRACT_ADDRESS
      );
      const txAllowedValue = parseFloat(ethers.utils.formatEther(tx));
      console.log({ allowed: txAllowedValue });
      return txAllowedValue;
    } catch (e) {
      console.log(e);
    }
  };

  const handleAllowTx = async (token, spender, value) => {
    await checkWalletConnect();
    try {
      const contract = Contract(tokens[token].abi, tokens[token].address, true);

      const spendValue = ethers.utils.parseUnits(value, 18);
      const tx = await contract.approve(spender, spendValue);
      return tx;
    } catch (e) {
      console.log(e);
    }
  };

  const handleApproveTx = async () => {
    await handleAllowTx(
      TOKEN_A_CONTRACT_ADDRESS,
      EXCHANGE_CONTRACT_ADDRESS,
      allowedValue
    );
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAllowedValue("");
  };

  // function listenForTransactionMine(transactionResponse, provider) {
  //   console.log(`Mining ${transactionResponse._hex}`);
  //   return new Promise((resolve, reject) => {
  //     try {
  //       provider.once(transactionResponse._hex, (transactionReceipt) => {
  //         console.log(
  //           `Completed with ${transactionReceipt.confirmations} confirmations. `
  //         );
  //         resolve();
  //       });
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // }

  useEffect(() => {
    // const checkIfConnected = async () => {
    //   const accounts = await window.ethereum.request({
    //     method: "eth_accounts",
    //   });
    //   setIsWalletConnected(accounts.length > 0);
    // };
    // checkIfConnected();
    // const main = async () => {
    //   console.log("main");
    //   await checkWalletConnect();
    //   // await handleAddToken(TOKEN_A_CONTRACT_ADDRESS);
    //   // await handleAddToken(TOKEN_B_CONTRACT_ADDRESS);
    //   // await handleIsTokenExists(TOKEN_A_CONTRACT_ADDRESS);
    //   // await handleIsTokenExists(TOKEN_B_CONTRACT_ADDRESS);
    // };
    // main();
  }, []);

  // console.log(totalSupply, tokens);

  // useEffect(() => {
  //   console.log(isLoading);
  // }, [isLoading]);

  return (
    <div>
      {!isWalletConnected ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            // marginTop: "20px",
          }}
        >
          <h2>
            Hi👋, Welcome to <span style={{ color: "green" }}>SimpleDEX</span>
          </h2>
          <Button onClick={connectWallet} variant="contained">
            {isWalletConnected ? "Connected" : "Connect Wallet"}
          </Button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Typography style={{ color: "green" }}>
            Connected to: <strong>{connectWalletAddress}</strong>
          </Typography>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100vw",
              marginTop: "50px",
              // height: "100vh",
            }}
          >
            {Object.keys(tokens).map((_token, i) => (
              <Card
                key={i}
                style={{
                  padding: "20px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  minHeight: "65%",
                }}
              >
                <Typography>{tokens[_token].name}</Typography>
                <br />
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Token</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={_token}
                      label="Token"
                      // onChange={() => handleChangeToken(TOKEN_A_CONTRACT_ADDRESS)}
                      // disabled={true}
                    >
                      <MenuItem value={tokens[_token]?.address}>
                        {tokens[_token]?.name || "-"}
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <br />
                  <div>
                    <Typography color="green" style={{ paddingTop: "5px" }}>
                      Total Supply: {tokens[_token]?.totalSupply || "-"}
                    </Typography>
                    <Typography style={{ fontSize: "8px" }}>
                      {_token}
                    </Typography>
                    <br />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <TextField
                        onChange={(e) => handleChangeWalletAddress(e, _token)}
                        id="outlined-basic"
                        label="Wallet Address"
                        variant="outlined"
                        value={walletAddress[_token]}
                        InputProps={{
                          endAdornment:
                            walletAddress[_token]?.length > 0 ? (
                              <IconButton
                                onClick={() => handleClearWalletAddress(_token)}
                              >
                                <Close style={{ fontSize: "20px" }} />
                              </IconButton>
                            ) : null,
                        }}
                      />
                      {walletAddress[_token]?.length > 0 &&
                        balance[_token]?.length > 0 && (
                          <Typography
                            color="green"
                            style={{ paddingTop: "5px" }}
                          >
                            Balance: {balance[_token]}
                          </Typography>
                        )}
                      <Button
                        style={{
                          marginTop: "10px",
                          fontSize: "12px",
                        }}
                        variant="contained"
                        size="small"
                        // disabled={isLoading}
                        disabled={
                          walletAddress[_token].length === 0 || waiting[_token]
                        }
                        onClick={() => handleBalanceOf(_token)}
                        endIcon={
                          loadingTokens[_token].isLoadingBalance ? (
                            <CircularProgress
                              size={14}
                              style={{ color: "#fff" }}
                            />
                          ) : (
                            ""
                          )
                        }
                      >
                        {waiting[_token] ? "Waiting..." : "Check Balance"}
                      </Button>
                    </div>
                    {/* {walletAddress[_token]?.length > 0 &&
                  balance[_token]?.length > 0 && (
                    <Typography color="green" style={{ paddingTop: "5px" }}>
                      Balance: {balance[_token]}
                    </Typography>
                  )} */}
                    <br />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <TextField
                        onChange={(e) => handleChangeToAddress(e, _token)}
                        id="outlined-basic"
                        label="To Address"
                        variant="outlined"
                        placeholder="0x1234.."
                        value={toAddress[_token]}
                        style={{ marginBottom: "10px" }}
                        InputProps={{
                          endAdornment:
                            toAddress[_token]?.length > 0 ? (
                              <IconButton
                                onClick={() => handleClearToAddress(_token)}
                              >
                                <Close style={{ fontSize: "20px" }} />
                              </IconButton>
                            ) : null,
                        }}
                      />
                      <OutlinedInput
                        id="outlined-adornment-weight"
                        placeholder="0.0001"
                        value={exchangeAmount[_token]}
                        onChange={(e) => handleExchangeAmount(e, _token)}
                        endAdornment={
                          <InputAdornment position="end">
                            <Typography style={{ color: "green" }}>
                              ${tokens[_token]?.name}
                            </Typography>
                          </InputAdornment>
                        }
                        // style={{ width: "200px" }}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                        }}
                      />
                      <Button
                        style={{
                          marginTop: "20px",
                          fontSize: "12px",
                        }}
                        variant="contained"
                        size="small"
                        // disabled={isLoading}
                        disabled={
                          exchangeAmount[_token].length === 0 ||
                          toAddress[_token].length === 0
                        }
                        onClick={() => transferToExchange(_token)}
                        endIcon={
                          loadingTokens[_token].isLoadingTransfer ? (
                            <CircularProgress
                              size={14}
                              style={{ color: "#fff" }}
                            />
                          ) : (
                            ""
                          )
                        }
                      >
                        Transfer
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <Card
              style={{
                padding: "20px 20px",
                display: "flex",
                flexDirection: "column",
                // justifyContent: "space-evenly",
                alignItems: "center",
                // minHeight: "65%",
                // minWidth: "40%",
              }}
            >
              <Typography>Exchange</Typography>
              <Typography style={{ fontSize: "10px" }}>
                {EXCHANGE_CONTRACT_ADDRESS}
              </Typography>
              <br />

              {Object.keys(tokens)?.map?.((token, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  {!tokens[token].addedToExchange ? (
                    <div>
                      {tokens[token].name}:{" "}
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleAddToken(token)}
                      >
                        Add
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <TextField
                        id="outlined-adornment-weight"
                        label={i === 0 ? "Sell Amount" : "Buy Amount"}
                        placeholder="0.0001"
                        value={dex[token]}
                        onChange={(e) => handleDex(e, token)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Typography style={{ color: "green" }}>
                                ${tokens[token]?.name}
                              </Typography>
                            </InputAdornment>
                          ),
                        }}
                        // style={{ width: "200px" }}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                        }}
                      />
                      <br />
                    </div>
                  )}
                </div>
              ))}
              {/* <TextField
                id="outlined-adornment-weight"
                label="Sell Amount"
                placeholder="0.0001"
                value={dex[TOKEN_A_CONTRACT_ADDRESS]}
                onChange={(e) => handleDex(e, TOKEN_A_CONTRACT_ADDRESS)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography style={{ color: "green" }}>
                        ${tokens[TOKEN_A_CONTRACT_ADDRESS]?.name}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                // style={{ width: "200px" }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              <br />
              <TextField
                id="outlined-adornment-weight"
                label="Buy Amount"
                placeholder="0.0001"
                value={dex[TOKEN_B_CONTRACT_ADDRESS]}
                onChange={(e) => handleDex(e, TOKEN_B_CONTRACT_ADDRESS)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography style={{ color: "green" }}>
                        ${tokens[TOKEN_B_CONTRACT_ADDRESS]?.name}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                // style={{ width: "200px" }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              /> */}

              <Button
                style={{
                  marginTop: "20px",
                  fontSize: "12px",
                  width: "100%",
                }}
                variant="contained"
                size="small"
                disabled={
                  dex[TOKEN_A_CONTRACT_ADDRESS].length === 0 ||
                  dex[TOKEN_B_CONTRACT_ADDRESS].length === 0 ||
                  loadingTokens[EXCHANGE_CONTRACT_ADDRESS].isLoadingTransfer ||
                  !tokens[TOKEN_A_CONTRACT_ADDRESS].addedToExchange ||
                  !tokens[TOKEN_B_CONTRACT_ADDRESS].addedToExchange
                }
                // disabled={
                //   loadingTokens[EXCHANGE_CONTRACT_ADDRESS].isLoadingTransfer
                // }
                onClick={handleTrade}
                endIcon={
                  false ? (
                    <CircularProgress size={14} style={{ color: "#fff" }} />
                  ) : (
                    ""
                  )
                }
              >
                Trade
              </Button>
              {/* </div> */}
            </Card>
          </div>
        </div>
      )}

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"You need to approve some tokens to this exchange"}
        </DialogTitle> */}
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
            }}
          >
            <strong>You need to approve some tokens to this exchange</strong>
            <br />
            <TextField
              id="outlined-adornment-weight"
              label="Approve Amount"
              placeholder="0.0001"
              value={allowedValue}
              onChange={(e) => setAllowedValue(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography style={{ color: "green" }}>
                      ${tokens[TOKEN_A_CONTRACT_ADDRESS]?.name}
                    </Typography>
                  </InputAdornment>
                ),
              }}
              // style={{ width: "200px" }}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
            <br />
          </div>
          <Button
            style={{ width: "100%" }}
            size="small"
            // color="success"
            variant="contained"
            disabled={allowedValue.length === 0}
            onClick={handleApproveTx}
          >
            Approve
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
