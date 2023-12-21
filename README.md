# Primeiros Passos do Processo de Autenticação e Autorização com DRF e React

Para estabelecer a comunicação entre uma aplicação React e uma API com Django Rest Framework (DRF), visando executar um processo de cadastro e autenticação de usuários, devemos seguir alguns passos essenciais. Esta etapa é fundamental na criação de projetos full stack, onde é necessário integrar de maneira concisa o frontend (React) e o backend (Django).

## Back-end

### Vantagens de Utilizar DRF com Djoser

#### Facilidade e Eficiência
O Django Rest Framework é conhecido por sua capacidade de simplificar o processo de construção de APIs. Ao combiná-lo com o Djoser, ganhamos uma solução robusta e eficiente para gerenciamento de autenticação e autorização. Isso permite que os desenvolvedores se concentrem mais na lógica de negócios e menos nos detalhes técnicos da autenticação.

#### Segurança Aprimorada
A segurança é uma grande preocupação em aplicações web, especialmente no que diz respeito à autenticação e autorização de usuários. O DRF, juntamente com o Djoser, oferece uma camada de segurança robusta, que segue as melhores práticas e padrões da indústria.

#### Flexibilidade e Personalização
Embora o Djoser ofereça um conjunto padrão de endpoints e comportamentos, ele é altamente personalizável. Isso significa que você pode ajustar a autenticação e a autorização para atender às necessidades específicas do seu projeto, mantendo a consistência e a clareza proporcionadas pelo DRF.

### A Importância de um Ambiente Virtual

#### Isolamento de Dependências
Um ambiente virtual em Python cria um espaço isolado para as dependências do seu projeto. Isso significa que você pode ter diferentes versões de pacotes instalados para projetos diferentes, sem causar conflitos entre eles.

#### Reproducibilidade
Ao utilizar um ambiente virtual, você garante que outros desenvolvedores (ou você mesmo em um ambiente diferente) podem recriar o mesmo ambiente com facilidade. Isso é crucial para a consistência e para evitar o famoso problema "funciona na minha máquina".

#### Gerenciamento Simplificado
Com um ambiente virtual, a gestão de pacotes e dependências torna-se muito mais simples e controlada, reduzindo o risco de problemas inesperados em produção devido a diferenças no ambiente de desenvolvimento

### Iniciando o Projeto

Para iniciar, vamos seguir os tutoriais oferecidos pelo DRF ([Django Rest Framework Quickstart](https://www.django-rest-framework.org/tutorial/quickstart/#quickstart)) e pelo Djoser ([Djoser Documentation](https://djoser.readthedocs.io/en/latest/getting_started.html)).

#### Criando o Diretório do Projeto
```bash
mkdir tutorial
cd tutorial
```

#### Criando um Ambiente Virtual
Isso isola as dependências do projeto.
```bash
python3 -m venv env
source env/bin/activate  # No Windows, use `env\Scripts\activate`
```

#### Instalando Dependências
Instalamos Django, DRF e Djoser no ambiente virtual.
```bash
pip install django
pip install djangorestframework
pip install djoser
```

#### Configurando um Novo Projeto com uma Aplicação
```bash
django-admin startproject tutorial .  # Note o ponto final.
cd tutorial
```

### Configuração

#### Configurando `settings.py`
Adicione `rest_framework` e `djoser` às `INSTALLED_APPS`.
```python
INSTALLED_APPS = [
    'django.contrib.auth',
    # ...
    'rest_framework',
    'djoser',
    # ...
]
```

#### Configurando `urls.py`
Adicionamos as rotas para autenticação.
```python
from django.urls import path, include  # Novo
from django.urls import re_path  # Novo

urlpatterns = [
    # ...
    re_path('auth/', include('djoser.urls')),
    re_path('auth/', include('djoser.urls.authtoken')),
]
```

#### Aplicando as Migrations
```bash
python manage.py migrate
```

#### Iniciando o Servidor
```bash
python manage.py runserver
```

Com estas etapas, seu backend está configurado e pronto para processar as requisições de criação e autenticação de usuários.

#### Endpoints do Djoser
A biblioteca Djoser fornece vários endpoints (veja a lista completa [aqui](https://djoser.readthedocs.io/en/latest/getting_started.html#available-endpoints)). Para este projeto, vamos focar nos seguintes:

- `auth/users/` - Criação de um novo usuário.
- `auth/token/login/` - Autenticação do usuário.

### Observações Sobre CORS em Ambiente de Desenvolvimento

#### Problemas Comuns com CORS
Ao desenvolver localmente, especialmente quando o frontend e o backend estão rodando no mesmo computador mas em portas diferentes, é comum enfrentar problemas relacionados ao CORS (Cross-Origin Resource Sharing).

#### Solução
Para resolver isso, você pode utilizar o pacote `django-cors-headers`. Este pacote permite configurar de forma detalhada as políticas de CORS do seu projeto Django, garantindo que as requisições feitas pelo seu frontend React sejam aceitas pelo backend Django.

1. Instale o `django-cors-headers`:
   ```bash
   pip install django-cors-headers
   ```

2. Adicione `corsheaders` às `INSTALLED_APPS` e configure o middleware em `settings.py`:
   ```python
   INSTALLED_APPS = [
       # ...
       'corsheaders',
       # ...
   ]

   MIDDLEWARE = [
       # ...
       'corsheaders.middleware.CorsMiddleware',
       # ...
   ]

   CORS_ALLOW_ALL_ORIGINS = True  # Em ambiente de desenvolvimento
   ```

**Nota:** Lembre-se de restringir as configurações de CORS para um ambiente de produção, permitindo apenas origens confiáveis.

## Front-end

### Vantagens de Utilizar React com Vite

#### React: Componentização e Reatividade
- **Componentização:** O React facilita a construção de interfaces de usuário através de componentes independentes, reutilizáveis e gerenciáveis. Isso resulta em um código mais modular e fácil de manter.
- **Reatividade:** Com seu sistema de estados e props, o React oferece uma interface de usuário extremamente reativa e interativa, que se atualiza automaticamente com mudanças nos dados.

#### Vite: Desempenho e Hot Module Replacement (HMR)
- **Desempenho:** O Vite otimiza o tempo de inicialização do servidor de desenvolvimento, utilizando ES modules nativos.
- **HMR:** O Hot Module Replacement permite que alterações no código sejam refletidas instantaneamente no navegador, sem necessidade de recarregar a página, melhorando a eficiência no desenvolvimento.

### Iniciando o Projeto com React e Vite

Iniciamos o projeto seguindo o tutorial do Vite ([Vite Documentation](https://vitejs.dev/guide/)) para criar um projeto React com TypeScript.

```bash
npm create vite@latest meu_app -- --template react-ts
```

Este comando cria um projeto chamado "meu_app" (nome alterável). Após entrar na pasta do projeto, instalamos as dependências:

```bash
cd meu_app
npm install
```

Recomenda-se fazer uma limpeza no projeto, removendo arquivos desnecessários. Em seguida, criamos um diretório chamado "components" dentro de "src" e um arquivo "cadastro.tsx" para nosso primeiro componente.

#### Estruturando o Componente de Cadastro

Para construir o componente de cadastro, é crucial entender os requisitos para comunicação com a API. Acessando o endpoint de cadastro de usuários (http://127.0.0.1:8000/auth/users/), identificamos que os campos necessários são: email, username e password.

O componente inicia com a criação de uma função básica:

```tsx
const Cadastro = () => {
  return (
    <div>
    </div>
  );
};

export default Cadastro;
```

Em seguida, importamos o hook `useState` do React para gerenciar os estados dos valores necessários:

```tsx
import { useState } from "react";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  // ...
```

Agora, adicionamos os inputs para coletar os valores do usuário:

```tsx
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
      // ...
    </div>
  );
```

#### Comunicação com o Backend

Para integrar o frontend ao backend, criamos uma função assíncrona que fará um POST ao endpoint da API:

```tsx
async function registerUser(userData: { email: string; username: string; password: string; }) {
  // ...
}
```

É essencial utilizar um bloco try/catch para tratamento de erros e evitar que a aplicação quebre. A função completa ficaria:

```tsx
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
    return await response.json(); // Retorna { user: { id, email, username }, token }
  } catch (error) {
    console.log(error);
  }
}
```

#### Validação e Submissão do Formulário

Para a submissão e validação do formulário de cadastro, utilizamos o hook `useCallback`:

```tsx
const onSubmit = useCallback(async () => {
  try {
    if

 (password !== confirmPassword) {
      throw new Error("As senhas não coincidem");
    }
    await registerUser({ email, username, password });
  } catch (e) {
    console.log(e);
  }
}, [email, username, password, confirmPassword]);

// Adição do botão de submit
return (
  // ...
  <button onClick={onSubmit}>Registrar</button>
);
```

Com isso, o componente `Cadastro` está pronto para integrar ao arquivo `App.tsx`:

```tsx
import Cadastro from "./components/cadastro";

function App() {
  return (
    <>
      <Cadastro />
    </>
  );
}

export default App;
```

### Implementando o Login

Após configurarmos o componente de cadastro, a lógica para implementar o login é similar, mas com algumas diferenças importantes.

#### Estrutura do Componente de Login

Primeiro, importamos os hooks necessários e definimos o estado inicial para `username` e `password`:

```tsx
import { useCallback, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // ...
};
```

#### Função de Login

A função `login` será responsável por realizar a autenticação do usuário:

```tsx
const login = async (username: string, password: string) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/auth/token/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao fazer login");
    }
    alert("Login bem-sucedido!");
    const data = await response.json();
    // ...
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  }
};
```

#### Armazenamento do Token de Autenticação

Após a autenticação bem-sucedida, armazenamos o token no `localStorage`:

```tsx
    // Dentro da função login, após o sucesso do login
    localStorage.setItem('auth_token', data.auth_token); // Nunca expira (a menos que o usuário clique em "logout")
    // sessionStorage.setItem('auth_token', data.auth_token); // Expira quando o navegador é fechado
```

#### Submissão e Validação do Formulário de Login

Similar ao componente de cadastro, usamos `useCallback` para lidar com a submissão do formulário:

```tsx
const onSubmit = useCallback(async () => {
  try {
    await login(username, password);
  } catch (e) {
    console.error("Erro na submissão:", e);
  }
}, [username, password]);

// Estrutura do formulário
return (
  <div className="flex flex-col gap-4">
    <input
      placeholder="Usuário"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <input
      placeholder="Senha"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button onClick={onSubmit}>Entrar</button>
  </div>
);
```

É importante notar que, para o input de senha, adicionamos `type="password"` para ocultar a entrada do usuário. Esta é uma prática de segurança padrão em formulários de login.

#### Integração com o App

Finalmente, integramos o componente `Login` ao `App.tsx`, similar ao que fizemos com o componente `Cadastro`:

```tsx
import Login from "./components/Login";

function App() {
  return (
    <>
      <Login />
      // Outros componentes, se necessário
    </>
  );
}

export default App;
```

---

Com estas implementações, seu projeto React agora possui funcionalidades de cadastro e login, comunicando-se eficientemente com o backend Django. Esta estrutura oferece uma base sólida para a construção de aplicações web modernas e reativas.

