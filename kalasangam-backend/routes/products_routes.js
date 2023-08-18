const express = require('express');
const router = express.Router();

const DUMMY_PRODUCTS = [
    {
        id: 'p1',
        title: 'Handmade jewellery',
        description: 'some handmade jewellery made in Rajasthan',
        creator: 'u1'
    }
]

router.get('/:pid', (req,res,next)=>{
    console.log('GET Request in products');
    res.json({message: 'It works!'});
});

module.exports = router;