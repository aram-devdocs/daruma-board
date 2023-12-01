import { PageLayout, validateEmail } from '@daruma-board/web/design-system';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { LoginBox } from '../components';
export const LoginPage = () => {
  // TODO: move to hook
  const [email, setEmail] = useState<string>('');
  const [auth, setAuth] = useState<boolean>(false); // [auth, setAuth
  const [loading, setLoading] = useState<boolean>(false); // [loading, setLoading
  const router = useRouter();
  const handleLogin = async (email: string) => {
    setLoading(true);

    // Validate
    if (!email) {
      alert('Email is required');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      alert('Email is invalid');
      setLoading(false);
      return;
    }

    await fetch('/api/auth-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        console.log(res);
        setAuth(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setLoading(false);
  };

  const [code, setCode] = useState<string>('');
  const validateToken = async (code: string, email: string) => {
    setLoading(true);
    await fetch('/api/auth-token', {
      method: 'POST',
      body: JSON.stringify({ token: code, email }),
    })
      .then(async (res) => {
        const body = await res.json();
        if (res.status === 200) {
          localStorage.setItem('token', body.token);
          localStorage.setItem('localEmail', email);

          router.push('/');
        } else {
          alert('Invalid code');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setLoading(false);
  };

  return (
    <PageLayout>
      <LoginBox
        email={email}
        setEmail={setEmail}
        auth={auth}
        code={code}
        setCode={setCode}
        handleLogin={handleLogin}
        validateToken={validateToken}
        loading={loading}
      />
    </PageLayout>
  );
};
