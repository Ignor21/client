import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import PvuDataService from "../services/pvu.service";

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
    PvuDataService.getMarketplace()
      .then(response => {
        let plants = this.state.plants
        plants = response.data
        let date = Date.parse(new Date()) / 1000;
        this.setState({plants, date, loaded: true})
      })
      .catch(e => {
        console.log(e);
      });
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
        plants.sort((a, b) => b.le / b.hours - a.le / a.hours);
        this.setState({plants})
        break;
      case 'eff':
        plants.sort((a, b) => (b.le / b.hours) / b.endingPrice - (a.le / a.hours) / a.endingPrice);
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
            {loaded ?
              <Box>
                <Container align='center' component="main" sx={{ mb: 1 }} maxWidth="md">
                  <Typography variant="subtitle1">
                    {plants.length} new plants on marketplace {' '}
                  <Button onClick={this.reload} variant="outlined">Refresh</Button>
                  </Typography>
                </Container>
                <TableContainer>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'><Button variant="text" onClick={() => this.sort('id')}>ID</Button></TableCell>
                        <TableCell align='center'><Button variant="text" disabled>Type</Button></TableCell>
                        <TableCell align='center'><Button variant="text" onClick={() => this.sort('price')}>Price</Button></TableCell>
                        <TableCell align='center'><Button variant="text" onClick={() => this.sort('duration')} endIcon={<ArrowDownward />}>Duration</Button></TableCell>
                        <TableCell align='center'><Button variant="text" onClick={() => this.sort('gain')}>LE / hours</Button></TableCell>
                        <TableCell align='center'><Button variant="text" onClick={() => this.sort('gain')}>LE per hour</Button></TableCell>
                        <TableCell align='center'><Button variant="text" onClick={() => this.sort('gain')}>LE per day</Button></TableCell>
                        <TableCell align='center'><Button variant="text" onClick={() => this.sort('eff')}>Return in days</Button></TableCell>
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
                          <TableCell align='center'>{row.type}</TableCell>
                          <TableCell align='center'>{row.endingPrice}</TableCell>
                          <TableCell align='center'>{this.rounded((date - row.timeSell) / 3600)} hours</TableCell>
                          <TableCell align='center'>{row.le} / {row.hours}</TableCell>
                          <TableCell align='center'>{this.rounded(row.le / row.hours)}</TableCell>
                          <TableCell align='center'>{this.rounded((row.le / row.hours) * 24)}</TableCell>
                          <TableCell align='center'>{this.rounded((row.endingPrice * 150) / (row.le / row.hours) / 24)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            :
              <Container align='center' component="main" sx={{ mb: 2 }} maxWidth="md">
                <Typography variant="subtitle1">
                  Loading... (might take a while)
                </Typography>
              </Container>
            }
          </Container>
      </Box>
    </ThemeProvider>
    );
  }
}

export default Marketplace;
