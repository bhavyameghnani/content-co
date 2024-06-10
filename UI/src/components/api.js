import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const spellCheck = (content) => api.post("/spellcheck", { content });
export const readabilityCheck = (content) =>
  api.post("/readability", { content });
// Add more API methods as needed

export default api;
