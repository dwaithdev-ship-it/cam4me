import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { postgresService } from '../services/postgresService.js';

const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await postgresService.getAllPosts();
        res.json(posts);
    } catch (error) {
        console.error('Fetch Posts Error:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// POST a new post
router.post('/', verifyToken, async (req, res) => {
    try {
        const { message, post_images, post_videos } = req.body;

        // Check if user already has a post
        const existingPost = await postgresService.getPostByUserId(req.user.id);

        let post;
        if (existingPost) {
            // Update existing post
            post = await postgresService.updatePost(existingPost.id, {
                message,
                post_images,
                post_videos
            });
        } else {
            // Create new post
            post = await postgresService.createPost({
                user_id: req.user.id,
                message,
                post_images,
                post_videos
            });
        }
        res.status(existingPost ? 200 : 201).json(post);
    } catch (error) {
        console.error('Create Post Error:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// DELETE a post
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const post = await postgresService.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Only author or admin can delete
        if (post.user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized to delete this post' });
        }

        await postgresService.deletePost(req.params.id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Delete Post Error:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

// DELETE all posts by a specific user (Admin only)
router.delete('/user/:userId', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        await postgresService.deletePostsByUserId(req.params.userId);
        res.json({ message: 'User posts deleted successfully' });
    } catch (error) {
        console.error('Delete User Posts Error:', error);
        res.status(500).json({ error: 'Failed to delete user posts' });
    }
});

export default router;
