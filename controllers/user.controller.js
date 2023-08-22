const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.create = (req, res) => {
  res.render("registration-form"); 
};

exports.doCreate = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hashedPassword => {
      const newUser = new User({ name, email, password: hashedPassword });
      return newUser.save();
    })
    .then(() => {
      res.redirect("/login"); 
    })
    .catch(error => {
      console.error("Error creating user:", error);
      res.render("registration-form", { error: "Error al crear el usuario" });
    });
};

exports.login = (req, res) => {
    res.render("login-form"); 
  };
  
  exports.doLogin = (req, res) => {
    const { password, email } = req.body;
  
    User.findOne({ email })
    .then(user => {
      if (!user) {
        throw new Error('User not found');
      }
      return bcrypt.compare(password, user.password)
        .then(passwordsMatch => {
          if (passwordsMatch) {
            req.session.user = user; 
            res.redirect('/home'); 
          } else {
            res.redirect('/login'); 
          }
        });
    })
    .catch(error => {
      console.error('Error logging in:', error);
      res.redirect('/login'); 
    });
  };

