const jwt=require('jsonwebtoken')

const db=require('./db')

const register=(id,username,password)=>{
    return db.User.findOne({id}).then(
      user=>{
        if(user){
          return{
            status:false,
            statusCode:401,
            message:" user already exists "
          }
        }else{
          const newUser= new db.User({
            id:id,
            username:username,
            password:password,
          })
          newUser.save()// to save new data to mongdb
          return{
            status:true,
            statusCode:200,
            message:"register successful"
          }
        }
      }
    )

    
  }

  const login=(id,password)=>{
    return db.User.findOne({id,password}).then(
      user=>{
        if(user){
          currentUser=user.username
          console.log(user.username);
          currentId=id
          const token= jwt.sign({currentId:id},'moviekey')
          return  {
            status:true,
            statusCode:200,
            message:"login successful",
            token:token,
            currentId:id,
            currentUser:user.username
    
          }
        }
        else{
          return  {
            status:false,
            statusCode:402,
            message:" Invalid User details"
    
          }
        }
      }
    )
  }

  const getMovies = () => {
    return db.Movie.find().then(
        (result) => {
            if (result) {
                return {
                    status: true,
                    statusCode: 200,
                    movies: result

                }
            } else {
                return {
                    status: false,
                    statusCode: 402,
                    message: 'Movie not found'
                }
            }
        }
    )
}
const addtoWatchlist = (id, Title, Poster, Type, Year) => {

  return db.Watchlist.findOne({ Title }).then(
      (result) => {
          if (result) {
              return {
                  status: false,
                  statusCode: 402,
                  message: 'Movie already added'
              }
          } else {
              const newmovie = new db.Watchlist({
                  id, Title, Poster, Type, Year
              })
              newmovie.save()
              return {
                  status: true,
                  statusCode: 200,
                  message: 'Movie added successfully'

              }

          }
      }
  )
}

const getwatchlist = () => {
  return db.Watchlist.find().then(
      (result) => {
          if (result) {
              return {
                  status: true,
                  statusCode: 200,
                  movies: result

              }
          } else {
              return {
                  status: false,
                  statusCode: 402,
                  message: 'Watchlist is empty'
              }
          }
      }
  )
}

const deletewatch=(Title)=>{
  return db.Watchlist.deleteOne({Title}).then(
      (result)=>{
          if (result){
              return{
                  status:true,
                  statusCode:200,
                  message:'Movie removed successfully'

              }
          } 
          else{
              return{
                  status:false,
                  statusCode:402,
                  message:'Movie not found'
              }
          }

      }
  )
}



  module.exports={
    register,
    login,
    getMovies,
    deletewatch,
    getwatchlist,
    addtoWatchlist
    
  }
