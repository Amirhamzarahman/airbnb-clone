const Favourite = require('../models/favourites')
const Home = require('../models/home')

exports.getIndex = (req,res,next) => {
  Home.find().then(registeredHomes => {
    res.render('store/index',{registeredHomes:registeredHomes,
      pageTitle:'Air bnb home',currentPage:'index'
  })
  })
}
  
  
exports.getHomes = (req,res,next) => {
  Home.find().then(registeredHomes => {
    res.render('store/homeList',{registeredHomes:registeredHomes,
      pageTitle:'Homes List',currentPage:'home'})
  })
   }

exports.getBookings = (req,res,next) => {
    res.render('store/bookings',{
      pageTitle:'My bookings',currentPage:'bookings'})
   }

exports.getFavouriteList = (req,res,next) => {
  Favourite.find()
  .populate('houseId')
  .then(favourites => {
    favouriteHomesFiltered = favourites.map(fav => fav.houseId)
    res.render('store/favourite-list',{favouriteHomesFiltered:favouriteHomesFiltered,
      pageTitle:'favourite list',currentPage:'favourites'})
  })  
   }

exports.postAddToFavorite = (req,res,next) => {
  const homeId = req.body.id
  Favourite.findOne({ houseId:homeId}).then((fav) => {
    if(fav){
    console.log("Already in favourite",fav)
    }
    else{
      fav = new Favourite({houseId:homeId})
      fav.save().then(result => {
        console.log('Added to favourite',result)
      })
    }
    res.redirect('/user/favourites')
  }).catch(err => {
    console.log('Error while adding to favourite',err)
  })
}




exports.postRemoveFromFavourite = (req,res,next) => {
  console.log("Inside Remove Favourite something is removed from favourite")
  const homeId = req.params.homeId
  console.log(Favourite);
    Favourite.findOneAndDelete({houseId:homeId}).then(result => {
    console.log('Favourite removed',result)
  }).catch(err => {
    console.log('Error while removing from favourite',err)
  }).then( () => {
    res.redirect('/user/favourites')
  })
}

 

   exports.getHomeDetails = (req,res,next) => {
    const homeId = req.params.homeId
    console.log('homeId',homeId)
    Home.findById(homeId).then(home => {
      if(!home){
        console.log('home details',home)
        res.redirect('/user/homes')
      }
      else{
      res.render('store/homeDetails',{
      home:home,
      pageTitle:'Home Details',
      currentPage:'home'
    })}

    })

    
  
    
   }