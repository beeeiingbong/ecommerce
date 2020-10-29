const User = require("../models/user");
const braintree = require('braintree')
require('dotenv').config()



const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: 'cnnszv39wj3t98zt',
    publicKey: 'qkcpqnfydv3vm49s',
    privateKey: '2862913b53812fc0c392f150b47a5df1'

})

exports.generateToken = (req, res) => {

    gateway.clientToken.generate({}, function(err, response){
        if(err){
            res.status(500).send(err)
        }
        else{
            res.send(response)
        }
    })

}

exports.processPayment = (req,res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    //charge
    let newTransaction = gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (error, result)=> {

        if(error){
            res.status(500).json(error)
        }

        else{
            res.json(result)
        }
    })
}