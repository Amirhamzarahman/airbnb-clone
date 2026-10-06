

// local module
const {registeredHomes} = require('./hostRouter')

// external module
const express = require('express') 
const storeRouter = express.Router() 
const storeController = require('../controllers/storeController')

storeRouter.get('/',storeController.getIndex)
storeRouter.get('/homes',storeController.getHomes)
storeRouter.get('/bookings',storeController.getBookings)
storeRouter.get('/favourites',storeController.getFavouriteList)
storeRouter.get('/homes/:homeId',storeController.getHomeDetails)
storeRouter.post('/favourites',storeController.postAddToFavorite)
storeRouter.post('/favourites/delete/:homeId',storeController.postRemoveFromFavourite)

module.exports = storeRouter
