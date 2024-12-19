import React, { useState } from 'react';
import apiService from '../services/api';
import '../App.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You must be logged in to create a post.');
      return;
    }

    try {
      await apiService.createPost({ title, content, tags }, token);
      alert('Post created successfully!');
      window.location.href = '/';
    } catch (error) {
      alert(error.response?.data?.error || 'Error creating post');
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="create-post-input"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="create-post-textarea"
      ></textarea>
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="create-post-input"
      />
      <button onClick={handleSubmit} className="create-post-button">Create Post</button>
    </div>
  );
}

export default CreatePost;