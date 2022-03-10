import { ThemeProvider } from "@material-ui/styles";
import {
  Container,
  createTheme,
  TableContainer,
  Table,
  TableRow,
  Typography,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import CryptoContext from "../context/CryptoContext";
import "./CoinsTable.css";
import SearchCoins from "./SearchCoins";

function CoinsTable() {
  const [coinsList, setCoinsList] = useState([]);
  const [page, setPage] = useState(1);
  const { currency, symbol } = useContext(CryptoContext);
  const fetchCoinsList = async () => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    const data = await res.json();
    setCoinsList(data);
  };

  useEffect(() => {
    fetchCoinsList();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const handleFilter = (coin) => {
    return coinsList.filter((cur) => {
      cur.name.toLowerCase().includes(coin) ||
        cur.symbol.toLowerCase().includes(coin);
    });
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          style={{ margin: 18, fontFamily: "Montserrat" }}
          variant="h4"
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <SearchCoins onFilter={handleFilter} />

        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead className="tableHead">
              <TableRow>
                <TableCell
                  style={{
                    color: "black",
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                    align: "left",
                  }}
                >
                  Coin
                </TableCell>
                <TableCell
                  style={{
                    color: "black",
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                    align: "right",
                  }}
                >
                  Price
                </TableCell>
                <TableCell
                  style={{
                    color: "black",
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                    align: "right",
                  }}
                >
                  24h change
                </TableCell>

                <TableCell
                  style={{
                    color: "black",
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                    align: "right",
                  }}
                >
                  Market cap
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coinsList
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((cur, idx) => {
                  let changePrice = cur.price_change_24h >= 0;
                  return (
                    <TableRow key={idx}>
                      <Link to={`/coins/${cur.id}`}>
                        <TableCell
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={cur.image}
                            alt={cur.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div className="coinTable">
                            <span className="coinSymbolTable">
                              {cur.symbol}
                            </span>
                            <span className="coinNameTable">{cur.name}</span>
                          </div>
                        </TableCell>
                      </Link>
                      <TableCell>
                        {symbol}
                        {cur.current_price.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <p className={changePrice ? "plus" : "min"}>
                          {cur.price_change_percentage_24h.toFixed(2)}%
                        </p>
                      </TableCell>
                      <TableCell>
                        {cur.market_cap_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination coinsList={coinsList} setPage={setPage} />
      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;
