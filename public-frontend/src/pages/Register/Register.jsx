import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Tạo tài khoản mới</h1>
        
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
              <label>Email</label>
              <div className="input-with-icon">
                <span className="icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input type="email" placeholder="" />
              </div>
            </div>
            
            <div className="form-group">
              <label>Mật khẩu</label>
              <input type="password" placeholder="" className="standard-input" />
            </div>
            
            <div className="form-group">
              <label>Xác nhận mật khẩu</label>
              <input type="password" placeholder="" className="standard-input" />
            </div>
            
            <p className="auth-disclaimer">
              Việc tạo tài khoản cho phép bạn gửi và chỉnh sửa bài viết. 
              <br/>
              Cùng với việc đăng ký, bạn đã đồng ý với <a href="/">Chính sách của Global History</a> trước khi đăng ký.
            </p>
            
            <div className="form-actions">
              <button type="submit" className="submit-btn">Đăng ký</button>
            </div>
          </form>
          
          <div className="auth-footer">
            Đã có tài khoản? <Link to="/login">Đăng nhập.</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
