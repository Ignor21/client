import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TutorialDataService from "../services/tutorial.service";

const mdTheme = createTheme();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenPrice: {price: '0'},
      time: '',
      dates: []
    };
  }

  componentDidMount() {
    this.load()
    
    var data = {
      title: "title",
      description: "descript"
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  load = () => {
    /*let time = new Date('2021/09/22 01:25:00 +0000')
    let newDateObj = new Date(time);
    newDateObj.setMinutes(newDateObj.getMinutes() - 30);
    let dates = []
    for(let i = 0; i < 5; i++) {
      let obj = {}
      newDateObj.setMinutes(newDateObj.getMinutes() + 30);
      obj.time1 = newDateObj.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'});
      newDateObj.setMinutes(newDateObj.getMinutes() + 30);
      obj.time2 = newDateObj.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'});
      newDateObj.setMinutes(newDateObj.getMinutes() + 30);
      obj.time3 = newDateObj.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'});
      newDateObj.setMinutes(newDateObj.getMinutes() + 30);
      obj.time4 = newDateObj.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'});
      newDateObj.setMinutes(newDateObj.getMinutes() + 30);
      obj.time5 = newDateObj.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'});
      newDateObj.setMinutes(newDateObj.getMinutes() + 30);
      obj.time6 = newDateObj.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'});
      newDateObj.setMinutes(newDateObj.getMinutes() + 30);
      obj.time7 = newDateObj.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'});
      newDateObj.setMinutes(newDateObj.getMinutes() + 30);
      obj.time8 = newDateObj.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'});
      newDateObj.setMinutes(newDateObj.getMinutes() + 30);
      obj.time9 = newDateObj.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'});
      newDateObj.setMinutes(newDateObj.getMinutes() + 30);
      obj.time10 = newDateObj.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'});
      dates.push(obj)
    }
    let myTime = new Date()
    let hours = myTime.getHours()
    let minutes = myTime.getMinutes()
    if(minutes < 25) {
      minutes = 55
      if(hours === 0) {
        hours = 23
      }
      else {
        hours -= 1
      }
    }
    else if(minutes > 25 && minutes < 55){
      minutes = 25
    }
    else if(minutes > 55){
      minutes = 55
    }
    if(hours < 10) {hours = '0' + hours}
    this.setState({time: hours + ':' + minutes, dates})*/
	this.callBackendAPI()
      .then(res => console.log(res))
      .catch(err => console.log(err));
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
    const { tokenPrice, time, dates } = this.state;
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Container align='center' component="main" sx={{ mt: 4, mb: 2 }} maxWidth="md">
            {/*<TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Group 1</TableCell>
                    <TableCell align='center'>Group 2</TableCell>
                    <TableCell align='center'>Group 3</TableCell>
                    <TableCell align='center'>Group 4</TableCell>
                    <TableCell align='center'>Group 5</TableCell>
                    <TableCell align='center'>Group 6</TableCell>
                    <TableCell align='center'>Group 7</TableCell>
                    <TableCell align='center'>Group 8</TableCell>
                    <TableCell align='center'>Group 9</TableCell>
                    <TableCell align='center'>Group 10</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dates.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align='center' style={{backgroundColor: row.time1 === time && '#1976d2', color: row.time1 === time && '#fff'}}>{row.time1}</TableCell>
                      <TableCell align='center' style={{backgroundColor: row.time2 === time && '#1976d2', color: row.time2 === time && '#fff'}}>{row.time2}</TableCell>
                      <TableCell align='center' style={{backgroundColor: row.time3 === time && '#1976d2', color: row.time3 === time && '#fff'}}>{row.time3}</TableCell>
                      <TableCell align='center' style={{backgroundColor: row.time4 === time && '#1976d2', color: row.time4 === time && '#fff'}}>{row.time4}</TableCell>
                      <TableCell align='center' style={{backgroundColor: row.time5 === time && '#1976d2', color: row.time5 === time && '#fff'}}>{row.time5}</TableCell>
                      <TableCell align='center' style={{backgroundColor: row.time6 === time && '#1976d2', color: row.time6 === time && '#fff'}}>{row.time6}</TableCell>
                      <TableCell align='center' style={{backgroundColor: row.time7 === time && '#1976d2', color: row.time7 === time && '#fff'}}>{row.time7}</TableCell>
                      <TableCell align='center' style={{backgroundColor: row.time8 === time && '#1976d2', color: row.time8 === time && '#fff'}}>{row.time8}</TableCell>
                      <TableCell align='center' style={{backgroundColor: row.time9 === time && '#1976d2', color: row.time9 === time && '#fff'}}>{row.time9}</TableCell>
                      <TableCell align='center' style={{backgroundColor: row.time10 === time && '#1976d2', color: row.time10 === time && '#fff'}}>{row.time10}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{minHeight: '2vh'}} />*/}
            <Container component="main" maxWidth="xs">
              <Typography variant="h4">
                GROUPS ARE GONE!
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell align='center'>1 PVU = {Number(tokenPrice.price).toFixed(2)} $</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>1 PVU = 105 LE</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>500 LE = 1 PVU</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>550 LE = 1 PVU (from 27.09)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Container>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
}

export default Home;
