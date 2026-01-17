import api from "./api";

export const checkAuth = async () => {
  try {
    await api.get("/protected");
    return true;
  } catch {
    return false;
  }
};
