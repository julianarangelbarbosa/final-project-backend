const {Schema, model} = require('mongoose');

const commentSchema = new Schema (
    {
        description_comment: {
            type: String,
        },
        userId: {type: Schema.Types.ObjectId, ref:"User"}
        
    },
    {timestamps:true}
);


module.exports = model('Comment', commentSchema);

