const router = require('express').Router();
const { Category, Product } = require('../../models');
// Error handling function
const handleErrors = (res, err) => {
  console.error(err);
  res.status(500).json(err);
};
// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      attributes: ["id", "category_name"],
      include: [{
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }]
    });
    res.json(categories);
  } catch (err) {
    handleErrors(res, err);
  }
});
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      attributes: ["id", "category_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        }
      ],
    });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    handleErrors(res, err);
  }
});
router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    handleErrors(res, err);
  }
});
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).json(updatedCategory);
  } catch (err) {
    handleErrors(res, err);
  }
});
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(`The category was removed from the database`);
  } catch (err) {
    handleErrors(res, err);
  }
});

module.exports = router;
