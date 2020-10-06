import { Magic } from 'magic-sdk';
import { useState } from 'react';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState<any | boolean>(false);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const a = new Magic('pk_live_1F71F231F2E33A46');
    const DIDT = await a.auth.loginWithMagicLink({ email: 'nicola.zanon86@gmail.com' });

    const res = await fetch(`http://localhost:3000/api/user/login`, {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Bearer ' + DIDT,
      }),
    });

    const data = await res.json();

    const loggedIn = data.authorized ? data.user : false;
    setLoggedIn(loggedIn);
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="submit" value="Submit" />
      </form>
      <pre>{JSON.stringify(loggedIn)}</pre>
    </div>
  );
};

export default Login;
