import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PvuDataService from "../services/pvu.service";

const mdTheme = createTheme();

const posts = [
  {
    title: 'PVP and Factory Chain',
    date: '21.09.2021',
    text: 'Dear PVUers,\n\n Today we have 2 big announcements for you guys. We urge you to read the following announcement in its entirety before making any assumptions or questions.\n\n Firstly, our beta for PvP mode for Plant vs Undead will be released mid-October on our new chain: Factory chain, which means this mode will use a separate ecosystem along with a new token. Here is a brief explanation of how the process is going to work:\n\n * During the initial release of PvP mode, Players who already own assets in Farm mode will be able to replicate all their assets into PvP mode and start playing with their NFTs.\n\n * One week after the release of PvP mode, Farm mode and PvP mode will be developed independently. After this point, players can no longer transfer assets between the 2 modes.\n\n * To ease players into the new ecosystem and lower the volatility of the new token, 30% of the current PVU liquidity pool on Pancakeswap will be allocated to the swap pool for PvP mode on FAC chain. This also allows players to swap for the new token as soon as it becomes available.\n\n * We will also continue to add at least 4000 BNB into the current PVU pool on Pancake Swap (until it time to allocate some of that to the pool on FAC Chain) to further expand and stabilize PVU’s price. 1500 BNB has been added thus far (You can check this information in the announcement earlier on our Telegram Announcement Channel).\n\n This change will actually benefit both the players and developers.\n\n * For players: players can earn income from both games independently\n\n * For developers: we can improve the core gameplay of two games separately without fear of one game affecting the balance of the other. (we have already expanded into 2 separate teams so that both games will have sufficient human resources)\n\n Secondly, although PvP mode will be its own game, PvE mode will be integrated into Farm mode. Update 3.0, which includes PvE mode, will be released in Q4, 2021, so stay tuned.\n\n In the meantime, LE -> PVU exchange rate will increase by 10% every week to be in line with our initial design of Farm mode. This change will first take effect at 00:00 UTC on Monday, Sept 27th, 2021. This means that, at this specified time, the LE -> PVU exchange rate will increase by 10% for the first time from 150 LE = 1 PVU to 165 LE = 1 PVU.\n\n This mechanic will remain in effect until farm 3.0 comes out, and then PvE mode and other new mechanics will replace it.\n\n Q&A:\n\n Q: What will happen to Farm mode if PvP mode is released on a new blockchain?\n\n A: Farm mode will remain on BSC. Technically, nothing is changed for players who have already played the game. However, this mode now has the liberty to develop into a complete game.\n\n Q: When will Farm 3.0 come out?\n\n A: Expected to be released in Q4, 2021. Update 3.0 will mark the divergence between farm mode and PvP mode. As for the specific date date, stay tuned for further announcements.\n\n Q: How do I transfer my assets from Farm mode to PvP mode?\n\n A: You don’t have to do anything, actually. Before the launch of PvP mode, the game server will be shut down temporarily for us to clone all assets currently existing in farm mode to PvP mode. Once this process is finished, players can log into PvP mode using the same wallet, and their assets would show up.\n\n Q: After I have transferred my assets from Farm mode to PvP mode, will my assets in farm mode disappear?\n\n A: No, the assets will be cloned, and you will own assets in both games.\n\n Q: How many times can I transfer my assets?\n\n A: 1 time only.\n\n Q: Is the income in both games the same?\n\n A: No, they are separated. You can play both games and earn double the amount.\n\n Q: What are the ways to gain assets in PvP mode?\n\n A: Besides cloning your assets from farm mode, new plants will be sold in the marketplace of PvP mode.\n\n Q: Can I transfer my PVU tokens?\n\n A: No. Since PvP mode will be released on a new blockchain, it will use a different token. However, you can buy the new token with BUSD.'
  },
  {
    title: 'Android APP',
    date: '19.09.2021',
    text: "The APK app (Android Phone) for farm mode is now available for download. You can download this file from our main Website > Download > Android. If you haven't checked out our demo for PVP mode, you can find it in the same place."
  },
  {
    title: 'FARM 2.5',
    date: '05.09.2021',
    text: 'The World Tree\n\n The World Tree aims to replace the current daily quest system by rewarding all players who participate in growing it. The more players participate, the more rewards they receive.\n\n Here’s how it works:\n\n * Every day, players from the entire server give water to the World Tree (minimum is 20 water per player).\n\n * Each reward requires a specific amount of water given from the entire server.\n\n * Once the water requirement is reached, all players who have given water to the World Tree can claim the corresponding reward.\n\n First-week booster\n\n To guide you guys to your first in-game NFT, we have decided to increase the rewards from the World Tree in the first week. Rewards are as follow:\n\n * Reward 1: 10LE + 1 Sunflower Sapling – Requirement: 4,000,000 water\n\n * Reward 2: 15LE + 1 Sunflower Saplings – Requirement: 6,000,000 water\n\n * Reward 3: 25LE + 2 Sunflower Saplings – Requirement: 9,000,000 water\n\n * Reward 4: 1 Sun box + 2 Sunflower Saplings – Requirement: 12,000,000 water\n\n * Reward 5: Every plant is automatically fully watered for the next day + 50LE + 4 Sunflower Saplings – Requirement: 15,000,000 water\n\n After the first week, all saplings are removed from rewards, and the requirements for each day will correspond with the number of active players.\n\n Other changes\n\n * As per the previous announcement, we will implement two changes:\n\n * New Condition when exchanging LE -> PVU:\n\n * * 0 NFT: cannot exchange\n\n * * 1 plant: can exchange at 3 times the base rate (base rate is currently 100LE = 1 PVU)\n\n * * 2 plants or 1 land: can exchange at base rate\n\n * Implement an extra layer of bot detection on our server-side.\n\n * Watering and chasing crows for your neighbors are removed.\n\n Q&A:\n\n Q: Can players still play with low investment?\n\n A: Yes, you can. You simply grow Sunflower until you have enough LE to buy 100 Sunflower seeds, and then exchange those seeds for NFT plant. Sun boxes from daily quests also drop seeds if you’re lucky.\n\n Q: Is the LE I invested in the NFT plant is forever lost?\n\n A: Not at all. If you ever decided to leave the game, your NFT assets can be sold back to the market for PVU.\n\n Q: How do the new changes improve the server?\n\n A: The heaviest load for the server before was when players go to others’ farms. By removing this feature, the game should be able to handle a larger number of players at once.\n\n Q: How do the new changes reduce botting, using 3rd party tools, and spamming accounts?\n\n A: Before farm 2.5, there were no consequences to performing any actions above. Now, any individual who thinks about doing any of these risks getting banned and having at least 1 or more NFT be permanently removed. In other words, you are responsible for your own actions and if you’re willing to risk losing at least 100PVU of investment, then be it.\n\n Q: Can I still receive rewards from the World Tree if I give water later?\n\n A: Yes. The reward system works retroactively, meaning if you give water when the server has reached 3rd reward, you are able to claim rewards 1, 2, and 3.\n\n Q: What if I give water but forgot about claiming until the next day? Do I lose my rewards?\n\n A: No, we allow users to claim rewards from 1 day before if they forgot to claim it.'
  }
]

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

    PvuDataService.getHomePageData()
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
          {posts.map((item) => (
            <Box sx={{mb: 4}}>
              <Box sx={{mb: 2}}>
                <Typography align='left' variant="h5">
                  {item.title}
                </Typography>
                <Typography align='left' variant="subtitle2" gutterBottom>
                  {item.date}
                </Typography>
                <Typography style={{whiteSpace: 'pre-line'}} align='left' variant="body1">
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
