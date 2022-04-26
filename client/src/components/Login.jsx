import React from "react";

export default function Login({ onLogin, onChange, value }) {
  return (
    <div className="login">
      <form onSubmit={onLogin} className="form">
        <label className="label">Login</label>
        <input
          className="input"
          value={value}
          onChange={onChange}
          placeholder="Your name"
        />
      </form>
    </div>
  );
}
