const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { ProductModel, UserModel, ReviewModel } = require("../models/index.js");

router.post("/", validateJWT, async (req, res) => {
  const { date, email } =
    req.body.product;

  const productEntry = {
    date,
    email,
    userId: req.user.id,
    productId: req.body.product.productId,
  };
  try {
    const newProduct = await ProductModel.create(productEntry);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const entries = await ProductModel.findAll({
      include: [
        {
          model: UserModel,
        },
        { model: ReviewModel },
      ],
    });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const product = await ProductModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: UserModel,
        },
        { model: ReviewModel },
      ],
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: `Failed to fetch post: ${error}`,
    });
  }
});

router.put("/:id", validateJWT, async (req, res) => {
  const { description, title, price, amount, image } = req.body.product;
  const productId = req.params.id;
  const userId = req.user.id;

  const query = {
    where: {
      id: productId,
      userId: userId,
    },
  };

  const updatedProduct = {
    title: title,
    description: description,
    price: price,
    amount: amount,
    image: image,
  };

  try {
    const update = await ProductModel.update(updatedProduct, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/:id", validateJWT, async (req, res) => {
  const id = req.params.id;

  try {
    const query = {
      where: {
        id: id,
        
      },
    };
    await ProductModel.destroy(query);
    res.status(200).json({ message: "Date was deleted" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/:userId/:date", async (req, res) => {
  const id = req.params.userId;
  const date = req.params.date

  try {
    const product = await ProductModel.findOne({
      where: {
        userId: id,
        date: date
      },
      include: [
        {
          model: UserModel,
        },
        { model: ReviewModel },
      ],
    });
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: `Failed to fetch post: ${error}`,
    });
  }
});

router.get("/:userId/:email", async (req, res) => {
  const email = req.params.email;
  const userId = req.params.userId;

  try {
    const product = await ProductModel.findOne({
      where: {
        userId: userId,
        email: email,
      },
      include: [
        {
          model: UserModel,
        },
        { model: ReviewModel },
      ],
    });
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: `Failed to fetch post: ${error}`,
    });
  }
});

module.exports = router;
