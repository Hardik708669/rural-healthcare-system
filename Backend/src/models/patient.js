const { DataTypes, Model } = require('sequelize');

class Patient extends Model {
  static initModel(sequelize) {
    Patient.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: DataTypes.STRING,
      dob: DataTypes.DATEONLY,
      gender: DataTypes.ENUM('male','female','other'),
      village: DataTypes.STRING,
      primaryContact: DataTypes.STRING,
      identifiersJson: DataTypes.JSON
    }, { sequelize, modelName: 'patient' });
  }
}

module.exports = Patient;
