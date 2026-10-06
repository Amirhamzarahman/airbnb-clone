const Home = require('../models/home')

exports.getAddHome = (req,res,next) => {
    res.render('host/editHome',{pageTitle:'Add your home',currentPage:'add-home',editing:false})
}

exports.getEditHome = (req,res,next) => {
  const homeId =  req.params.homeId
  const editing = req.query.editing === 'true'
  Home.findById(homeId).then(home => {
    if(!home) {
      console.log('Home not found for editing')
    }
  console.log(homeId,editing,home)
    res.render('host/editHome',{home:home,pageTitle:'Add your home',currentPage:'add-home',editing:editing})
    })
}

exports.getHostHomes = (req,res,next) => {
  Home.find().then(registeredHomes => {
    res.render('host/hostHomeList',{registeredHomes:registeredHomes,
      pageTitle:'Edit Your home',currentPage:'host-homes'})
  })
   } 

exports.postAddHome =(req,res,next) => {
  const {houseName,houseLocation,housePrice,houseRating,houseUrl} = req.body
  const home = new Home({houseName,houseLocation,housePrice,houseRating,houseUrl})
  home.save().then(() => { 
    console.log('Home added successfully')
  })
    res.render('host/homeAddedSuccessfully',{pageTitle:'Home added successfully',currentPage:'Home-added-successfully'})
}

exports.postEditHome = (req,res,next) => {
  const {id,houseName,houseLocation,housePrice,houseRating,houseUrl} = req.body
  Home.findById(id).then(home => {
  home.houseName = houseName
  home.houseLocation = houseLocation
  home.housePrice = housePrice
  home.houseRating = houseRating
  home.houseUrl = houseUrl
  home.save().then(result => {
    console.log('Updated Home',result)
  }).catch(err => {
    console.log('Error while updating home',err)
  })
  res.redirect('/host/host-homes-list')
}).catch(err => {
  console.log('Error while finding home for editing',err)
 })
} 

exports.postDeleteHome = (req,res,next) => {
  const homeId = req.params.homeId
  console.log("Came to delete ",homeId)
  Home.findByIdAndDelete(homeId).then(() => { 
    res.redirect('/host/host-homes-list')
  }).catch( err => {
    console.log()
  })
    
}