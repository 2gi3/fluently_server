import { BelongsToGetAssociationMixin, DataTypes, Model } from "sequelize";
import sequelize from '../../../config/db.config.mjs';
import User from '../user/index.js';
import Chatroom from './index.js';
import { CommentT } from "../../types/community.js";
import Post from "./index.js";
import PostComments from "./post_comments.js";


class PostComment extends Model<CommentT> {
    id?: number
    userId: string | number
    postId: string | number
    body: string | null;
    created_at?: Date
    // public getUser!: BelongsToGetAssociationMixin<User>;
}

PostComment.init(
    {
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
    },
    {
        sequelize,
        modelName: "PostComment",
        tableName: "postComments",
        timestamps: false,
        createdAt: 'created_at'
    }
);

export default PostComment;

// PostComment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
PostComment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// PostComment.hasMany(PostComments, { foreignKey: 'commentId', as: 'relatedComments' });
