const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

//Dashboard that displays posts created by users
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at'
        ],
        include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                  model: User,
                  attributes: ['username']
              }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggenIn: true });
    })
    .cacth(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Edit page
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
        id: req.params.id
        },
        attributes: ['id',
                     'post_text',
                     'title',
                     'created_at'
                ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                model: User,
                attributes: ['username']
                }
        }
        ]
    })
    .then(dbPostData => {
        const post = dbPostData.get({ plain: true });
        res.render('edit-posts', { post, loggenIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//New post page
router.get('/newpost', (req, res) => {
    res.render('new-posts');
});

module.exports = router;