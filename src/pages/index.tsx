import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername && storedPassword) {
      router.push("/todo");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      localStorage.setItem("username", username.trim());
      localStorage.setItem("password", password.trim());
      router.push("/todo");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Oturum Aç</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı adınızı girin"
            style={{
              display: "block",
              marginTop: "0.5rem",
              width: "100%",
              padding: "0.5rem",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifrenizi girin"
            style={{
              display: "block",
              marginTop: "0.5rem",
              width: "100%",
              padding: "0.5rem",
            }}
          />
          <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
            <a href="#" style={{ fontSize: "0.875rem", color: "#0070f3" }}>
              Şifremi unuttum
            </a>
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
