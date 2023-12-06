import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { validateEmail } from '@daruma-board/web/design-system';



export const useLogin = () => {
    const [email, setEmail] = useState<string>('');
    const [auth, setAuth] = useState<boolean>(false); // [auth, setAuth
    const [loading, setLoading] = useState<boolean>(false); // [loading, setLoading
    const router = useRouter();


    const handleLogin = async (email: string) => {
      setLoading(true);

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
          if (res.status === 200) {
            console.log(res);
            setAuth(true);
          } else {
            if (res.status === 403) {
              alert('Request for dev mode denied, use testing address');
            } else {
              alert('Email not sent: ' + res.status + ' ' + res.statusText);
            }
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      setLoading(false);
    };
    
    const [code, setCode] = useState('');
    const validateToken = async (code: 'string', email: string) => {
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

    return {
      email,
      setEmail,
      auth,
      loading,
      handleLogin,
      code,
      setCode,
      validateToken,
    };   

};