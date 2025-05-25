// src/api/api.js

const Projects_URL = 'https://nguyenminhtam.onrender.com/api/Projects'; // Địa chỉ API của bạn
const Projects_URL_2 = 'https://localhost:7218/api/Projects'; // Địa chỉ API của bạn
export const fetchProjects = async () => {
    try {
        const response = await fetch(Projects_URL_2);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error; // Ném lại lỗi để xử lý ở nơi gọi
    }
};

export const formatMonthYear = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'numeric', year: 'numeric' });
};

const Certificates_URL = 'https://nguyenminhtam.onrender.com/api/Certificates/';

export const fetchCertificates = async () => {
    try {
        const response = await fetch(Certificates_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error; // Ném lại lỗi để xử lý ở nơi gọi
    }
};

export const formatYear = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { year: 'numeric' });
};