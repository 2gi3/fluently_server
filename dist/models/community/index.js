import { DataTypes, Model } from "sequelize";
import sequelize from '../../../config/db.config.mjs';
import User from '../user/index.js';
import PostComment from "./postComment.js";
class Post extends Model {
}
Post.init({
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
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM('question', 'moment'),
        allowNull: false,
    },
    topic: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('open', 'closed'),
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
    }
}, {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    timestamps: false,
    createdAt: 'created_at'
});
export default Post;
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Post.hasMany(PostComment, { foreignKey: 'postId', as: 'comments' });
//# sourceMappingURL=index.js.map