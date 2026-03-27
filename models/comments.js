const { Schema, model } = require('mongoose');

const commentSchema=new Schema({
    content:{
        requireed:true,
        type:String,
    },
    blogId:{
        type:String,
        reuired:false,
        ref:"blog",
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }
},{timestamps:true});

const Comment=model("comment",commentSchema);

module.exports=Comment;