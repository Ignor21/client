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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import Home from "./components/Home.js";
import PlantInfo from "./components/PlantInfo.js";
import FarmCalculator from "./components/FarmCalculator.js";
import Weather from "./components/Weather.js";
import News from "./components/News.js";
import WorldTree from "./components/WorldTree.js";
import Marketplace from "./components/Marketplace.js";

const theme = createTheme();

const sections = [
  { title: 'Home', url: '/' },
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
    this.state = {};
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
                {sections.map((section) => (
                  <Link
                    color="inherit"
                    noWrap
                    key={section.title}
                    variant="body2"
                    href={section.url}
                    sx={{ p: 1, flexShrink: 0 }}
                  >
                    {section.title}
                  </Link>
                ))}
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