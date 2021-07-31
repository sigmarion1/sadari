const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const { User, sequelize } = require('../models')

const router = express.Router()

router.get('/', (req, res, next) => {
  return res.json(req.user || false)
})

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { name, password } = req.body
  try {
    const exUser = await User.findOne({ where: { name } })
    if (exUser) {
      return res.status(403).json('이미 사용 중인 이름입니다.')
    }
    const hash = await bcrypt.hash(password, 12)
    const newUser = await User.create({
      name,
      password: hash,
    })
    res.status(201).json(newUser)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      await User.update({
        "loginAt": sequelize.fn('NOW')
      }, {where:{id: user.id}})
      return res.status(200).json(
        await User.findOne({
          where: { id: user.id },
        })
      );
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router