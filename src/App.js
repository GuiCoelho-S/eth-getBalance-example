/* eslint-disable react-hooks/exhaustive-deps */
import './style.scss';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

function App() {

  //const url = 'https://www.zastrin.com/tutorials/build-an-ethereum-dapp-using-ethersjs'
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  
  // andress deployed at Rinkeby
  var daiAdress = '0x00aBe16886439cEbA14d258326e814eA3790007f';
  
  var daiAbi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  var daiContract = new ethers.Contract(daiAdress, daiAbi, provider)

  const [accountEth, setAccountEth ] = useState();
  const [balance, setBalance ] = useState();

  
  async function getAccount(){

    await provider.send('eth_requestAccounts', [])

    .then(async() => {
      let userAdress = await signer.getAddress()
      setAccountEth(userAdress)
    })
    
  }


  async function getBalance(adress){
      let balanceHex = await daiContract.balanceOf(adress)
      
      let balanceEth = ethers.utils.formatEther(balanceHex);
      
      setBalance(balanceEth);
  } 

  return (
   <div className='Container'>
     <main className='MetamaskSession'>
       <h1>Metamask</h1>
       <button
       onClick={
         () => {
           getAccount()
         }
       }
       >Logar com MetaMask</button>
       <p>endereço: <br></br>{accountEth}</p>
       <button onClick={() => {
         getBalance(accountEth)
         
       }}>Get Balance</button>
       <p>balance: {balance} ETH</p>
     </main>
   </div>
  );
}

export default App;
