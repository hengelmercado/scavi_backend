var mongoose = require('mongoose');

const convertirObjectId = (id = '') => {
    return mongoose.Types.ObjectId(id);
}


module.exports = {
    convertirObjectId
}