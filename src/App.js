import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import Home from "./components/Home.js";
import PlantInfo from "./components/PlantInfo.js";
import FarmCalculator from "./components/FarmCalculator.js";
import Weather from "./components/Weather.js";
import News from "./components/News.js";
import WorldTree from "./components/WorldTree.js";
import Marketplace from "./components/Marketplace.js";
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const theme = createTheme();

const farmLinks = [
  { title: 'Plant Info', url: '/plantInfo' },
  { title: 'Farm Calculator', url: '/farmCalculator' },
  { title: 'Weather', url: '/weather' },
  { title: 'News', url: '/news' },
  { title: 'WorldTree', url: '/worldTree' },
  { title: 'Marketplace', url: '/marketplace' },
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      open2: false,
      anchorEl2: null
    };
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <CssBaseline />
            <AppBar position="relative">
              <Toolbar
                component="nav"
                variant="dense"
                sx={{ overflowX: 'auto' }}
              >
                <img
                  src={'images/1_1.png'}
                  alt={'logo'}
                  loading="lazy"
                  height={40}
                />
                <Box sx={{minWidth: '1vh'}} />

                  <Button id="basic-button">
                    <Link
                      color="#fff"
                      noWrap
                      href={'/'}
                      style={{ textDecoration: 'none' }}
                    >
                      Home
                    </Link>
                  </Button>

                  <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={this.state.open ? 'true' : undefined}
                    onClick={event => this.setState({anchorEl: event.currentTarget})}
                  >
                    <Typography variant="body2" color="white" sx={{ pl: 1, flexShrink: 0 }}>
                      Farm
                    </Typography>
                    <ArrowDropDown style={{fill: "white"}} />
                  </Button>
                  <Menu
                    id="basic-menu"
                    transitionDuration={200}
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={() => this.setState({anchorEl: null})}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    sx={{ mt: 0.9 }}
                  >
                    {farmLinks.map((section) => (
                      <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        href={section.url}
                        style={{ textDecoration: 'none' }}
                      >
                        <MenuItem>
                          {section.title}
                        </MenuItem>
                      </Link>
                    ))}
                  </Menu>

                  <Button
                    id="basic-button2"
                    aria-controls="basic-menu2"
                    aria-haspopup="true"
                    aria-expanded={this.state.open2 ? 'true' : undefined}
                    onClick={event => this.setState({anchorEl2: event.currentTarget})}
                  >
                    <Typography variant="body2" color="white" sx={{ pl: 1, flexShrink: 0 }}>
                      PVP
                    </Typography>
                    <ArrowDropDown style={{fill: "white"}} />
                  </Button>
              </Toolbar>
            </AppBar>

            <Switch>
              <Route path="/plantInfo">
                <PlantInfo />
              </Route>
              <Route path="/farmCalculator">
                <FarmCalculator />
              </Route>
              <Route path="/weather">
                <Weather />
              </Route>
              <Route path="/news">
                <News />
              </Route>
              <Route path="/worldTree">
                <WorldTree />
              </Route>
              <Route path="/marketplace">
                <Marketplace />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>

            <Box
              component="footer"
              sx={{
                py: 1,
                px: 1,
                mt: 'auto',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800],
              }}
            >
              <Container maxWidth="sm">
                <Typography align='center' variant="subtitle2">
                  Donate 0x3158e04E1824bEFCB8c4d85F82942c692fb3fAC2
                </Typography>
                <Typography align='center' variant="subtitle2">
                  Telegram @dmitry_skibin
                </Typography>
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;