import { useEffect, useContext, useState } from "react";
import CryptoContext from "../context/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import "./TrendingCoins.css";
import { Link } from "react-router-dom";
function TrendingCoins() {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = useContext(CryptoContext);
  const fetchTrendCoins = async () => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    );
    const data = await res.json();
    setTrending(data);
  };
  useEffect(() => {
    fetchTrendCoins();
    console.log(trending);
  }, [currency]);

  const items = trending.map((coin) => {
    let changePrecentage = coin.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coin/${coin.id}`} className="coinItem">
        <img src={coin.image} alt={coin.name} className="coinImage" />
        <span className="currencySymbol">
          {coin.symbol}
          &nbsp;
          <span className={changePrecentage ? "plus" : "min"}>
            {changePrecentage && "+"}
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span className="coinPrice">
          {coin.current_price.toFixed(2)}
          {symbol}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="trendingCoins">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        responsive={responsive}
        autoPlay
        items={items}
        disableButtonsControls
        disableDotsControls
      />
    </div>
  );
}

export default TrendingCoins;
