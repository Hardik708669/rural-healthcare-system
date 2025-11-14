const { DataTypes, Model } = require('sequelize');

class Encounter extends Model {
  static initModel(sequelize) {
    Encounter.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      clientUuid: { type: DataTypes.STRING }, // client-generated UUID for idempotency
      patientId: { type: DataTypes.INTEGER },
      userId: { type: DataTypes.INTEGER },
      symptomsText: DataTypes.TEXT,
      vitalsJson: DataTypes.JSON,
      attachmentsJson: DataTypes.JSON,
      aiDiagnosisJson: DataTypes.JSON,
      triageLevel: DataTypes.STRING,
      synced: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, { sequelize, modelName: 'encounter' });
  }
}

module.exports = Encounter;
