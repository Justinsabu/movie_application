const mongoose =require('mongoose')

mongoose.connect('mongodb://localhost:27017/Movie',{
    useNewUrlParser:true
})

const  User=mongoose.model('User',{
    id:String,
    username:String,
    password:String,
})

const Movie=mongoose.model('Movie',{
    //shema creation
    id:Number,
    Title:String,
    Poster:String,
    imdbRating:String,
    Rated:String,
    Year:String,
    Runtime:String,
    Genre:String,
    Plot:String,
    Director:String,
    Actors:String,
    Language:String,
    Type:String


})

const Watchlist=mongoose.model('wishlist',{
    id:Number,
  Title:String,
  Poster:String,
  Type:String,
  Year:String
})


module.exports={
    User,
    Movie,
    Watchlist

}