import CoinInfo from "../components/CoinInfo";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CryptoContext from "../context/CryptoContext";
import Chart from "../components/Chart";
import "./Cryptopage.css";
function Cryptopage() {
  const { id } = useParams();
  const [singleCoin, setSingleCoin] = useState();
  const [loading, setLoading] = useState(true);
  const { currency, symbol } = useContext(CryptoContext);

  const fetchCoin = async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
      const data = await res.json();
      setSingleCoin(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCoin();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return <CoinInfo details={singleCoin} />;
}

export default Cryptopage;
