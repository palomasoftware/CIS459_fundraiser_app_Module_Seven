import React, { useState, useEffect } from "react";
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
//import getWeb3 from "./utils/getWeb3";
//import FactoryContract from "./contracts/FundraiserFactory.json";


import FactoryContractAbi from './contractsData/FundraiserFactory.json'
import FactoryAddress from './contractsData/FundraiserFactory-address.json'





import Web3 from 'web3'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

const NewFundraiser = () => {
const [labelWidth, setLabelWidth] = React.useState(0);
const labelRef = React.useRef(null);
const classes = useStyles();
const [ web3, setWeb3 ] = useState(null)

useEffect(() => {
  const init = async() => {
    try {
 //     const web3 = await getWeb3();
 
      alert('new i am in the NewFundraiser.js module')
const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-35-87-143-12.us-west-2.compute.amazonaws.com:8545"))

    //  const networkId = await web3.eth.net.getId();
    //  const deployedNetwork = FactoryContract.networks[networkId];
      const accounts = await web3.eth.getAccounts();
    //  const instance = new web3.eth.Contract(
    //    FactoryContract.abi,
    //    deployedNetwork && deployedNetwork.address,
    //  );
       const newinstance = new web3.eth.Contract(FactoryContractAbi.abi);
              //newinstance.options.address = jsonData['networks'][networkId]["address"]        i
      newinstance.options.address = FactoryAddress.address


      setWeb3(web3)
     // setContract(instance)
      setContract(newinstance)
      setAccounts(accounts)

    } catch(error) {
      alert(
        `   (NewFundraiser.js)    Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }
  init();
}, []);

const [ name, setFundraiserName ] = useState(null)
const [ website, setFundraiserWebsite ] = useState(null)
const [ description, setFundraiserDescription ] = useState(null)
const [ image, setImage ] = useState(null)
const [ address, setAddress ] = useState(null)
const [ contract, setContract] = useState(null)
const [ accounts, setAccounts ] = useState(null)

const handleSubmit = async () => {


     const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-35-87-143-12.us-west-2.compute.amazonaws.com:8545"))

	const imageURL = image
  const url = website
  const beneficiary = address
  const currentUser = await web3.currentProvider.selectedAddress
  const accounts2  = await web3.eth.getAccounts()
  const networkId = await web3.eth.net.getId();
  //let jsonData = require('./FundraiserFactory.json');
  //var networkKey =  Object.keys(jsonData['networks'])[Object.keys(jsonData.networks).length-1] 
  //console.log(networkKey)	
  //const contract = new web3.eth.Contract(VOTING_ABI);
  //const newinstance = new web3.eth.Contract(jsonData.abi); 
  //newinstance.options.address = jsonData['networks'][networkId]["address"]

  const newinstance = new web3.eth.Contract(FactoryContractAbi.abi);
              //newinstance.options.address = jsonData['networks'][networkId]["address"]        i
  newinstance.options.address = FactoryAddress.address




  alert('just before the submission!!!!')
  console.log("newinstance", newinstance) 
  console.log("name",name)
  console.log("url",url)
  console.log("imageURL",imageURL)
  console.log("description",description)
  console.log("beneficiary", beneficiary)
  console.log("accounts2[0]", accounts2[0])
  console.log("newinstance.options.address", newinstance.options.address ) 
 //      const transaction = await newinstance.methods.createFundraiser(
  

	const transaction = await newinstance.methods.createFundraiser( name, url, imageURL, description, accounts2[1]).send({ from: accounts2[0], gas : 3000000 })
//	(
//    name,
//    url,
//    imageURL,
//    description,
//    accounts2[1] 
//  ).send({ from: accounts2[0] }).call(console.log)

  alert('Successfully created fundraiser')
}

  return (
    <div className="create-fundraiser-container">
      <h2>Create A New Fundraiser</h2>

      <label>Name</label>
      <TextField
        id="outlined-bare"
        className={classes.textField}
        placeholder="Fundraiser Name"
        margin="normal"
        onChange={(e) => setFundraiserName(e.target.value)}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
      />

      <label>Website</label>
      <TextField
        id="outlined-bare"
        className={classes.textField}
        placeholder="Fundraiser Website"
        margin="normal"
        onChange={(e) => setFundraiserWebsite(e.target.value)}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
      />

      <label>Description</label>
      <TextField
        id="outlined-bare"
        className={classes.textField}
        placeholder="Fundraiser Description"
        margin="normal"
        onChange={(e) => setFundraiserDescription(e.target.value)}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
      />

      <label>Image</label>
      <TextField
        id="outlined-bare"
        className={classes.textField}
        placeholder="Fundraiser Image"
        margin="normal"
        onChange={(e) => setImage(e.target.value)}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
      />

      <label>Address</label>
      <TextField
        id="outlined-bare"
        className={classes.textField}
        placeholder="Fundraiser Ethereum Address"
        margin="normal"
        onChange={(e) => setAddress(e.target.value)}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
      />

      <Button
        onClick={handleSubmit}
        variant="contained"
        className={classes.button}>
        Submit
      </Button>
    </div>
  )
}


export default NewFundraiser;
