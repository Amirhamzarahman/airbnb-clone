const mongoose = require('mongoose')
const favourite = require('./favourites')


const homeSchema = mongoose.Schema({
  houseName : {type:String, required:true},
  houseLocation : {type:String, required:true},
  housePrice : {type:Number, required:true},
  houseUrl : {type:String, required:true},
  houseRating : {type:Number, required:true},
})

  homeSchema.pre('findOneAndDelete', async function() {
  console.log('Came to pre hook while deleting a home');
  const homeId = this.getQuery()._id;
  await favourite.deleteMany({houseId: homeId});
  
});


module.exports = mongoose.model('Home',homeSchema)