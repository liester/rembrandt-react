import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: '#880e4f',
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    fontSize: 12,
    useNextVariants: true,
  },
});

export default theme;
