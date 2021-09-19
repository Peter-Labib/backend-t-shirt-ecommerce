const express = require('express')

const { checkAuthUser } = require('../middleware/auth-middleware')
const reviewsController = require('../controllers/reviews-controller')

const router = express.Router()

router.use(checkAuthUser)

// pid: product id
router.post('/:pid', reviewsController.createReview)

// rid: review id
router.patch('/:rid', reviewsController.editReview)

module.exports = router
