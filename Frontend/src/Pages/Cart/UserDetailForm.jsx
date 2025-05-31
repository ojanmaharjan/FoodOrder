import React, { useState } from 'react';

const UserDetailForm = ({ onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !contact || !address) {
      setError('All fields are required.');
      return;
    }
    onSubmit({ name, contact, address });
  };

  return (
    <div className="user-detail-form-container">
      <form className="user-detail-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Enter Your Details</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="Enter your name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            id="contact"
            type="text"
            value={contact}
            onChange={e => setContact(e.target.value)}
            required
            placeholder="Enter your contact number"
            className="form-input"
            maxLength={10}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
            placeholder="Enter your address"
            className="form-input"
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        <button
          type="submit"
          className="form-submit-btn"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save and Continue'}
        </button>
      </form>
      <style>{`
        .user-detail-form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50vh;
          background: #f8fafc;
        }
        .user-detail-form {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.09);
          padding: 2.5rem 2rem 2rem 2rem;
          min-width: 340px;
          max-width: 380px;
          width: 100%;
        }
        .form-title {
          margin-bottom: 1.5rem;
          text-align: center;
          color: #222;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 1.2rem;
        }
        .form-group label {
          margin-bottom: 0.5rem;
          color: #444;
          font-size: 1rem;
        }
        .form-input {
          padding: 0.7rem 1rem;
          border: 1.2px solid #e2e8f0;
          border-radius: 6px;
          font-size: 1rem;
          outline: none;
          transition: border 0.2s;
        }
        .form-input:focus {
          border-color: #4f46e5;
          background: #f0f4ff;
        }
        .form-error {
          color: #e53e3e;
          background: #fff5f5;
          border: 1px solid #fed7d7;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          font-size: 0.97rem;
          text-align: center;
        }
        .form-submit-btn {
          width: 100%;
          padding: 0.85rem 0;
          background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 1.07rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: background 0.18s, box-shadow 0.18s;
          box-shadow: 0 2px 8px rgba(99,102,241,0.10);
        }
        .form-submit-btn:disabled {
          background: #a5b4fc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default UserDetailForm;
