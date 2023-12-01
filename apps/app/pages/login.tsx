import {
  TextField,
  Box,
  PageLayout,
  Button,
} from '@daruma-board/web/design-system';
import { useState } from 'react';
import { useRouter } from 'next/router';
export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [auth, setAuth] = useState<boolean>(false); // [auth, setAuth
  const router = useRouter();
  const handleLogin = async (email: string) => {
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
  };

  const [code, setCode] = useState<string>('');
  const validateToken = async (code: string, email: string) => {
    await fetch('/api/auth-token', {
      method: 'POST',
      body: JSON.stringify({ token: code, email }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          router.push('/board');
        } else {
          alert('Invalid code');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <PageLayout>
      <Box sx={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
        <TextField
          sx={{ width: '100%', marginTop: '1rem' }}
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {auth && (
          <TextField
            sx={{ width: '100%', marginTop: '1rem' }}
            label="Code"
            variant="outlined"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        )}

        <Button
          sx={{ width: '100%', marginTop: '1rem' }}
          variant="contained"
          onClick={
            !auth ? () => handleLogin(email) : () => validateToken(code, email)
          }
        >
          Login
        </Button>
      </Box>
    </PageLayout>
  );
};

export default Login;
