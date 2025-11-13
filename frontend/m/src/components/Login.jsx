import React, { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert(`Logging in as ${username}`);
    } else {
      alert(`Signing up as ${username} (${role})`);
    }
    setUsername('');
    setPassword('');
    setRole('student');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6f4ea', // Light green background
        padding: '20px',
        transition: 'background 0.5s ease',
      }}
    >
      <div
        style={{
          background: '#ffffff', // White card
          padding: '30px',
          borderRadius: '20px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          color: '#212529',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>
        <p style={{ fontSize: '0.95rem', marginBottom: '20px', color: '#386641' }}>
          {isLogin
            ? 'Access your personalized wellbeing dashboard.'
            : 'Create an account to start your journey.'}
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                fontSize: '1rem',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                fontSize: '1rem',
              }}
            />
          </div>

          {!isLogin && (
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                }}
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '50px',
              backgroundColor: '#6a994e', // Dark green button
              border: 'none',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
              marginTop: '10px',
            }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#386641' }}>
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <span
                onClick={() => setIsLogin(false)}
                style={{ color: '#a7c957', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span
                onClick={() => setIsLogin(true)}
                style={{ color: '#a7c957', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
