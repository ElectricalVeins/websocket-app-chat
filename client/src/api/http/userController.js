import http from './index.js';

export const getUserById = (userId) => http.get(`/user/${userId}`);

