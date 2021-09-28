import React from 'react';
import './Info.css';
import { createTheme, ThemeProvider, styled  } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const mdTheme = createTheme();

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenPrice: {},
      id: 1012311552,
      tokenInfo: {id: 23, img: '1', rarity: '15'},
    };
  }

  componentDidMount() {
    this.load()
  }

  load = () => {
    var url = "https://api.pancakeswap.info/api/v2/tokens/0x31471e0791fcdbe82fbf4c44943255e923f1b794";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let tokenPrice = JSON.parse(xhr.responseText).data
          this.setState({tokenPrice})
          setTimeout(() => this.load(), 15000);
        }
      }
    }.bind(this);
    xhr.send();
  }

  render() {
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Container align='center' component="main" sx={{ mt: 4, mb: 2 }} maxWidth="md">
            <Typography variant="h6">
              World Tree
            </Typography>
            <Grid container spacing={2} sx={{mt: 1, height: 290}}>
              <Grid item xs={6}>
                <img
                  src={'images/world_tree.png'}
                  alt={'World Tree'}
                  loading="lazy"
                  height={250}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography align='left' variant="h6">
                  Rewards:
                </Typography>
                <Typography align='left' variant="body1">
                  R1: 10 LE
                </Typography>
                <Typography align='left' variant="body1">
                  R2: 15 LE
                </Typography>
                <Typography align='left' variant="body1">
                  R3: 25 LE
                </Typography>
                <Typography align='left' variant="body1">
                  R4: 1 Sun Box
                </Typography>
                <Typography align='left' variant="body1">
                  R5: Every plant is automatically fully watered for the next day (not available) + 50 LE
                </Typography>
                <Typography align='left' variant="body1">
                  R6: 4 saplings
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Box sx={{mt: 2}}>
              <Typography variant="h6">
                Tools
              </Typography>
              <Grid container spacing={2} sx={{mt: 1}}>
                <Grid item xs={3}>
                  <Typography align='left' variant="h6">
                    Small Pot
                  </Typography>
                  <Typography align='left' variant="body1">
                    You need small pot to start farming.
                  </Typography>
                  <Typography align='left' variant="body1">
                    Duration: 10 days
                  </Typography>
                  <Typography align='left' variant="body1">
                    Usage: 1
                  </Typography>
                  <Typography align='left' variant="body1">
                    Price: 50 LE
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align='left' variant="h6">
                    Big Pot
                  </Typography>
                  <Typography align='left' variant="body1">
                    You need big pot to start farming. +1% chance to drop seeds.
                  </Typography>
                  <Typography align='left' variant="body1">
                    Duration: 30 days
                  </Typography>
                  <Typography align='left' variant="body1">
                    Usage: 1
                  </Typography>
                  <Typography align='left' variant="body1">
                    Price: 100 LE
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align='left' variant="h6">
                    Water
                  </Typography>
                  <Typography align='left' variant="body1">
                    Don't forget to water your plants everyday.
                  </Typography>
                  <Typography align='left' variant="body1">
                    Usage: 100
                  </Typography>
                  <Typography align='left' variant="body1">
                    Price: 50 LE
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align='left' variant="h6">
                    Scarecrow
                  </Typography>
                  <Typography align='left' variant="body1">
                    Crows are unpredictable.
                  </Typography>
                  <Typography align='left' variant="body1">
                    Usage: 20
                  </Typography>
                  <Typography align='left' variant="body1">
                    Price: 20 LE
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align='left' variant="h6">
                    Greenhouse
                  </Typography>
                  <Typography align='left' variant="body1">
                    No need to worry about tomorrow's weather.
                  </Typography>
                  <Typography align='left' variant="body1">
                    Duration: 1 day
                  </Typography>
                  <Typography align='left' variant="body1">
                    Usage: 10
                  </Typography>
                  <Typography align='left' variant="body1">
                    Price: 10 LE
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align='left' variant="h6">
                    Sunflower Sapling
                  </Typography>
                  <Typography align='left' variant="body1">
                    A temporary plant that gives 250LE/72h, is not affected by weather events, and cannot drop seeds.
                  </Typography>
                  <Typography align='left' variant="body1">
                    Duration: 3 days
                  </Typography>
                  <Typography align='left' variant="body1">
                    Usage: 1
                  </Typography>
                  <Typography align='left' variant="body1">
                    Price: 100 LE
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align='left' variant="h6">
                    Sunflower mama
                  </Typography>
                  <Typography align='left' variant="body1">
                    A temporary mother tree that gives 850LE/144h, is not affected by weather events, and cannot drop seeds.
                  </Typography>
                  <Typography align='left' variant="body1">
                    Duration: 6 days
                  </Typography>
                  <Typography align='left' variant="body1">
                    Usage: 1
                  </Typography>
                  <Typography align='left' variant="body1">
                    Price: 200 LE
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align='left' variant="h6">
                    Sun Box
                  </Typography>
                  <Typography align='left' variant="body1">
                    A magical box that harnesses energy from the sun. Open it to find useful items inside and maybe a valuable surprise if you are lucky.
                  </Typography>
                  <Typography align='left' variant="body1">
                    Price: 100 LE
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
}

export default Info;
