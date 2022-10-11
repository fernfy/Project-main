module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
      nameroom: DataTypes.STRING,
      peopleroom: DataTypes.STRING
      
      
    })
    return Room
}