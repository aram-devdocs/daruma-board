import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BoardCardProps, GoalBoardProps } from '../components';

interface UseGoalBoardProps {
  variant: GoalBoardProps['variant'];
}

export const useGoalBoard = ({ variant }: UseGoalBoardProps) => {
  const router = useRouter();
  const [goals, setGoals] = useState<BoardCardProps[]>([]);
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading...');

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await fetch(`/api/goals-${variant}`, {
        method: 'POST',
        body: JSON.stringify({
          token: localStorage.getItem('token'),
        }),
      });
      const goals = await response.json();

      if (!goals.length) {
        setLoadingMessage('No goals yet');
      } else {
        console.log(goals);
        setGoals(goals);
      }
    };

    fetchGoals();
  }, [variant]);

  const navigateToIndex = () => {
    router.push('/');
  };

  return { goals, loadingMessage, navigateToIndex };
};
