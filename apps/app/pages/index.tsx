import {
  Box,
  Typography,
  PageLayout,
  Button,
} from '@daruma-board/web/design-system';
import { useRouter } from 'next/router';

export function Index() {
  const router = useRouter();

  const buttonSx = {
    width: '100%',
    marginTop: '1rem',
  };

  const onNewGoalClick = () => {
    router.push('/board/new');
  };

  const onBoardClick = () => {
    router.push('/board');
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <PageLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          outline: '1px solid red',
          borderRadius: '1rem',
          padding: '1rem',

          backgroundColor: 'white', // TODO - replace with theme
        }}
      >
        <Typography color="primary" variant="h1">
          Daruma Board
        </Typography>
        <Button sx={buttonSx} onClick={onLogout} variant="contained">
          Logout
        </Button>
        <Button sx={buttonSx} onClick={onNewGoalClick} variant="contained">
          New Goal
        </Button>
        <Button sx={buttonSx} onClick={onBoardClick} variant="contained">
          Board
        </Button>
      </Box>
    </PageLayout>
  );
}

export default Index;
