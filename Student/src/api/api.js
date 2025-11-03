import axios from "axios";

const API = axios.create({
  //baseURL: "http://127.0.0.1:8000/api", // FastAPI backend
});

// -------------------
// 🧠 Text Analysis
// -------------------
export const analyzeText = async (payload) => {
  const { data } = await API.post("/predict/text-analysis", payload);
  return data;
};

// -------------------
// ✍️ Handwriting Analysis
// -------------------
export const analyzeHandwriting = async (studentId, file) => {
  const formData = new FormData();
  formData.append("student_id", studentId);
  formData.append("file", file);
  const { data } = await API.post("/predict/handwriting-analysis", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// -------------------
// 📊 Get Final Report
// -------------------
export const getFinalReport = async (studentId) => {
  const { data } = await API.get(`/predict/final-report/${studentId}`);
  return data;
};
