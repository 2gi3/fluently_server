// UserPost model (user_posts.js)
import { DataTypes, Model } from "sequelize";
import sequelize from '../../../config/db.config.mjs';
import Post from './index.js';
import PostComment from "./postComment.js";
class PostComments extends Model {
}
PostComments.init({
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Post',
            key: 'id',
        }
    },
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'PostComment',
            key: 'id',
        }
    },
}, {
    sequelize,
    modelName: "PostComments",
    tableName: "post_comments",
    timestamps: false,
});
export default PostComments;
PostComments.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
PostComments.belongsTo(PostComment, { foreignKey: 'commentId', as: 'comment' });
// PostComments.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
// PostComments.belongsTo(PostComment, { foreignKey: 'commentId', targetKey: 'id', as: 'relatedComment' });
//# sourceMappingURL=post_comments.js.map