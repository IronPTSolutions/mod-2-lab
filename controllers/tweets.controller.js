const Tweet = require('../models/tweet.model');

exports.create = (req, res) => {
  res.render('tweets/create'); 
};

exports.doCreate = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.session.user._id; 

    const newTweet = new Tweet({ message, user: userId });
    await newTweet.save();

    res.redirect('/dashboard'); 
  } catch (error) {
    console.error('Error creating tweet:', error);
    res.redirect('/tweets/create'); 
  }
};

exports.showCreateForm = (req, res) => {
  res.render('tweets/create');
};

exports.createTweet = (req, res) => {
  const currentUser = req.session.user;

  const content = req.body.content;

  const newTweet = new Tweet({
      content: content,
      user: currentUser._id, 
      createdAt: new Date(),
  });

  newTweet.save((err) => {
      if (err) {
          console.error(err);
          res.send('Error al crear el tweet.');
      } else {
          res.redirect('/tweets');
      }
  });
};



exports.listTweets = (req, res) => {
  Tweet.find({})
      .populate('user') 
      .sort({ createdAt: -1 }) 
      .exec((err, tweets) => {
          if (err) {
              console.error(err);
              res.send('Error al obtener los tweets.');
          } else {
              res.render('tweets/list', { tweets });
          }
      });
};