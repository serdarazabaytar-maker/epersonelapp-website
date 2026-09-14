import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { LOGOS } from "@/data/site";
import { API, TOKEN_KEY, formatApiErrorDetail } from "./adminApi";

export const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email, password }, { withCredentials: true });
      localStorage.setItem(TOKEN_KEY, data.access_token);
      onLogin(data.user);
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-5" data-testid="admin-login">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-line bg-white p-8 shadow-[0_24px_80px_rgba(16,17,16,0.08)]"
      >
        <img src={LOGOS.epersonel} alt="Epersonel" className="h-7 w-auto object-contain" />
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink">Yönetim Paneli</h1>
        <p className="mt-1 text-sm text-mute">Devam etmek için giriş yapın.</p>
        <div className="mt-7 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink" htmlFor="admin-email">E-posta</label>
            <input
              id="admin-email"
              data-testid="admin-login-email-input"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-line px-4 py-3 text-[15px] focus:border-ink focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink" htmlFor="admin-password">Şifre</label>
            <input
              id="admin-password"
              data-testid="admin-login-password-input"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-line px-4 py-3 text-[15px] focus:border-ink focus:outline-none"
            />
          </div>
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600" role="alert" data-testid="admin-login-error">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Giriş Yap"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};
