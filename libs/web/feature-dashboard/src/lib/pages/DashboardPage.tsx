import { PageLayout, Box } from '@daruma-board/web/design-system';
import { GoalBoard } from '@daruma/web/feature-board';
import { useRouter } from 'next/router';
import { Header } from '../components';

export function DashboardPage() {
  // TODO: move to hook
  const router = useRouter();

  const onNewGoalClick = () => {
    router.push('/board/new');
  };

  const onBoardClick = () => {
    router.push('/board');
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('localEmail');
    router.push('/login');
  };

  return (
    <PageLayout>
      <Box
        sx={{
          outline: '1px solid red',
          borderRadius: '1rem',
          backgroundColor: 'white', // TODO - replace with theme
          width: '90vw',
          height: '70vh',
        }}
      >
        <Header
          onNewGoalClick={onNewGoalClick}
          onBoardClick={onBoardClick}
          onLogout={onLogout}
        />
        <GoalBoard variant="private" />
      </Box>
    </PageLayout>
  );
}
