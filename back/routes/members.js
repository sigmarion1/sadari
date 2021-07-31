var express = require('express');
var router = express.Router();
const { User, Member } = require('../models/')
const { isLoggedIn, isAdminLoggedIn, isNotLoggedIn } = require('./middlewares')

/* GET users listing. */
router.get('/', isLoggedIn ,async (req, res, next) => {
  // res.send('respond with a resource');
  try {
    const members = await Member.findAll({
      where: {
        userId:req.user.id
      },
      attributes: ['id', 'name', 'status'],
    })
    res.json(members)
  } catch (err) {
    console.error(err)
    next(err)
  }
});

router.patch('/:id', isLoggedIn ,async (req, res, next) => {

  try {
    const result = await Member.update({
      ...req.body
    }, {
      where: { id: req.params.id, userId:req.user.id },
    })
    
    if (!result) {
      return res.status(404).json("멤버가 없습니다.")
    }

    res.json(result)
    
  } catch (err) {
    console.error(err)
    next(err)
  }
});

router.delete('/:id', isLoggedIn ,async (req, res, next) => {
  try {
    const result = await Member.destroy({
      where: { id:req.params.id, userId:req.user.id}
    })
    
    res.json(result)
    
  } catch (err) {
    console.error(err)
    next(err)
  }
});


router.post('/', async (req, res, next) => {
  try {
    const result = await Member.create({
      name: req.body.name,
      userId: req.user.id
    })
    res.json(result)

  } catch (err) {
    res.json(err)
  }
})


module.exports = router;
