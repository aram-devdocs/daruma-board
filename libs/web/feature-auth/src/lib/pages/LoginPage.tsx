import { PageLayout } from '@daruma-board/web/design-system';
import { LoginBox } from '../components';
import { useLogin } from '../hooks';

export const LoginPage = () => {
  const {
    email,
    handleSetEmail,
    auth,
    code,
    handleSetCode,
    handleLogin,
    validateToken,
    loading,
  } = useLogin();

  return (
    <PageLayout>
      <LoginBox
        email={email}
        setEmail={handleSetEmail}
        auth={auth}
        code={code}
        setCode={handleSetCode}
        handleLogin={handleLogin}
        validateToken={validateToken}
        loading={loading}
      />
    </PageLayout>
  );
};
