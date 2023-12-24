import { DataTypes, Model } from "sequelize";
import sequelize from '../../../config/db.config.mjs';
import User from '../user/index.js';
class PostComment extends Model {
}
PostComment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Post',
            key: 'id',
        }
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
    }
}, {
    sequelize,
    modelName: "PostComment",
    tableName: "postComments",
    timestamps: false,
    createdAt: 'created_at'
});
export default PostComment;
// PostComment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
PostComment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// PostComment.hasMany(PostComments, { foreignKey: 'commentId', as: 'relatedComments' });
//# sourceMappingURL=postComment.js.map