var express = require('express');
var router = express.Router();
const { User, Member } = require('../models/')
const { isLoggedIn, isAdminLoggedIn, isNotLoggedIn } = require('./middlewares')

/* GET users listing. */
router.get('/', isLoggedIn, async (req, res, next) => {
  // res.send('respond with a resource');
  try {
    const result = await Member.update({
      once: false
    }, {
      where: { userId: req.user.id}
    })
    res.json(result)
  } catch (err) {
    console.error(err)
    next(err)
  }
});


// router.patch('/:id', isAdminLoggedIn ,async (req, res, next) => {

//   try {
//     const result = await User.update({
//       ...req.body
//     }, {
//       where: { id: req.params.id },
//       // returning: true,
//       // plain: true,
//     })
    
//     if (!result) {
//       return res.status(404).json("유저가 없습니다.")
//     }

//     res.json(result)
    
//   } catch (err) {
//     console.error(err)
//     next(err)
//   }
// });

// router.delete('/:id', isAdminLoggedIn ,async (req, res, next) => {
//   try {
//     const result = await User.destroy({
//       where: { id:req.params.id}
//     })
    
//     res.json(result)
    
//   } catch (err) {
//     console.error(err)
//     next(err)
//   }
// });

// router.post('/', async (req, res, next) => {
//   try {
//     const result = await User.create({
//       name: req.body.name,
//       arenaName: req.body.arenaName,
//       avatar: req.body.avatar,
//     })
//     res.json(result)

//   } catch (err) {
//     res.json(err)
//   }
// })


module.exports = router;
