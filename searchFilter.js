const express = require('express');
const HouseListing = require('./models/HouseListing');
const router = express.Router();

router.get('/filter', async (req, res) => {
    let  {
      location = '',
      minSize,
      maxSize,
      minOwnAmount,
      maxOwnAmount,
      minRentAmount,
      maxRentAmount
    } = req.query;
  
    // Convert query parameters to numbers
  minSize = Number(minSize);
  maxSize = Number(maxSize);
  minOwnAmount = Number(minOwnAmount);
  maxOwnAmount = Number(maxOwnAmount);
  minRentAmount = Number(minRentAmount);
  maxRentAmount = Number(maxRentAmount);

console.log(req.query); // Add this line for debugging
// Build the Mongoose query
  const query = HouseListing.find({
    location: new RegExp(location, 'i'),
    ...(minSize && { size: { $gte: minSize } }),
    ...(maxSize && { size: { $lte: maxSize } }),
    ...(minOwnAmount && { ownAmount: { $gte: minOwnAmount } }),
    ...(maxOwnAmount && { ownAmount: { $lte: maxOwnAmount } }),
    ...(minRentAmount && { rentAmount: { $gte: minRentAmount } }),
    ...(maxRentAmount && { rentAmount: { $lte: maxRentAmount } })
  });
  
    try {
        // console.log('Constructed query:', query.getFilter());
      // Execute the query and send the results in the response
      const houselistings = await query.exec();
      console.log('Found listings:', houselistings); // Add this line for debugging

      if(houselistings.length == 0) { 
        res.json({message: "No listings found"});
      } else {
        res.json(houselistings);
      }
      
    } catch (error) {
      console.error('Error', error);
      res.status(500).send('Server Error');
    }
  });
module.exports = router;