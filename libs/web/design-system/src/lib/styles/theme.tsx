import { ThemeOptions } from '@mui/material/styles';


const colorPalette = {
  color: {
    white: '#ffffff',
  }

};

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    ...colorPalette,
    background: {
      default: 'grey',
    },
  },
};


export default lightThemeOptions;
