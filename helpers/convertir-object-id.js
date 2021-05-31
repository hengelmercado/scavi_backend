var mongoose = require('mongoose');
//var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

const convertirObjectId = (id = '') => {
    return mongoose.Types.ObjectId(id);
}


module.exports = {
    convertirObjectId
}