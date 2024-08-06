import React, { useState, useEffect, Fragment } from "react";
//import FactoryContract from "./contracts/FundraiserFactory.json";


import FactoryContractAbi from './contractsData/FundraiserFactory.json'
import FactoryAddress from './contractsData/FundraiserFactory-address.json'



//  import getWeb3 from "./utils/getWeb3";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";


import NewFundraiser from './NewFundraiser'
import Home from './Home'
//import Receipts from './Receipts'

import "./App.css";

import Web3 from 'web3'

const App = () => {
  const [state, setState] = useState({web3: null, accounts: null, contract: null});

  useEffect(() => {
    const init = async() => {
      try {
        // Get network provider and web3 instance.
        //const web3 = await getWeb3();
 	const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-35-87-143-12.us-west-2.compute.amazonaws.com:8545"))
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
//        const deployedNetwork = FactoryContract.networks[networkId];
//        const instance = new web3.eth.Contract(
//          FactoryContract.abi,
 //         deployedNetwork && deployedNetwork.address,
 //       );

	// test code
  //      let jsonData = require('./FundraiserFactory.json');
  //      var networkKey =  Object.keys(jsonData['networks'])[Object.keys(jsonData.networks).length-1] 
  //      console.log(networkKey)	
        //const contract = new web3.eth.Contract(VOTING_ABI);
        //const newinstance = new web3.eth.Contract(jsonData.abi); 
       
        const newinstance = new web3.eth.Contract(FactoryContractAbi.abi);






	      //newinstance.options.address = jsonData['networks'][networkId]["address"]        i
	  newinstance.options.address = FactoryAddress.address 



        // Set web3, accounts, and contract to the state, and then proceed with an
       let name = "Beneficiary Name";
       let url  = "beneficiaryname.org";
       let imageURL = "https://placekitten.com/600/350";
       let description = "Beneficiary Description";
     //  const transaction = await newinstance.methods.createFundraiser( name, url, imageURL, description, accounts[1]).send({ from: accounts[0]}).call(console.log)


	      setState({web3, accounts, contract: newinstance});

      } catch(error) {
        // Catch any errors for any of the above operations.
        alert(
          `(App.js) Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    init();
  }, []);

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

  const runExample = async () => {
    const { accounts, contract } = state;
  };
//
//
//
//      <Routes>
//        <Route path="/" exact element={<Home/>} />
//        <Route path="/new/" element={<NewFundraiser/>} />
//        <Route path="/receipts" element={<Receipts/>} />
//      </Routes>
  return (
    <div>
     <Router>
      <Fragment> 
        <AppBar position="static" color="default" style={{ margin: 0 }}>
          <Toolbar>
           <Typography variant="h6" color="inherit">
             <NavLink className="nav-link" to="/">Home</NavLink>
           </Typography>
           <NavLink className="nav-link" to="/new/">New</NavLink>
          </Toolbar>
         </AppBar>
   <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/new/" element={<NewFundraiser/>} />
      </Routes>





	  </Fragment>
  </Router> 
 </div>
  )
}


export default App;
