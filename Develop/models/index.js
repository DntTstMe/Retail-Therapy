// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('../../../13/fantastic-umbrella/Develop/models/Tag');
const ProductTag = require('../../../13/fantastic-umbrella/Develop/models/ProductTag');

// Products belongsTo Category
Product.belongsTo(Category);

// Categories have many Products
Category.hasMany(Product);

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    foreignKey: 'product_id'
  }
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through:{
    model: ProductTag,
    foreignKey: 'tag_id'
  }
})


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
