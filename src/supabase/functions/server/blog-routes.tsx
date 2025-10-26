import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

export const blogRouter = new Hono();

// Get all blog posts
blogRouter.get('/posts', async (c) => {
  try {
    const posts = await kv.getByPrefix('blog:');
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return c.json({ success: true, posts: sortedPosts });
  } catch (error) {
    console.log('Error fetching blog posts:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get single blog post
blogRouter.get('/posts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const post = await kv.get(`blog:${id}`);
    
    if (!post) {
      return c.json({ success: false, error: 'Post not found' }, 404);
    }
    
    return c.json({ success: true, post });
  } catch (error) {
    console.log('Error fetching blog post:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create blog post
blogRouter.post('/posts', async (c) => {
  try {
    const body = await c.req.json();
    const { title, content, type, tags, link } = body;
    
    if (!title || !content || !type) {
      return c.json({ 
        success: false, 
        error: 'Title, content, and type are required' 
      }, 400);
    }
    
    const id = Date.now().toString();
    const post = {
      id,
      title,
      content,
      type, // 'conference', 'medium', 'presentation'
      tags: tags || [],
      link: link || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`blog:${id}`, post);
    
    return c.json({ success: true, post });
  } catch (error) {
    console.log('Error creating blog post:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update blog post
blogRouter.put('/posts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existingPost = await kv.get(`blog:${id}`);
    if (!existingPost) {
      return c.json({ success: false, error: 'Post not found' }, 404);
    }
    
    const updatedPost = {
      ...existingPost,
      ...body,
      id,
      createdAt: existingPost.createdAt,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`blog:${id}`, updatedPost);
    
    return c.json({ success: true, post: updatedPost });
  } catch (error) {
    console.log('Error updating blog post:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete blog post
blogRouter.delete('/posts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`blog:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting blog post:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});
