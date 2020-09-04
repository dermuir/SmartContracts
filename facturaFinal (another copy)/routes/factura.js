var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var ethers = require('ethers');
var config = require("../config");

var ethProvider= new ethers.providers.InfuraProvider("ropsten","c0cc50eb813248fe869e2ef0a91e54da");
var wallet = new ethers.Wallet(config.ethereum.privateKey,ethProvider);
var contract_sign = new ethers.Contract(config.ethereum.contractAddress, config.ethereum.abi,wallet);

router.post("/",function(req,res){
    console.log("Peticion post");
    var resulst=[];
    try{
            
    }catch(error){

        results.push({
            result: "ERROR",
            error: error
        });
        console.log(error);
        res.status(500).send(results); 
    }

});

router.get("/", function(req, res) {

    res.status(200).send("Hola Ethereum"); 

});
module.exports = router;