import React from 'react';
import { createTheme, ThemeProvider, styled  } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PvuDataService from "../services/pvu.service";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const mdTheme = createTheme();

class WorldTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenPrice: {},
      id: 1012311552,
      tokenInfo: {id: 23, img: '1', rarity: '15'},
      data: { reward: [{target: 1000000000}, {target: 1000000000}, {target: 1000000000}, {target: 1000000000}, {target: 1000000000}, {target: 1000000000}] }
    };
  }

  componentDidMount() {
    this.load()

    PvuDataService.getWorldTreeData()
      .then(response => {
        console.log(response.data)
        this.setState({data: response.data})
      })
      .catch(e => {
        console.log(e);
      });
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
    const { data } = this.state;
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Container align='center' component="main" sx={{ mt: 4, mb: 2 }} maxWidth="md">
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
                  Current water: {data.totalWater}
                </Typography>
                <Typography align='left' variant="h6">
                  Rewards:
                </Typography>
                <Typography align='left' variant="body1">
                  {data.reward[0].target < data.totalWater && '\/ '}R1: 10 LE ({data.reward[0].target})
                </Typography>
                <Typography align='left' variant="body1">
                  {data.reward[1].target < data.totalWater && '\/ '}R2: 15 LE ({data.reward[1].target})
                </Typography>
                <Typography align='left' variant="body1">
                  {data.reward[2].target < data.totalWater && '\/ '}R3: 25 LE ({data.reward[2].target})
                </Typography>
                <Typography align='left' variant="body1">
                  {data.reward[3].target < data.totalWater && '\/ '}R4: 1 Sun Box ({data.reward[3].target})
                </Typography>
                <Typography align='left' variant="body1">
                  {data.reward[4].target < data.totalWater && '\/ '}R5: Every plant is automatically fully watered for the next day (not available) + 50 LE ({data.reward[4].target})
                </Typography>
                <Typography align='left' variant="body1">
                  {data.reward[5].target < data.totalWater && '\/ '}R6: 4 saplings ({data.reward[5].target})
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
}

export default WorldTree;
