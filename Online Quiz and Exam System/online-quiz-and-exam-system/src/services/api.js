const BASE_URL = "http://localhost:52705/api";

// -------- AUTH --------
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

// -------- MODULES --------
export const getModules = async () => {
  const res = await fetch(`${BASE_URL}/modules`);
  return res.json();
};

// -------- QUIZ --------
export const getQuestions = async (moduleId) => {
  const res = await fetch(`${BASE_URL}/quiz/${moduleId}`);
  return res.json();
};

// -------- RESULT --------
export const saveResult = async (data) => {
  await fetch(`${BASE_URL}/result/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};
