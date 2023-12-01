import {
  TextField,
  Box,
  Button,
  validateEmail,
} from '@daruma-board/web/design-system';

import { useState } from 'react';
interface LoginBoxProps {
  email: string;
  setEmail: (email: string) => void;
  auth: boolean;
  code: string;
  setCode: (code: string) => void;
  handleLogin: (email: string) => void;
  validateToken: (code: string, email: string) => void;
  loading: boolean;
}

export const LoginBox = ({
  email,
  setEmail,
  auth,
  code,
  setCode,
  handleLogin,
  validateToken,
  loading,
}: LoginBoxProps) => {
  const [validated, setValidated] = useState<boolean>(false); // [validated, setValidated
  return (
    <Box
      sx={{
        width: '90vw',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '1rem',
      }}
    >
      <TextField
        sx={{ width: '100%', marginTop: '1rem' }}
        label="Email"
        variant="outlined"
        type="email"
        disabled={auth}
        error={validated && !validateEmail(email)}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value.toLowerCase());
        }}
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
          !auth
            ? () => {
                setValidated(true);
                handleLogin(email);
              }
            : () => validateToken(code, email)
        }
      >
        {loading ? 'Loading...' : !auth ? 'Login' : 'Validate'}
      </Button>
    </Box>
  );
};
