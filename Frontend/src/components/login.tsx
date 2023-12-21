import { useCallback, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/token/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao fazer login");
      }
      alert("Login bem-sucedido!");
      const data = await response.json();
      // armazena o token de autenticação no localStorage
      localStorage.setItem("auth_token", data.auth_token); // never expires (unless user clicks "logout")
      // sessionStorage.setItem('auth_token', data.auth_token); // expires when browser closed
      console.log("Login bem-sucedido:", data);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const onSubmit = useCallback(async () => {
    try {
      await login(username, password);
    } catch (e) {
      console.error("Erro na submissão:", e);
    }
  }, [username, password]);

  return (
    <div className="flex flex-col gap-4">
      <input
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onSubmit}>Entrar</button>
    </div>
  );
};

export default Login;
