
const {Schema, model} = require('mongoose');

const bankStockSchema = new Schema(
    {
        name_bank: {
            type: String,
            require: true,
        },
        description_bank: {
            type: String,
        },
        rate_bank: {
            type: String,
        },
        site_bank: {
            type: String,
        },
        youtube_bank: {
            type: String,
        },
        stock: {
            type: String,
        },
        close: {
            type: Number,
        },
        change: {
            type: Number,
        },
        sector: {
            type: String,
        },
        comments: [{type: Schema.Types.ObjectId, ref:"Comment"}]
    },
        {timestamps:true}
    );
    
    module.exports = model('BankStock', bankStockSchema);