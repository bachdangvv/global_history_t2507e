import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Đăng nhập Global History</h1>
        
        <div className="auth-card">
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Tên đăng nhập</label>
              <div className="input-with-icon">
                <span className="icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input type="text" placeholder="" />
              </div>
            </div>
            
            <div className="form-group">
              <label>Mật khẩu</label>
              <div className="input-with-icon">
                <span className="icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                </span>
                <input type="password" placeholder="••••••••••" />
              </div>
            </div>
            
            <div className="form-actions">
              <a href="#" className="forgot-password">Quên mật khẩu?</a>
              <button type="submit" className="submit-btn">Đăng nhập</button>
            </div>
          </form>
          
          <div className="auth-footer">
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay.</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
