import axios from "axios";

// Referanslar tek merkezden (backend/MongoDB) beslenir; admin panelden yönetilir.
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
let cache = null;

export const fetchReferences = () => {
  if (!cache) {
    cache = axios
      .get(`${API}/references`)
      .then((r) => r.data.items || [])
      .catch(() => []);
  }
  return cache;
};

export const referenceLogoSrc = (r) => (r.logo_url ? `${process.env.REACT_APP_BACKEND_URL}${r.logo_url}` : null);
