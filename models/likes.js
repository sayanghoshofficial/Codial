const mongoogse = require('mongoose');

const likeSchema = new mongoogse.Schema({
    user:{
        type:mongoogse.Schema.ObjectId
    },
    // this define objectid of the like object
    likeable: {
        type: mongoogse.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    // this field is used for the type of the like object since this is a dynamic reference
    onModel: {
        type: String,
        require: true,
        enum: ['Post','Comment']
    }
}, {
    timestamps: true
});

const Like = mongoogse.model('Like',likeSchema);
module.exports = Like;