//Server Creation at index.js file

// import express
 const express =require('express')

 const jwt=require('jsonwebtoken')

 const cors =require('cors')

 const dataService =require('./Services/DataService')




 //create an app using the express

 const app =express()

 app.use(express.json())

 app.use(cors({
   origin:'http://localhost:4200'
}))



 //create a port number
 

 app.listen(3000,()=>{
    console.log('listening on port 3000');
 })


 const appMiddleware=(req,res,next)=>{
   console.log('application middleware ok');

   next()
 }
 app.use(appMiddleware)

 const jwtRouterMiddleware=(req,res,next)=>{
   try{
      console.log('router middleware ok');  
   const token=req.headers['x-access-token']
   const data=jwt.verify(token,'moviekey')
   next()
   }catch{
      res.status(422).json({
         statusCode:422,
         status:false,
         message:'Please login first'
      })
   }
 }

 app.post('/register',(req,res)=>{
   dataService.register(req.body.id,req.body.username,req.body.password).then(
      result=>{
         res.status(result.statusCode).json(result)
      }
   )
   
})

 app.post('/login',(req,res)=>{
   dataService.login(req.body.id,req.body.password).then(
      result=>{
         res.status(result.statusCode).json(result)
      }
   )
})

app.get('/all-movies',(req,res)=>{
   dataService.getMovies().then(
       result=>{
           res.status(result.statusCode).json(result)
       }
   )
})

app.post('/add-to-watchlist',(req,res)=>{
   dataService.addtoWatchlist(req.body.id,req.body.Title,req.body.Poster,req.body.Type,req.body.Year).then(
       result=>{
           res.status(result.statusCode).json(result)
       }
   )
})

app.get('/getwatchlist',(req,res)=>{
   dataService.getwatchlist().then(
       result=>{
           res.status(result.statusCode).json(result)
       }
   )
})


app.delete('/deletewatch/:id',(req,res)=>{
   console.log(req.params.id);
   dataService.deletewatch(req.params.id).then(
       result=>{
           res.status(result.statusCode).json(result)
       }
   )
})


