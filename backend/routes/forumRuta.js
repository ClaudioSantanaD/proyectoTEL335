import {createPost, updatePost, deletePost, getAllPosts, getUserPosts, getThisPost} from '../controllers/forumControl.js'
import {verifyToken}from '../middlewares/tokenValid.js'
import express from 'express'

const router = express.Router()

router.get("/all", getAllPosts)
router.get("/byUserLoged", verifyToken, getUserPosts)
router.post("/create", verifyToken, createPost)
router.put("/update", verifyToken, updatePost)
router.delete("/delete", verifyToken, deletePost)
router.get("/byId/:id?", getThisPost)

export default router