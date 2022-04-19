const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { ReviewModel, UserModel, ProductModel } = require("../models/index.js");

router.post("/:productid", validateJWT, async (req, res) => {
  const { time, booked, userName } = req.body.review;
  const productId = req.params.productid;

  const reviewEntry = {
    userName,
    time,
    userId: req.user.id,
    productId: productId,
    booked
  };
  try {
    const newReview = await ReviewModel.create(reviewEntry);
    res.status(200).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const review = await ReviewModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: UserModel,
        }
      ],
    });

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({
      message: `Failed${error}`,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const entries = await ReviewModel.findAll();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/:id", validateJWT, async (req, res) => {
  const { booked, userName} =
    req.body.review;
  const id = req.params.id;

  const query = {
    where: {
      id: id,
    },
    include: [
      {
        model: UserModel,
      },
      { model: ProductModel },
    ],
  };

  const updatedReview = {
    userName: userName,
    booked: booked,
  };

  try {
    const update = await ReviewModel.update(updatedReview, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/:id", validateJWT, async (req, res) => {
  const userId = req.user.id;
  const timeId = req.params.id;

  try {
    const query = {
      where: {
        id: timeId,
      },
    };
    await ReviewModel.destroy(query);
    res.status(200).json({ message: "Item was deleted" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
