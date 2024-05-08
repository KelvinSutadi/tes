const culinary = require('./culinary');
const sights = require('./sights');
const user = require('./users')

const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({message: "Hello World"}).status(200)
})



router.use("/user", user)
router.use("/sight", sights)
router.use("/culinary", culinary)

// auth
// buat nanti reviews

module.exports = router
