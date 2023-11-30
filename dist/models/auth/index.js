import { DataTypes, Model } from "sequelize";
import database from '../../../config/db.config.mjs';
const sequelize = database;
class RefreshToken extends Model {
}
RefreshToken.init({
    token: {
        type: DataTypes.STRING(350),
        primaryKey: true,
    },
}, {
    sequelize,
    tableName: 'refresh_tokens',
    modelName: 'RefreshToken',
    timestamps: false,
    underscored: true,
});
export default RefreshToken;
// import { Sequelize, DataTypes, Model } from "sequelize";
// import database from '../../../config/db.config.mjs';
// const sequelize = database;
// class Token extends Model<string> {
//   public token: string;
// }
// Token.init(
//   {
//     id: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: "user",
//     tableName: "users",
//     timestamps: false,
//   }
// );
// export default Token;
//# sourceMappingURL=index.js.map