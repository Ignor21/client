import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const mdTheme = createTheme();

class FarmCalculator extends React.Component {
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

  getInfo = (num) => {
    let arrayID = num.toString().split("");
    let id = parseInt(`${arrayID[3]}${arrayID[4]}`);
    let img = `${arrayID[5]}`;
    let rarity = `${arrayID[6]}${arrayID[7]}`;
    this.setState({tokenInfo: {id, img, rarity}})
    console.log(id, img, rarity)
  }

  calculateRarity = (num) => {
    let rarityType = "",
      color = "",
      rarityNum = 0;
    let rarity = parseInt(num);
    if (rarity >= 0 && rarity <= 59) {
      rarityType = "Common";
      rarityNum = 0;
      color = "#198754";
    } else if (rarity >= 60 && rarity <= 88) {
      rarityType = "Uncommon";
      rarityNum = 1;
      color = "#0d6efd";
    } else if (rarity >= 89 && rarity <= 98) {
      rarityType = "Rare";
      rarityNum = 2;
      color = "#dc3545";
    } else if (rarity === 99) {
      rarityType = "Mythic";
      rarityNum = 3;
      color = "#6610f2";
    }
    return { rarityType, rarityNum, color };
  };

  calculateLE = (baseLE, rarityNum, rarity, step) => {
    let lowestRarity;
    // eslint-disable-next-line default-case
    switch (rarityNum) {
      case 0:
        lowestRarity = 0;
        break;
      case 1:
        lowestRarity = 60;
        break;
      case 2:
        lowestRarity = 89;
        break;
      case 3:
        lowestRarity = 99;
        break;
    }
    return baseLE[rarityNum] + lowestRarity + (rarity - lowestRarity) * step;
  };

  render() {
    const { id, tokenInfo } = this.state;
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Container align='center' component="main" sx={{ mt: 4, mb: 2 }} maxWidth="md">
             Not ready
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
}

export default FarmCalculator;
