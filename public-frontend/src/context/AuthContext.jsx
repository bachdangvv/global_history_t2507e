import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

// ── Helper: parse any JWT response shape Spring Boot might return ──
function extractTokenAndUser(data) {
  // Spring Boot commonly returns: { token, username, email, role }
  // OR: { token, user: { ... } }  
  // OR: { accessToken, ... }
  const token = data?.token || data?.accessToken || null;

  // Build the user object from whatever fields exist
  let user = data?.user || null;
  if (!user && token) {
    // Flat response: { token, username, email, role, ... }
    const { token: _t, accessToken: _a, ...rest } = data;
    if (Object.keys(rest).length > 0) {
      user = rest; // { username, email, role, ... }
    }
  }

  return { token, user };
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);

      // Try to fetch the profile; if the endpoint doesn't exist, decode token instead
      api.get('/auth/me')
        .then(res => {
          const { user: u } = extractTokenAndUser(res.data);
          // /auth/me might return { user: {...} } or the user object directly
          setUser(u || res.data || null);
        })
        .catch(() => {
          // If /auth/me fails, try to keep the user from a stored object
          const stored = localStorage.getItem('user');
          if (stored) {
            try { setUser(JSON.parse(stored)); } catch { setUser(null); }
          } else {
            setUser(null);
          }
        })
        .finally(() => setLoading(false));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: tok, user: u } = extractTokenAndUser(res.data);

    if (tok) {
      setToken(tok);
      setUser(u);
      // Persist user so the avatar survives a page reload even if /auth/me fails
      if (u) localStorage.setItem('user', JSON.stringify(u));
    }

    return { token: tok, user: u, ...res.data };
  };

  const register = async (username, email, password) => {
    const res = await api.post('/auth/register', { username, email, password });
    const { token: tok, user: u } = extractTokenAndUser(res.data);

    if (tok) {
      setToken(tok);
      setUser(u);
      if (u) localStorage.setItem('user', JSON.stringify(u));
    }

    return { token: tok, user: u, ...res.data };
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
