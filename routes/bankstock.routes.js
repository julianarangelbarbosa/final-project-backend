const router = require('express').Router();
const BankStock = require('../models/BankStock.model');
const Comment = require('../models/Comment.model');

// GET bank list

router.get('/bank-list', async (req, res, next) => {
    try {
      const allbank = await BankStock.find();
      res.status(200).json(allbank);
} catch (error) {
    console.log(error);
    next(error);
}
});

// POST bank list

router.post('/bank-list', async(req, res, next)=> {
    try {
        const {name_bank, description_bank, rate_bank, site_bank, youtube_bank } = req.body
        let newBank = await BankStock.create({name_bank, description_bank, rate_bank, site_bank, youtube_bank})
        res.status(200).json(newBank);
} catch (error) {
    console.log(error);
    res.json(error);
}
});


// GET bank id

router.get('/bank/:id', async(req, res, next) => {
    try {
         const {id} = req.params;        
         const uniquebank = await BankStock.findById(id);
         res.status(200).json(uniquebank);
    }catch (error) {
        console.log(error);
     next(error);
 }
 });

// POST bank id - create comment
router.post('/bank/:id', async (req, res, next) =>{
    try {
    //const {id} = req.params;
    const {description_comment} = req.body;

    //Create the comment
    
    const newComment = await Comment.create({description_comment});

    await Comment.findByIdAndUpdate({$push: {comment: newComment._id}});

    res.status(201).json(newComment);

} catch (error) {
        next(error);
    }

});



// GET stock list

 router.get('/stock-list', async (req, res, next) => {
    try {
      const allstock = await BankStock.find();
      res.status(200).json(allstock);
    } catch (error) {
    console.log(error);
    next(error);
}
});

// POST stock list

router.post('/stock-list', async(req, res, next)=> {
    try {
        const {stock, close, change, sector } = req.body
        let newStock = await BankStock.create({stock, close, change, sector})
        res.status(200).json(newStock);
} catch (error) {
    // This res.json acts more like a console.log, not mandatory
    console.log(error);
    res.json(error);
}
});


// GET stock id
router.get('/stock/:id', async(req, res, next) => {
    try {
         const {id} = req.params;
 
         // const {id} = req.params.id
         
         const uniquestock = await BankStock.findById(id);
         res.status(200).json(uniquestock);
         
 
    }catch (error) {
    console.log(error);
    next(error);
 }
 });

// POST stock id
// POST stock id - create comment
router.post('/stock/:id', async (req, res, next) =>{
    try {
    //const {id} = req.params;
    const {description_comment} = req.body;

    //Create the comment
    
    const newComment = await Comment.create({description_comment});

    await Comment.findByIdAndUpdate({$push: {comment: newComment._id}});

    res.status(201).json(newComment);

} catch (error) {
        next(error);
    }

});


 module.exports = router;
