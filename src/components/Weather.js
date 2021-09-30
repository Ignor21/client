import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import PvuDataService from "../services/pvu.service";

const mdTheme = createTheme();

const posArray = ['+10%', '+20%', '+30%', '+40%', '+50%', '+60%', '+70%', '+80%', '+90%', '+100%', '+110%', '+120%', '+130%', '+140%', '+150%', '+200%', '+400%']
const negArray = ['-10%', '-20%', '-30%', '-40%', '-50%', '-60%', '-70%', '-80%', '-90%', '-100%', '-110%', '-120%', '-130%', '-140%', '-150%', '-200%', '-400%']

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenPrice: {},
      currentSeason: '',
      season: '',
      tommorowSeason: '',
      currentDay: 0,
      data: [{date: '', season: '', weather: '', effect: ''}, {date: '', season: '', weather: '', effect: ''}]
    };
  }

  componentDidMount() {
    this.load()

    PvuDataService.getWeatherHistory()
      .then(response => {
        let day = 0
        let seasonNow = response.data[0].season
        response.data.forEach(element => {
          if(element.season === seasonNow){
            day += 1
          }
        })
        let tommorowSeason = seasonNow
        if(day === 7){
          if(seasonNow === 'Winter') {tommorowSeason = 'Spring'}
          if(seasonNow === 'Spring') {tommorowSeason = 'Summer'}
          if(seasonNow === 'Summer') {tommorowSeason = 'Autumn'}
          if(seasonNow === 'Autumn') {tommorowSeason = 'Winter'}
        }
        this.setState({data: response.data, currentSeason: seasonNow, season: tommorowSeason, currentDay: day, tommorowSeason: tommorowSeason})
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

  ordinal_suffix_of = (i) => {
    let j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
  }

  setSeason = (season) => {
    switch (season) {
      case 'Winter':
        this.setState({season});
        break;
      case 'Spring':
        this.setState({season});
        break;
      case 'Summer':
        this.setState({season});
        break;
      case 'Autumn':
        this.setState({season});
        break;
      default:
        break;
    }
  }

  render() {
    const { season, currentSeason, data, currentDay, tommorowSeason } = this.state;
    const w1 = data[0].weather;
    const w2 = data[1].weather;
    return (
      <ThemeProvider theme={mdTheme}>
      {season !== '' &&
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Container align='center' component="main" sx={{ mt: 4, mb: 2 }} maxWidth="md">
            <Typography variant="h4">
              Weather for {data[0].date}
            </Typography>
            <Typography variant="h6">
              Today is the {this.ordinal_suffix_of(currentDay)} {currentDay === 7 && '(last)'} day of {currentSeason}
            </Typography>
            <Typography variant="h6">
              Weather event: {data[0].weather}
            </Typography>
            <Typography variant="h6">
              Effect from event: {data[0].effect}
            </Typography>
            <Box sx={{mt: 2}} />
            <Divider />
            <Box sx={{mt: 2}}>
              <Container>
                <Button variant={season === 'Winter' ? "contained" : "outlined"} size='small' onClick={() => this.setSeason('Winter')}>Winter</Button>
                <Button sx={{ml: 1}} variant={season === 'Spring' ? "contained" : "outlined"} size='small' onClick={() => this.setSeason('Spring')}>Spring</Button>
                <Button sx={{ml: 1}} variant={season === 'Summer' ? "contained" : "outlined"} size='small' onClick={() => this.setSeason('Summer')}>Summer</Button>
                <Button sx={{ml: 1}} variant={season === 'Autumn' ? "contained" : "outlined"} size='small' onClick={() => this.setSeason('Autumn')}>Autumn</Button>
              </Container>
              {season === tommorowSeason &&
                <Box sx={{mt: 1}}>
                  <Typography variant="h6">
                    Possible tomorrow
                  </Typography>
                </Box>
              }
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Weather event</TableCell>
                      <TableCell align='center'>Fire</TableCell>
                      <TableCell align='center'>Ice</TableCell>
                      <TableCell align='center'>Water</TableCell>
                      <TableCell align='center'>Electro</TableCell>
                      <TableCell align='center'>Wind</TableCell>
                      <TableCell align='center'>Light</TableCell>
                      <TableCell align='center'>Dark</TableCell>
                      <TableCell align='center'>Parasite</TableCell>
                      <TableCell align='center'>Metal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {weather[season].map((row) => {
                      const tit = row.title
                      const eff = row.effects
                      return (
                      <TableRow>
                        <TableCell align='center'>
                          {(tit === w1 || tit === w2) && season === tommorowSeason ? <s>{tit}</s> : tit}
                        </TableCell>
                        <TableCell align='center' style={{color: posArray.includes(eff.Fire) ? '#4caf50' : negArray.includes(eff.Fire) && '#ef5350'}}>
                          {(tit === w1 || tit === w2) && season === tommorowSeason ? <s>{eff.Fire ? eff.Fire : '0%'}</s> : eff.Fire ? eff.Fire : '0%'}
                        </TableCell>
                        <TableCell align='center' style={{color: posArray.includes(eff.Ice) ? '#4caf50' : negArray.includes(eff.Ice) && '#ef5350'}}>
                          {(tit === w1 || tit === w2) && season === tommorowSeason ? <s>{eff.Ice ? eff.Ice : '0%'}</s> : eff.Ice ? eff.Ice : '0%'}
                        </TableCell>
                        <TableCell align='center' style={{color: posArray.includes(eff.Water) ? '#4caf50' : negArray.includes(eff.Water) && '#ef5350'}}>
                          {(tit === w1 || tit === w2) && season === tommorowSeason ? <s>{eff.Water ? eff.Water : '0%'}</s> : eff.Water ? eff.Water : '0%'}
                        </TableCell>
                        <TableCell align='center' style={{color: posArray.includes(eff.Electro) ? '#4caf50' : negArray.includes(eff.Electro) && '#ef5350'}}>
                          {(tit === w1 || tit === w2) && season === tommorowSeason ? <s>{eff.Electro ? eff.Electro : '0%'}</s> : eff.Electro ? eff.Electro : '0%'}
                        </TableCell>
                        <TableCell align='center' style={{color: posArray.includes(eff.Wind) ? '#4caf50' : negArray.includes(eff.Wind) && '#ef5350'}}>
                          {(tit === w1 || tit === w2) && season === tommorowSeason ? <s>{eff.Wind ? eff.Wind : '0%'}</s> : eff.Wind ? eff.Wind : '0%'}
                        </TableCell>
                        <TableCell align='center' style={{color: posArray.includes(eff.Light) ? '#4caf50' : negArray.includes(eff.Light) && '#ef5350'}}>
                          {(tit === w1 || tit === w2) && season === tommorowSeason ? <s>{eff.Light ? eff.Light : '0%'}</s> : eff.Light ? eff.Light : '0%'}
                        </TableCell>
                        <TableCell align='center' style={{color: posArray.includes(eff.Dark) ? '#4caf50' : negArray.includes(eff.Dark) && '#ef5350'}}>
                          {(tit === w1 || tit === w2) && season === tommorowSeason ? <s>{eff.Dark ? eff.Dark : '0%'}</s> : eff.Dark ? eff.Dark : '0%'}
                        </TableCell>
                        <TableCell align='center' style={{color: posArray.includes(eff.Parasite) ? '#4caf50' : negArray.includes(eff.Parasite) && '#ef5350'}}>
                          {(tit === w1 || tit === w2) && season === tommorowSeason ? <s>{eff.Parasite ? eff.Parasite : '0%'}</s> : eff.Parasite ? eff.Parasite : '0%'}
                        </TableCell>
                        <TableCell align='center' style={{color: posArray.includes(eff.Metal) ? '#4caf50' : negArray.includes(eff.Metal) && '#ef5350'}}>
                          {(tit === w1 || tit === w2) && season === tommorowSeason ? <s>{eff.Metal ? eff.Metal : '0%'}</s> : eff.Metal ? eff.Metal : '0%'}
                        </TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{mt: 3}}>
              <Typography variant="h6">
                History
              </Typography>
              {data.map((item, index) => (
                index !== 0 &&
                  <Box sx={{mb: 1, mt: 2}}>
                    <Box sx={{mb: 1}}>
                      <Typography align='left' variant="subtitle2">
                        Date: {item.date}
                      </Typography>
                      <Typography align='left' variant="subtitle2">
                        Season: {item.season}
                      </Typography>
                      <Typography style={{whiteSpace: 'pre-line'}} align='left' variant="subtitle2">
                        Weather: {item.weather} ({item.effect})
                      </Typography>
                    </Box>
                    <Divider />
                  </Box>
              ))}
            </Box>
          </Container>
        </Box>
      }
      </ThemeProvider>
    );
  }
}

export default Weather;

const weather = {
  Winter: [
    {
      title: 'Cold Wave',
      effects: {
        Fire: '-60%',
        Ice: '+120%'
      }
    },
    {
      title: 'Coronal Mass Ejection',
      effects: {
        Fire: '+40%',
        Light: '+100%'
      }
    },
    {
      title: 'Earthquake',
      effects: {
        Metal: '+100%',
        Wind: '+50%',
      }
    },
    {
      title: 'Magnetic Reconnection',
      effects: {
        Electro: '+50%',
        Metal: '+50%',
      }
    },
    {
      title: 'Snowy',
      effects: {
        Ice: '+100%',
        Water: '+60%',
        Fire: '-40%',
      }
    },
    {
      title: 'Solar Flares',
      effects: {
        Fire: '+80%',
        Light: '+80%',
      }
    },
    {
      title: 'Solar Maxima',
      effects: {
        Fire: '+40%',
        Light: '+100%',
      }
    },
    {
      title: 'Volcano',
      effects: {
        Fire: '+100%',
        Metal: '+40%',
        Water: '-20%',
        Ice: '-40%'
      }
    },
    {
      title: 'Windy',
      effects: {
        Wind: '+50%',
        Light: '+20%',
      }
    },
    {
      title: 'Winter Storm',
      effects: {
        Ice: '+60%',
        Electro: '+50%',
        Wind: '+10%',
        Light: '-20%',
        Fire: '-40%',
      }
    },
  ],
  Spring: [
    {
      title: 'Cloudy',
      effects: {
        Light: '-10%',
        Wind: '-50%'
      }
    },
    {
      title: 'Earthquake',
      effects: {
        Metal: '+100%',
        Wind: '+50%'
      }
    },
    {
      title: 'Hurricanes',
      effects: {
        Wind: '+50%',
        Water: '+50%',
        Electro: '+50%',
        Ice: '+40%',
        Dark: '+40%',
        Light: '-20%',
        Fire: '-40%',
      }
    },
    {
      title: 'Iron Rain',
      effects: {
        Metal: '+120%',
        Water: '+40%',
      }
    },
    {
      title: 'Locusts Swarm',
      effects: {
        Parasite: '+100%',
      }
    },
    {
      title: 'Malaria',
      effects: {
        Parasite: '+100%',
      }
    },
    {
      title: 'Rainy',
      effects: {
        Water: '+100%',
        Fire: '-30%',
        Metal: '-30%',
      }
    },
    {
      title: 'Rats Swarm',
      effects: {
        Parasite: '+100%',
      }
    },
    {
      title: 'Sunny',
      effects: {
        Fire: '+60%',
        Water: '-30%'
      }
    },
    {
      title: 'Tsunami',
      effects: {
        Ice: '+30%',
        Water: '+60%',
        Dark: '+20%',
        Light: '-20%',
        Fire: '-40%',
        Metal: '-60%'
      }
    },
    {
      title: 'Volcano',
      effects: {
        Fire: '+100%',
        Metal: '+40%',
        Water: '-20%',
        Ice: '-40%'
      }
    },
  ],
  Summer: [
    {
      title: 'Cloudy',
      effects: {
        Light: '-10%',
        Wind: '-50%'
      }
    },
    {
      title: 'Coronal Mass Ejection',
      effects: {
        Fire: '+40%',
        Light: '+100%'
      }
    },
    {
      title: 'Earthquake',
      effects: {
        Metal: '+100%',
        Wind: '+50%'
      }
    },
    {
      title: 'Heat Wave',
      effects: {
        Fire: '+100%',
        Light: '+20%',
        Dark: '+10%',
        Water: '-30%',
        Ice: '-60%'
      }
    },
    {
      title: 'Hurricanes',
      effects: {
        Wind: '+50%',
        Water: '+50%',
        Electro: '+50%',
        Ice: '+40%',
        Dark: '+40%',
        Light: '-20%',
        Fire: '-40%',
      }
    },
    {
      title: 'Locusts Swarm',
      effects: {
        Parasite: '+100%',
      }
    },
    {
      title: 'Malaria',
      effects: {
        Parasite: '+100%',
      }
    },
    {
      title: 'Proton Storm',
      effects: {
        Light: '+200%',
      }
    },
    {
      title: 'Rainy',
      effects: {
        Water: '+100%',
        Fire: '-30%',
        Metal: '-30%',
      }
    },
    {
      title: 'Rats Swarm',
      effects: {
        Parasite: '+100%',
      }
    },
    {
      title: 'Solar Flares',
      effects: {
        Fire: '+80%',
        Light: '+80%',
      }
    },
    {
      title: 'Solar Maxima',
      effects: {
        Fire: '+40%',
        Light: '+100%',
      }
    },
    {
      title: 'Sunny',
      effects: {
        Fire: '+60%',
        Water: '-30%'
      }
    },
    {
      title: 'Thunderstorm',
      effects: {
        Electro: '+100%',
        Water: '+10%',
        Dark: '+100%',
        Light: '-20%',
        Metal: '-20%'
      }
    },
    {
      title: 'Tornado',
      effects: {
        Wind: '+100%',
        Electro: '+50%',
        Dark: '+50%',
        Water: '+20%',
        Light: '-40%'
      }
    },
    {
      title: 'Tsunami',
      effects: {
        Ice: '+30%',
        Water: '+60%',
        Dark: '+20%',
        Light: '-20%',
        Fire: '-40%',
        Metal: '-60%'
      }
    },
    {
      title: 'Volcano',
      effects: {
        Fire: '+100%',
        Metal: '+40%',
        Water: '-20%',
        Ice: '-40%'
      }
    },
  ],
  Autumn: [
    {
      title: 'Cloudy',
      effects: {
        Light: '-10%',
        Wind: '-50%'
      }
    },
    {
      title: 'Earthquake',
      effects: {
        Metal: '+100%',
        Wind: '+50%'
      }
    },
    {
      title: 'Flood',
      effects: {
        Water: '+100%',
        Metal: '-100%'
      }
    },
    {
      title: 'Hurricanes',
      effects: {
        Wind: '+50%',
        Water: '+50%',
        Electro: '+50%',
        Ice: '+40%',
        Dark: '+40%',
        Light: '-20%',
        Fire: '-40%',
      }
    },
    {
      title: 'Iron Rain',
      effects: {
        Metal: '+120%',
        Water: '+40%',
      }
    },
    {
      title: 'Locusts Swarm',
      effects: {
        Parasite: '+100%',
      }
    },
    {
      title: 'Malaria',
      effects: {
        Parasite: '+100%',
      }
    },
    {
      title: 'Moonlight',
      effects: {
        Dark: '+400%',
      }
    },
    {
      title: 'Rainy',
      effects: {
        Water: '+100%',
        Fire: '-30%',
        Metal: '-30%',
      }
    },
    {
      title: 'Rats Swarm',
      effects: {
        Parasite: '+100%',
      }
    },
    {
      title: 'Sunny',
      effects: {
        Fire: '+60%',
        Water: '-30%'
      }
    },
    {
      title: 'Thunderstorm',
      effects: {
        Electro: '+100%',
        Water: '+10%',
        Dark: '+100%',
        Light: '-20%',
        Metal: '-20%'
      }
    },
    {
      title: 'Tornado',
      effects: {
        Wind: '+100%',
        Electro: '+50%',
        Dark: '+50%',
        Water: '+20%',
        Light: '-40%'
      }
    },
    {
      title: 'Tsunami',
      effects: {
        Ice: '+30%',
        Water: '+60%',
        Dark: '+20%',
        Light: '-20%',
        Fire: '-40%',
        Metal: '-60%'
      }
    },
    {
      title: 'Volcano',
      effects: {
        Fire: '+100%',
        Metal: '+40%',
        Water: '-20%',
        Ice: '-40%'
      }
    },
    {
      title: 'Windy',
      effects: {
        Wind: '+50%',
        Light: '+20%',
      }
    },
    {
      title: 'Winter Storm',
      effects: {
        Ice: '+60%',
        Electro: '+50%',
        Wind: '+10%',
        Light: '-20%',
        Fire: '-40%',
      }
    },
  ],
}