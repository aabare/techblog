const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//User can make any post
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//Posts can only belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//Comments can only belong to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

//Comments can only belong to one post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

//Users can make many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

//Users can make any post
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };