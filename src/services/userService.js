import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const userService = {
  async getUsers() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async createUser(user) {
    const response = await axios.post(API_URL, user);
    return response.data;
  },

  async updateUser(id, user) {
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data;
  },

  async deleteUser(id) {
    await axios.delete(`${API_URL}/${id}`);
  }
}; 