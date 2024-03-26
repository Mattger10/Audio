import { createTheme } from '@material-ui/core/styles';
import Font from "../../assets/fonts/SingUp Fonts/AvenirNextLTPro-Bold.otf";
import Font2 from "../../assets/fonts/Araboto Light 400.ttf";

const myFont = new FontFace('Font', `url(${Font})`);
const myFont2 = new FontFace('Font2', `url(${Font2})`);

document.fonts.add(myFont);
document.fonts.add(myFont2);

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#00ff00',
    },
  },
  typography: {
    fontFamily: 'Font, Font2',

  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [myFont],
      },
    },
  },
});

export default muiTheme;
