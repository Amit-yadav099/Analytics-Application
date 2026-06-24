import axios from 'axios';

const API= axios.create({
    baseURL:'http://localhost:5000/api'
});

export const getSessions=()=> API.get('/sessions');


export const getSessionEvents=(sessionId)=>API.get(`/sessions/${sessionId}/events`);

export const getHeatmap = (pageUrl) => API.get(`/sessions/heatmap?pageUrl=${encodeURIComponent(pageUrl)}`);