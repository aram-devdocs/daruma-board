import { TextField, Box, Button } from '@daruma-board/web/design-system';

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
        {loading ? 'Loading...' : !auth ? 'Login' : 'Validate'}
      </Button>
    </Box>
  );
};
