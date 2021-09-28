import React from 'react';
import './PlantInfo.css';
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

class PlantInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenPrice: {},
      id: 1012311552,
      tokenInfo: {id: "23", element: "Parasite", baseLE: [1300, 1350, 1411, 1551], hour: "168", img: "1", step: "1", rarity: {rarityType: "Common", rarityNum: 0, color: "#198754"}, type: "Plant", le: 1315},
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
    let info = PlantInfoMap.find(element => element.id === id.toString());
    if(!!info) {
      info.img = img
      info.rarity = this.calculateRarity(rarity)
      info.le = this.calculateLE(info.baseLE, info.rarity.rarityNum, Number(rarity), Number(info.step))
      this.setState({tokenInfo: info})
    }
    else {
      this.setState({tokenInfo: null})
    }
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
    console.log(baseLE, rarityNum, rarity, step)
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
            <TextField label="Plant ID" size='small' sx={{mr: 1}} type={'number'} value={id} onChange={(id) => this.setState({id: id.target.value})} />
            <Button style={{height: '40px'}} sx={{ml: 1}} variant="outlined" size='large' onClick={() => this.getInfo(this.state.id)}>Get Info</Button>
            {tokenInfo &&
              <Box sx={{mt: 2, height: 250}}>
                <img
                  src={'images/' + tokenInfo.id + '_' + tokenInfo.img + '.png'}
                  alt={this.state.id}
                  loading="lazy"
                  height={250}
                />
              </Box>
            }
            {tokenInfo ?
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell align='center'>Type: </TableCell>
                    <TableCell align='center'>{tokenInfo.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>Rarity: </TableCell>
                    <TableCell align='center'>
                      <p style={{color: tokenInfo.rarity.color}}>{tokenInfo.rarity.rarityType}</p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>Element: </TableCell>
                    <TableCell align='center'>{tokenInfo.element}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>LE: </TableCell>
                    <TableCell align='center'>{tokenInfo.le} / {tokenInfo.hour} hours</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>LE per hour: </TableCell>
                    <TableCell align='center'>{(tokenInfo.le/Number(tokenInfo.hour)).toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>LE per day: </TableCell>
                    <TableCell align='center'>{((tokenInfo.le/Number(tokenInfo.hour))*24).toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            :
              <Box sx={{mt: 2, height: 250}}>
                <p>Wrong ID</p>
              </Box>
            }
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
}

const PlantInfoMap = [
	{
		id: "0",
		element: "Fire",
		baseLE: [400, 440, 511, 701],
		hour: "48",
		step: "1",
		type: "Plant"
	},
	{
		id: "1",
		element: "Fire",
		baseLE: [400, 440, 511, 701],
		hour: "48",
		step: "1",
		type: "Plant"
	},
	{
		id: "2",
		element: "Ice",
		baseLE: [500, 550, 591, 751],
		hour: "60",
		step: "1",
		type: "Plant"
	},
	{
		id: "3",
		element: "Electro",
		baseLE: [500, 550, 591, 751],
		hour: "48",
		step: "1",
		type: "Plant"
	},
	{
		id: "4",
		element: "Water",
		baseLE: [950, 1040, 1111, 1301],
		hour: "108",
		step: "1",
		type: "Plant"
	},
	{
		id: "5",
		element: "Water",
		baseLE: [950, 1040, 1111, 1301],
		hour: "108",
		step: "1",
		type: "Plant"
	},
	{
		id: "6",
		element: "Ice",
		baseLE: [500, 550, 591, 751],
		hour: "60",
		step: "1",
		type: "Plant"
	},
	{
		id: "7",
		element: "Fire",
		baseLE: [400, 440, 511, 701],
		hour: "48",
		step: "1",
		type: "Plant"
	},
	{
		id: "8",
		element: "Electro",
		baseLE: [500, 550, 591, 751],
		hour: "48",
		step: "1",
		type: "Plant"
	},
	{
		id: "9",
		element: "Wind",
		baseLE: [750, 800, 861, 1051],
		hour: "72",
		step: "1",
		type: "Plant"
	},
	{
		id: "10",
		element: "Wind",
		baseLE: [750, 800, 861, 1051],
		hour: "72",
		step: "1",
		type: "Plant"
	},
	{
		id: "11",
		element: "Parasite",
		baseLE: [900, 950, 1011, 1151],
		hour: "120",
		step: "1",
		type: "Plant"
	},
	{
		id: "12",
		element: "Parasite",
		baseLE: [900, 950, 1011, 1151],
		hour: "120",
		step: "1",
		type: "Plant"
	},
	{
		id: "13",
		element: "Parasite",
		baseLE: [900, 950, 1011, 1151],
		hour: "120",
		step: "1",
		type: "Plant"
	},
	{
		id: "14",
		element: "Dark",
		baseLE: [1200, 1840, 2211, 2401],
		hour: "192",
		step: "10",
		type: "Plant"
	},
	{
		id: "15",
		element: "Electro",
		baseLE: [500, 550, 591, 751],
		hour: "48",
		step: "1",
		type: "Plant"
	},
	{
		id: "16",
		element: "Wind",
		baseLE: [900, 950, 1011, 1151],
		hour: "96",
		step: "1",
		type: "Plant"
	},
	{
		id: "17",
		element: "Fire",
		baseLE: [650, 700, 811, 1001],
		hour: "72",
		step: "1",
		type: "Plant"
	},
	{
		id: "18",
		element: "Light",
		baseLE: [1200, 1250, 1311, 1401],
		hour: "240",
		step: "1",
		type: "Plant"
	},
	{
		id: "19",
		element: "Light",
		baseLE: [1200, 1250, 1311, 1401],
		hour: "240",
		step: "1",
		type: "Plant"
	},
	{
		id: "20",
		element: "Light",
		baseLE: [1600, 1650, 1711, 1901],
		hour: "312",
		step: "1",
		type: "Plant"
	},
	{
		id: "21",
		element: "Light",
		baseLE: [1600, 1650, 1711, 1901],
		hour: "312",
		step: "1",
		type: "Plant"
	},
	{
		id: "22",
		element: "Parasite",
		baseLE: [1300, 1350, 1411, 1551],
		hour: "168",
		step: "1",
		type: "Plant"
	},
	{
		id: "23",
		element: "Parasite",
		baseLE: [1300, 1350, 1411, 1551],
		hour: "168",
		step: "1",
		type: "Plant"
	},
	{
		id: "24",
		element: "Parasite",
		baseLE: [1300, 1350, 1411, 1551],
		hour: "168",
		step: "1",
		type: "Plant"
	},
	{
		id: "25",
		element: "Metal",
		baseLE: [3500, 4240, 4711, 5101],
		hour: "336",
		step: "10",
		type: "Plant"
	},
	{
		id: "26",
		element: "Metal",
		baseLE: [3500, 4240, 4711, 5101],
		hour: "336",
		step: "10",
		type: "Plant"
	},
	{
		id: "27",
		element: "Metal",
		baseLE: [5500, 6340, 6711, 7001],
		hour: "480",
		step: "10",
		type: "Plant"
	},
	{
		id: "28",
		element: "Metal",
		baseLE: [5500, 6340, 6711, 7001],
		hour: "480",
		step: "10",
		type: "Plant"
	},
	{
		id: "29",
		element: "Ice",
		baseLE: [800, 850, 911, 1151],
		hour: "96",
		step: "1",
		type: "Plant"
	},
	{
		id: "30",
		element: "Fire",
		baseLE: [650, 700, 811, 1001],
		hour: "72",
		step: "1",
		type: "Plant"
	},
	{
		id: "31",
		element: "Dark",
		baseLE: [1200, 1840, 2211, 2401],
		hour: "192",
		step: "10",
		type: "Plant"
	},
	{
		id: "32",
		element: "Electro",
		baseLE: [650, 700, 811, 1001],
		hour: "60",
		step: "1",
		type: "Plant"
	},
	{
		id: "33",
		element: "Dark",
		baseLE: [1400, 2040, 2411, 2701],
		hour: "216",
		step: "10",
		type: "Plant"
	},
	{
		id: "34",
		element: "Electro",
		baseLE: [650, 700, 811, 1001],
		hour: "60",
		step: "1",
		type: "Plant"
	},
	{
		id: "35",
		element: "Dark",
		baseLE: [1400, 2040, 2411, 2701],
		hour: "216",
		step: "10",
		type: "Plant"
	},
	{
		id: "36",
		element: "Water",
		baseLE: [950, 1040, 1111, 1301],
		hour: "108",
		step: "1",
		type: "Plant"
	},
	{
		id: "37",
		element: "Wind",
		baseLE: [900, 950, 1011, 1151],
		hour: "96",
		step: "1",
		type: "Plant"
	},
	{
		id: "38",
		element: "Water",
		baseLE: [1050, 1140, 1211, 1401],
		hour: "120",
		step: "1",
		type: "Plant"
	},
	{
		id: "39",
		element: "Water",
		baseLE: [1050, 1140, 1211, 1401],
		hour: "120",
		step: "1",
		type: "Plant"
	},
	{
		id: "90",
		element: "Fire",
		baseLE: [750, 1040, 1211, 1401],
		hour: "48",
		step: "5",
		type: "Mother tree"
	},
	{
		id: "91",
		element: "Light",
		baseLE: [1400, 1690, 1851, 2021],
		hour: "240",
		step: "5",
		type: "Mother tree"
	},
	{
		id: "92",
		element: "Ice",
		baseLE: [1050, 1340, 1511, 1701],
		hour: "96",
		step: "5",
		type: "Mother tree"
	},
	{
		id: "93",
		element: "Dark",
		baseLE: [2600, 2890, 3061, 3201],
		hour: "216",
		step: "5",
		type: "Mother tree"
	}
];


export default PlantInfo;
