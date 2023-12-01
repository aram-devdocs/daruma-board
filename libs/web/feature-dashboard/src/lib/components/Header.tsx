import { Box, Typography, Button } from '@daruma-board/web/design-system';
interface HeaderProps {
  onNewGoalClick: () => void;
  onBoardClick: () => void;
  onLogout: () => void;
}
export const Header = ({
  onNewGoalClick,
  onBoardClick,
  onLogout,
}: HeaderProps) => {
  const buttonSx = {
    width: '100%',
    marginLeft: '1rem',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '5rem',
        padding: '1rem',
      }}
    >
      <Typography color="primary" variant="h5">
        Daruma Board
      </Typography>
      <Button sx={buttonSx} onClick={onLogout} variant="contained">
        Logout
      </Button>
      <Button sx={buttonSx} onClick={onNewGoalClick} variant="contained">
        New Goal
      </Button>
      <Button sx={buttonSx} onClick={onBoardClick} variant="contained">
        Public Board
      </Button>
    </Box>
  );
};
