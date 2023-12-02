import { useRouter } from 'next/router';
import { PageLayout } from '@daruma-board/web/design-system';
import { GoalDetailsCard } from '../components';
import { useEffect, useState } from 'react';
import {
  Goal,
  DarumaColor,
  DarumaDescription,
} from '@daruma/shared/data-access';

export const GoalDetailsPage = () => {
  const router = useRouter();
  const { goal_id } = router.query;
  console.log(goal_id);
  const [goal, setGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const getGoalData = async () => {
      const response = await fetch(`/api/goal-get?goal_id=${goal_id}`);
      const data = await response.json();
      setGoal(data.goal);
    };

    if (goal_id) {
      getGoalData();
    }
  }, [goal_id]);

  return (
    <PageLayout>
      <GoalDetailsCard goal={goal} />
    </PageLayout>
  );
};

export default GoalDetailsPage;
