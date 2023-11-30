import { Box } from '@daruma-board/web/design-system';

export const Board = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        height: '100vh',
        width: '100vw',
      }}
    ></Box>
  );
};
