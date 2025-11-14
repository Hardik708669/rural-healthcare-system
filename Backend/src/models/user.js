const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static initModel(sequelize) {
    User.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      phone: { type: DataTypes.STRING, unique: true },
      role: { type: DataTypes.ENUM('volunteer','doctor','admin'), defaultValue: 'volunteer' },
      passwordHash: DataTypes.STRING,
      locale: DataTypes.STRING
    }, { sequelize, modelName: 'user' });

    User.beforeCreate(async (user) => {
      if (user.passwordHash) {
        const hash = await bcrypt.hash(user.passwordHash, 10);
        user.passwordHash = hash;
      }
    });
  }

  async validatePassword(password) {
    return await bcrypt.compare(password, this.passwordHash);
  }
}

module.exports = User;
