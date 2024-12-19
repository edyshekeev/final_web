// 5. components/PostDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/api';
import '../App.css';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const data = await apiService.fetchPost(id);
      setPost(data);
    };

    fetchPost();
  }, [id]);

  const handleComment = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You must be logged in to comment.');
      return;
    }

    try {
      await apiService.addComment(id, comment, token);
      alert('Comment added successfully!');
      setComment('');
      const data = await apiService.fetchPost(id);
      setPost(data);
    } catch (error) {
      alert(error.response?.data?.error || 'Error adding comment');
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail-container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <h3>Comments</h3>
      <ul className="comment-list">
        {post.comments?.map((comment) => (
          <li key={comment.commentId} className="comment-item">{comment.content}</li>
        ))}
      </ul>
      <textarea
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="comment-textarea"
      ></textarea>
      <button onClick={handleComment} className="comment-button">Add Comment</button>
    </div>
  );
}

export default PostDetail;