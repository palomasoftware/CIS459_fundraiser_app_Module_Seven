import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import FundraiserCard from './FundraiserCard'
// import getWeb3 from "./utils/getWeb3";
//import FactoryContract from "./contracts/FundraiserFactory.json";


import FactoryContractAbi from './contractsData/FundraiserFactory.json'
import FactoryAddress from './contractsData/FundraiserFactory-address.json'





import Web3 from 'web3'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));


const Home = () => {
  const [ contract, setContract] = useState(null)
  const [ accounts, setAccounts ] = useState(null)
  const [ funds, setFunds ] = useState([])
  useEffect(() => {
    init()
  }, []);

  const init = async () => {
    try {

      const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-35-87-143-12.us-west-2.compute.amazonaws.com:8545"))
      const networkId = await web3.eth.net.getId();
  //    const deployedNetwork = FactoryContract.networks[networkId];
      const accounts = await web3.eth.getAccounts();
   //   const instance = new web3.eth.Contract(
   //     FactoryContract.abi,
   //     deployedNetwork && deployedNetwork.address,
   //   );
   
       //let jsonData = require('./FundraiserFactory.json');
      // var networkKey =  Object.keys(jsonData['networks'])[Object.keys(jsonData.networks).length-1]
       //console.log(networkKey)
       //const contract = new web3.eth.Contract(VOTING_ABI);
      // const newinstance = new web3.eth.Contract(jsonData.abi);
       //newinstance.options.address = jsonData['networks'][networkId]["address"]
        const newinstance = new web3.eth.Contract(FactoryContractAbi.abi);
        newinstance.options.address = FactoryAddress.address









      setContract(newinstance)
      setAccounts(accounts)
     //   terst test  
      let name = "Beneficiary Name";
       let url  = "beneficiaryname.org";
       let imageURL = "https://placekitten.com/600/350";
       let description = "Beneficiary Description";
   //    const transaction = await newinstance.methods.createFundraiser( name, url, imageURL, description, accounts[1]).call().send({ from: accounts[0]})
    // test test 

    const funds =          await newinstance.methods.fundraisers(10, 0).call()

      setFunds(funds)
    }
    catch(error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  const displayFundraisers = () => {
    return funds.map((fundraiser) => {
      return (
        <FundraiserCard
          fundraiser={fundraiser}
          key={fundraiser}
        />
      )
    })
  }

  return (
    <div className="main-container">
      {displayFundraisers()}
    </div>
  )
}

export default Home;
