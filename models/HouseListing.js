const mongoose = require('mongoose');
const houselistingSchema = new mongoose.Schema({
    location: String,
    title: String,
    size: Number,
    ownAmount: Number,
    rent: Number,
    star: Number,
    semiFurnished: Boolean,
})
const HouseListing = mongoose.model('HouseListing', houselistingSchema);
module.exports = HouseListing;