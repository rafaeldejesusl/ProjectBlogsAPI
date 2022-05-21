module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    categoryId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  },
  {
    timestamps: false,
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'category',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostCategory;
};