module.exports = ( sequelize, DataTypes ) => {
    const Comment = sequelize.define('Comment', {
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      pictures: DataTypes.STRING,
      content: DataTypes.TEXT
    })
    return Comment
  }