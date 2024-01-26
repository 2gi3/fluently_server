// import { Model, Optional, DataTypes } from "sequelize";
// import database from '../../../config/db.config.mjs';
// import User from '../user/index.js'
// import { AudioFileT } from "../../types/index.js";
export {};
// const sequelize = database;
// interface AudioFileCreationAttributes extends Optional<AudioFileT, "id"> { }
// class AudioFile extends Model<AudioFileT, AudioFileCreationAttributes> implements AudioFileT {
//     public id!: number;
//     public userId!: number | string;
//     public audioUrl!: string;
//     public duration!: number;
//     public created_at!: Date;
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
// }
// AudioFile.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         userId: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'User',
//                 key: 'id',
//             },
//         },
//         audioUrl: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         duration: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         created_at: {
//             type: DataTypes.DATE,
//         },
//     },
//     {
//         sequelize,
//         modelName: "AudioFile",
//         tableName: "audio_files",
//         timestamps: false,
//         createdAt: 'created_at'
//     }
// );
// export default AudioFile;
//# sourceMappingURL=audioFile.js.map