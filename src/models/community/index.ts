import { BelongsToGetAssociationMixin, DataTypes, Model } from "sequelize";
import sequelize from '../../../config/db.config.mjs';
import User from '../user/index.js';
import Chatroom from './index.js';
import { PostT } from "../../types/community.js";
import PostComment from "./postComment.js";
import PostComments from "./post_comments.js";
import SavedPost from "./savedPosts.js";

class Post extends Model<PostT> {
    public id?: number;
    public userId: number | string;
    public title: string;
    public body: string | null;
    public image: string | null | undefined;
    public type: 'question' | 'moment';
    public topic: string | null;
    public status?: 'open' | 'closed' | null;
    public created_at: Date;
    // public getUser!: BelongsToGetAssociationMixin<User>;
}

Post.init(
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
    },
    {
        sequelize,
        modelName: "Post",
        tableName: "posts",
        timestamps: false,
        createdAt: 'created_at'
    }
);

export default Post;

Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Post.hasMany(PostComment, { foreignKey: 'postId', as: 'comments' });

