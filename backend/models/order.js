const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
       
    }, 
    quantity: {
        type: Number,
       
    },
    user: {
        type:String,
       
    },
   
   
})

module.exports = mongoose.model("Order", OrderSchema)