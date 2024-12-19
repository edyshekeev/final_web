import axios from 'axios';

const apiBase = 'https://run.mocky.io/v3';

const apiService = {
  // User Authentication
  login: async (email, password) => {
    const response = await axios.post(`${apiBase}/77c5859d-af3e-4e2d-abf0-e1e4799a1e86`, { email, password });
    return response.data;
  },

  register: async (username, email, password) => {
    const response = await axios.post(`${apiBase}/a1479eb3-97fa-48c9-9aee-0a64319c8565`, { username, email, password });
    return response.data;
  },

  fetchPosts: async () => {
    const response = await axios.get(`${apiBase}/2475faa8-de96-4f81-853b-529395c85d71`);
    return response.data;
  },

  fetchPost: async (postId) => {
    const response = await axios.get(`${apiBase}/42de06a2-3cb6-4b39-8962-55cd3978ea79`);
    return response.data;
  },

  createPost: async (post, token) => {
    const response = await axios.post(
      `${apiBase}/ed81e5bc-10fa-406f-8ba4-06ccff5e5a6a`,
      {
        ...post,
        tags: post.tags.split(',').map((tag) => tag.trim()),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  updatePost: async (postId, post, token) => {
    const response = await axios.put(
      `${apiBase}/d237c799-9dec-4c5c-95d4-97a5520c2831`,
      post,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  deletePost: async (postId, token) => {
    const response = await axios.delete(`${apiBase}/348b2846-cdd2-4b23-9375-012723d7ed1d`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default apiService;
