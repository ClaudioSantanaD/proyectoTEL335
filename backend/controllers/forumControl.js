import {UserAqua} from '../models/userModel.js'
import { ForumPost } from '../models/forumModel.js'

export const createPost = async (req, res) => {
    const {title, content} = req.body

    try{

        let newPost = new ForumPost({title, content, author:req.user})
        await newPost.save()
        let postCreated = await ForumPost.findOne({title, author: req.user})

        let someUser = await UserAqua.findByIdAndUpdate(req.user, {$addToSet: {myPosts:postCreated._id}})

        res.json({message: "Post publicado", user: someUser.username})

    }catch(e){
        res.status(400).json({error:e.message})
    }
}

export const updatePost = async (req, res) => {

    const {oldTitle, newTitle, newContent} = req.body

    try{

        let somePost = await ForumPost.findOneAndUpdate({title: oldTitle, author: req.user}, {title: newTitle, content: newContent, updatedAt: (Date.now() - (4*60*60*1000))})
        if(!somePost) res.status(400).json({message:'No existe este post'})

        res.json({message: "Post actualizado"})

    }catch(e){
        res.status(400).json({error:e.message})
    }
}

export const deletePost = async (req, res) => {
    const {someTitle} = req.body

    try{

        let somePost = await ForumPost.findOne({title:someTitle, author:req.user})
        if(!somePost) res.status(400).json({message:'No existe este post'})
        let hisUser = await UserAqua.findByIdAndUpdate(req.user, {$pull: { myPosts: {$in: somePost._id}}})
        let deltPost = await ForumPost.findOneAndDelete({title:someTitle, author:req.user})

        res.json({message: "Se ha eliminado el post"})


    }catch(e){
        res.status(400).json({error:e.message})
        console.log(e)
    }
}

export const getUserPosts = async (req, res) => {

    try{
        
        let someUser = await UserAqua.findById(req.user)
        if(!someUser) res.status(400).json({message:'No se encuentra este usuario'})

        let userPosts = await ForumPost.find({ 'author': req.user }).sort({"updatedAt": -1})
        res.json(userPosts)

    }catch(e){
        res.status(400).json({error: e.message})
        console.log(e)
    }

}

export const getAllPosts = async (req, res) => {

    try{
    
        let allPosts = await ForumPost.find().sort({updatedAt: -1})
        res.json(allPosts)

    }catch(e){
        res.status(400).json({error: e.message})
        console.log(e)
    }

}

export const getThisPost = async (req, res) => {

    const{id} = req.params
    try{
        let somePost = await ForumPost.findById(id)
        let creator = await UserAqua.findById(somePost.author)

        res.json({
            title: somePost['title'],
            author: creator['username'],
            content: somePost['content'],
            created_in: somePost['createdAt'],
            last_modified: somePost['updatedAt']
        })
    }catch(e){
        res.status(400).json({error: e.message})
        console.log(e)
    }
}