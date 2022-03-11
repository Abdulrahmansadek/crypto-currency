import { useContext } from "react";
import CryptoContext from "../context/CryptoContext";
import "./CoinInfo.css";
import ReactHtmlParser from "react-html-parser";

import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import Chart from "./Chart";
function CoinInfo({ details }) {
  const { currency, symbol } = useContext(CryptoContext);
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
      color: "white",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
      color: "white",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img src={details.image.large} alt={details.name} />
          <Typography variant="h3" className={classes.heading}>
            {details.name}
          </Typography>
          <Typography className={classes.description}>
            {ReactHtmlParser(details.description.en)}
          </Typography>
          <div className={classes.marketData}>
            <span className="priceInfo">
              <Typography variant="h5" className={classes.heading}>
                Rank: {details.market_cap_rank}
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" className={classes.heading}>
                CurrentPrice: {symbol}{" "}
                {details.market_data.current_price[currency.toLowerCase()]}
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" className={classes.heading}>
                Market Cap: {symbol}{" "}
                {details.market_data.market_cap[currency.toLowerCase()]}
              </Typography>
            </span>
          </div>
        </div>
        <Chart id={details.id} />
      </div>
    </>
  );
}

export default CoinInfo;
