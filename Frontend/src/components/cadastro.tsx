import { useCallback, useState } from "react";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  /**
   * Registers a user with the provided user data.
   * @param userData - The user data including email, username, and password.
   * @returns A Promise that resolves to the response data from the registration API.
   */
  async function registerUser(userData: {
    email: string;
    username: string;
    password: string;
  }) {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Falha no registro");
      }
      
      alert("Registro bem-sucedido!");
      return await response.json(); // { user: { id, email, username }, token }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = useCallback(async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error("As senhas não coincidem");
      }

      await registerUser({ email, username, password });
    } catch (e) {
      console.log(e);
    }
  }, [email, username, password, confirmPassword]);

  return (
    <div>
      <input
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
      <input
        placeholder="Confirmar senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={onSubmit}>Registrar</button>
    </div>
  );
};

export default Cadastro
