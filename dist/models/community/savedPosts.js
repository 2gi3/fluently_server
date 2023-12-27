import { DataTypes, Model } from "sequelize";
import sequelize from '../../../config/db.config.mjs';
import User from '../user/index.js';
import Post from './index.js';
class SavedPost extends Model {
}
SavedPost.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'User',
            key: 'id',
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Post',
            key: 'id',
        }
    },
}, {
    sequelize,
    modelName: "SavedPost",
    tableName: "user_saved_posts",
    timestamps: false,
});
export default SavedPost;
SavedPost.belongsTo(User, { foreignKey: 'userId', as: 'user' });
SavedPost.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
//# sourceMappingURL=savedPosts.js.map