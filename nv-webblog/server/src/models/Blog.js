module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      nroom: DataTypes.STRING,
      pnum: DataTypes.STRING,
      tel:DataTypes.STRING,
      dates: DataTypes.DATE,
      times: DataTypes.TIME,
      datee:DataTypes.DATE,
      timee: DataTypes.TIME,
      other: DataTypes.STRING
      
      
    })

    return Blog
}