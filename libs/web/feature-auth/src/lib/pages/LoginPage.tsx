import { PageLayout} from '@daruma-board/web/design-system';
import { LoginBox } from '../components';
import { useLogin } from '../hooks/useLogin';


export const LoginPage = () => {
  const { email, setEmail, auth, code, setCode, handleLogin, validateToken, loading } = useLogin();



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
