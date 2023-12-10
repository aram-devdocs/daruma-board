import { PageLayout, Box } from '@daruma-board/web/design-system';
import { GoalBoard } from '@daruma/web/feature-board';
import { useDashboard } from '../hooks/useDashboard';
import { Header } from '../components/Header';



export const DashboardPage = () => {
  const { onNewGoalClick, onBoardClick, onLogout} = useDashboard();
  
  
  return (
    <PageLayout>
      <Box
        sx={{
          outline: '1px solid red',
          borderRadius: '1rem',
          backgroundColor: 'color.white', 
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
