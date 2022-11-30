const router = require("express").Router();
const BankStock = require("../models/BankStock.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
///// Metodos relacionados a lista de bancos ///////

// GET Lista de todos os bancos
router.get("/bank/list", async (req, res, next) => {
  try {
    const allModels = await BankStock.find();

    const allBanks = await allModels.filter((model) => {
      return model.name_bank;
    });

    res.status(200).json(allBanks);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST adicionar banco novo
router.post("/bank/create", async (req, res, next) => {
  try {
    const {
      logo_bank,
      name_bank,
      description_bank,
      rate_bank,
      site_bank,
      youtube_bank,
    } = req.body;
    let newBank = await BankStock.create({
      logo_bank,
      name_bank,
      description_bank,
      rate_bank,
      site_bank,
      youtube_bank,
    });
    res.status(200).json(newBank);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// GET detalhes de 1 banco em especifico
router.get("/bank/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const uniquebank = await BankStock.findById(id);
    res.status(200).json(uniquebank);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

///// Metodos relacionados a lista de ações ///////

// GET Lista de todos as ações
router.get("/stock/list", async (req, res, next) => {
  try {
    const allModels = await BankStock.find();

    /* const allStocks = await allModels.filter((model) => {
      return model.stock;
    }); */

    res.status(200).json(allModels);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// // POST adicionar ação nova
router.post("/stock/create", async (req, res, next) => {
  try {
    const { stock, close, change, sector } = req.body;
    let newStock = await BankStock.create({ stock, close, change, sector });
    res.status(200).json(newStock);
  } catch (error) {
    // This res.json acts more like a console.log, not mandatory
    console.log(error);
    res.json(error);
  }
});

// GET detalhes de 1 ação em especifico
router.get("/stock/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const uniquestock = await BankStock.findById(id);
    res.status(200).json(uniquestock);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

///// Metodos relacionados tanto a lista de bancos como ações ///////

// POST criar comentario tanto no banco como na stock
router.post("/comment/:id/:userId", async (req, res, next) => {
  try {
    const { id, userId } = req.params;

    /* const userId = req.payload._id */
    const { description_comment } = req.body;
    let newComment;
    let bankUpdated;
    //Create the comment
    if (id == "undefined") {
      newComment = await Comment.create({
        description_comment,
        userId,
      });
    } else {
      newComment = await Comment.create({
        description_comment,
        userId,
        bankStockId: id,
      });

      bankUpdated = await BankStock.findByIdAndUpdate(id, {
        $push: { comments: newComment._id },
      });
    }
    const newResult = await Comment.findById(newComment._id);

    const userUpdated = await User.findByIdAndUpdate(userId, {
      $push: { comments: newResult._id },
    });

    console.log(userUpdated);
    res.status(201).json(bankUpdated);
  } catch (error) {
    next(error);
  }
});

router.delete("/comment/:id/:userId", async (req, res, next) => {
  const { id, userId } = req.params;
  try {
    Comment.findByIdAndRemove(id);
    await User.findByIdAndUpdate(userId, {
      $pull: { comments:id },
    });
    res.status(200).json({ message: `Comment ${id} deleted!` });
  } catch (error) {
    console.log(error);
  }
});

// GET News
router.get("/news/list", async (req, res, next) => {
  try {
    const allModels = await BankStock.find();

    const allBanks = await allModels.filter((model) => {
      return model.name_bank;
    });

    res.status(200).json(allBanks);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/* router.get("/banks/search", async (req, res, next) => {
  const { query } = req.body;
  try {
    const allBanks = await BankStock.find();
    res.status(200).json(allBanks);
  } catch (error) {
    console.log(error);
  }
}); */
module.exports = router;
