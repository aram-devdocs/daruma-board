import { Box, Typography } from '@daruma-board/web/design-system';
import { Goal } from '@daruma/shared/data-access';

interface GoalDetailsCardProps {
  goal: Goal | null;
}

export const GoalDetailsCard = ({ goal }: GoalDetailsCardProps) => {
  console.log(goal);
  if (!goal) {
    return <Box>Goal not found</Box>;
  }

  const { user_id, goal: title, notes, due_date, daruma, description } = goal;

  return (
    <Box>
      <Typography variant="h1">{title}</Typography>
      <Typography variant="body1">{notes}</Typography>
      <Typography variant="body1">{due_date}</Typography>
      <Typography variant="body1">{daruma}</Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};
