import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token && !config.url.includes('signup') && !config.url.includes('login')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const fetchData = async (url) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (err) {
    throw new Error(`Fetch Error: ${err.response ? err.response.data : err.message}`);
  }
};


const postData = async (url, newData) => {
  try {
    const { data } = await axiosInstance.post(url, newData);
    return data;
  } catch (error) {
    throw new Error(`Post Error: ${error.response ? error.response.data : error.message}`);
  }
};

const updateData = async (url, updatedData) => {
  try {
    const { data } = await axiosInstance.put(`${url}/${updatedData.id}`, updatedData);
    return data;
  } catch (error) {
    throw new Error(`Update Error: ${error.response ? error.response.data : error.message}`);
  }
};

const deleteData = async (url, id) => {
  try {
    const { data } = await axiosInstance.delete(`${url}/${id}`);
    return data;
  } catch (error) {
    throw new Error(`Delete Error: ${error.response ? error.response.data : error.message}`);
  }
};


export { fetchData, postData, updateData, deleteData };
