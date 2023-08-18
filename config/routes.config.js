const express = require('express')
const router = express.Router();
const user = require('../controllers/users.controller')
const tweet = require('../controllers/tweets.controller')

//crud users
router.get('/users/new', user.create)
router.post('/users/create', user.doCreate)
router.get("/login", user.login)
router.post("/login", user.doLogin)

//crud posts
router.get('/tweets/new', tweet.create)
router.post('/tweets/create', tweet.doCreate)
router.get('/tweets', tweet.list)



router.get('/', (req, res) => {
    res.render('Home')
})

module.exports = router;




