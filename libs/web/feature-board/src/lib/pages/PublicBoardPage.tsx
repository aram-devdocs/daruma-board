import { PageLayout } from '@daruma-board/web/design-system';
import { GoalBoard } from '../components';
export const PublicBoardPage = () => {
  return (
    <PageLayout>
      <GoalBoard variant="public" />
    </PageLayout>
  );
};
