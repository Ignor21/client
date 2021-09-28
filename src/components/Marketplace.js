import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

const mdTheme = createTheme();

class Marketplace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      date: 0,
      plants: []
    };
  }

  componentDidMount() {
    this.load()
  }

  load = () => {
    var url = "https://backend-farm.plantvsundead.com/get-plants-filter-v2?offset=0&limit=100000&type=1";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    //xhr.setRequestHeader("authorization", "Bearer Token: ");
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let plants = this.state.plants
          plants = JSON.parse(xhr.responseText).data
          plants.sort((a, b) => (b.config.farm.le / b.config.farm.hours) / b.endingPrice - (a.config.farm.le / a.config.farm.hours) / a.endingPrice);
          let date = Date.parse(new Date()) / 1000;
          this.setState({plants, date, loaded: true})
        }
      }
    }.bind(this);
    xhr.send();
  }

  reload = () => {
    this.setState({
      loaded: false,
      plants: []
    }, () => {
      this.load()
    });
  }

  validatingJSON = (json) => {
    let checkedjson
    try {
        checkedjson = JSON.parse(json)
    } catch (e) {

    }
    return checkedjson
  }

  rounded = (number) => {
    return number.toFixed(2);
  }

  sort = (type) => {
    let plants = this.state.plants
    switch (type) {
      case 'id':
        plants.sort((a, b) => a.id - b.id);
        this.setState({plants})
        break;
      case 'price':
        plants.sort((a, b) => a.endingPrice - b.endingPrice);
        this.setState({plants})
        break;
      case 'duration':
        plants.sort((a, b) => b.timeSell - a.timeSell);
        this.setState({plants})
        break;
      case 'gain':
        plants.sort((a, b) => b.config.farm.le / b.config.farm.hours - a.config.farm.le / a.config.farm.hours);
        this.setState({plants})
        break;
      case 'eff':
        plants.sort((a, b) => (b.config.farm.le / b.config.farm.hours) / b.endingPrice - (a.config.farm.le / a.config.farm.hours) / a.endingPrice);
        this.setState({plants})
        break;
      default:
        break;
    }
  }

  render() {
    const { loaded, plants, date } = this.state;
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Container component="main" sx={{ mt: 4, mb: 2 }} maxWidth="lg">
            <div>
              {loaded ?
                <div>
                  <div className="Load">
                    Seeds on market: {plants.length}
                  </div>
                  <div className="Load">
                  <Button onClick={this.reload} variant="outlined">Refresh</Button>
                  </div>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'><Button variant="text" onClick={() => this.sort('id')}>ID</Button></TableCell>
                        <TableCell align='center'><Button variant="text" disabled>Type</Button></TableCell>
                        <TableCell align='center'><Button variant="text" onClick={() => this.sort('price')}>Price</Button></TableCell>
                        <TableCell align='center'><Button variant="text" onClick={() => this.sort('duration')}>Duration</Button></TableCell>
                        <TableCell align='center'><Button variant="text" onClick={() => this.sort('gain')}>LE / hours</Button></TableCell>
                        <TableCell align='center'><Button variant="text" onClick={() => this.sort('gain')}>LE per hour</Button></TableCell>
                        <TableCell align='center'><Button variant="text" onClick={() => this.sort('gain')}>LE per day</Button></TableCell>
                        <TableCell align='center'><Button variant="text" onClick={() => this.sort('eff')} endIcon={<ArrowDownward />}>Return in days</Button></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {plants.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell align='center'>
                            <a href={'https://marketplace.plantvsundead.com/farm#/plant/' + row.id}>
                              {row.id}
                            </a>
                          </TableCell>
                          <TableCell align='center'>{row.config.stats.type}</TableCell>
                          <TableCell align='center'>{row.endingPrice}</TableCell>
                          <TableCell align='center'>{this.rounded((date - row.timeSell) / 3600)} hours</TableCell>
                          <TableCell align='center'>{row.config.farm.le} / {row.config.farm.hours}</TableCell>
                          <TableCell align='center'>{this.rounded(row.config.farm.le / row.config.farm.hours)}</TableCell>
                          <TableCell align='center'>{this.rounded((row.config.farm.le / row.config.farm.hours) * 24)}</TableCell>
                          <TableCell align='center'>{this.rounded((row.endingPrice * 150) / (row.config.farm.le / row.config.farm.hours) / 24)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              :
                <div>
                  <div className="Load">
                    Loading... (might take a while)
                  </div>
                </div>
              }
            </div>
          </Container>
      </Box>
    </ThemeProvider>
    );
  }
}

export default Marketplace;
