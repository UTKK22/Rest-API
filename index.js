const express=require('express')
const db=require('./config/db')
const Post=require('./models/Post')
const app=express()
const port =process.env.PORT||3000

db().then(()=>console.log("successfully connected to database")).catch((err)=>console.log(err))
app.use(express.json())
//to check the health of the api
app.get('/api',(req,res)=>{
    //res.send("api is working fine!")
    //but for most cases we use json file!
    res.status(200).json({message:"api is working"})
})
//fetching all the posts
app.get('/api/posts',(req,res)=>{
    Post.find().then((data)=>{
        console.log(data)
        res.status(200).json(data)
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message:err})
    })
})
//get a specific post
app.get('/api/posts/:id',(req,res)=>{
    let postid=req.params.id;
    Post.find({_id:postid}).then((data)=>{
        res.status(200).json(data)
    }).catch((err)=>{
        res.status(500).json({message:err})
    })
})
//add a new post
app.post('/api/posts/',(req,res)=>{
    let newpost=new Post({
        title:req.body.title,
        description:req.body.description
    })
    newpost.save().then((data)=>{
        res.status(200).json({message:"post created sucessfully"})
    }).catch((err)=>{
        res.status(500).json({message:err})
    })
})
//updating a post
app.put('/api/posts/:id',(req,res)=>{
    let postid=req.params.id
    let newinfo={
        title:req.body.title,
        description:req.body.description
    }
    Post.findByIdAndUpdate(postid,newinfo).then((data)=>{
        res.status(200).json({data})
    }).catch((err)=>{
        res.status(500).json({message:err})
    })
})
//deleting a specific post
app.delete('/api/posts/:id',(req,res)=>{
    let postid=req.params.id
    Post.findByIdAndDelete(postid).then(()=>{
        res.status(200).json({"messsaage":"post has been deleted"})
    }).catch((err)=>{
        res.status(500).json({message:err})
    })
})
app.listen(port,(err)=>{
    if(!err){
        console.log(`Server is running up at ${port}`)
    }
})