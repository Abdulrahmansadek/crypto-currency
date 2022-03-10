import { useContext } from "react";
import "./Header.css";
import CryptoContext from "../context/CryptoContext";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
function Header() {
  const { currency, setCurrency } = useContext(CryptoContext);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography className="title">
              <p>Crypto Coins</p>
            </Typography>

            <Select
              variant="outlined"
              className="selectItem"
              value={currency}
              onChange={handleCurrencyChange}
            >
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
