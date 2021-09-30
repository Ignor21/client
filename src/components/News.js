import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PvuDataService from "../services/pvu.service";

const mdTheme = createTheme();

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenPrice: {},
      id: 1012311552,
      tokenInfo: {id: 23, img: '1', rarity: '15'},
      data: []
    };
  }

  componentDidMount() {
    this.load()

    PvuDataService.getNews()
      .then(response => {
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
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Container align='center' component="main" sx={{ mt: 4, mb: 2 }} maxWidth="md">
          {this.state.data.map((item) => (
            <Box sx={{mb: 4}}>
              <Box sx={{mb: 2}}>
                <Typography align='left' variant="h5">
                  {item.title}
                </Typography>
                <Typography align='left' variant="subtitle2" gutterBottom>
                  {item.date}
                </Typography>
                <Typography style={{whiteSpace: 'pre-line'}} align='left' variant="subtitle2">
                  {item.text}
                </Typography>
              </Box>
              <Divider />
            </Box>
          ))}
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
}

export default News;
