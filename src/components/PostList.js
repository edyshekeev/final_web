import React, { useEffect, useState } from 'react';
import apiService from '../services/api';
import { Link } from 'react-router-dom';
import '../App.css';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await apiService.fetchPosts();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list-container">
      <h2>All Posts</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.postId} className="post-item">
            <Link to={`/posts/${post.postId}`} className="post-link">{post.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/posts/create" className="create-post-link">Create a New Post</Link>
    </div>
  );
}

export default PostList;