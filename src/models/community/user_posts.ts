// UserPost model (user_posts.js)
import { DataTypes, Model } from "sequelize";
import sequelize from '../../../config/db.config.mjs';
import User from '../user/index.js';
import Post from './index.js';

class UserPosts extends Model { }

UserPosts.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'User', // This should match the model name for User
                key: 'id',      // This should match the primary key in the User model
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Post', // This should match the model name for User
                key: 'id',      // This should match the primary key in the User model
            }
        },
    },
    {
        sequelize,
        modelName: "UserPost",
        tableName: "user_posts",
        timestamps: false,
    }
);

export default UserPosts;

UserPosts.belongsTo(User, { foreignKey: 'userId', as: 'user' });
UserPosts.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

User.belongsToMany(Post, { through: UserPosts, foreignKey: "userId" });