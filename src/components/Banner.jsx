import { Container } from "@material-ui/core";
import TrendingCoins from "./TrendingCoins";
import "./Banner.css";
function Banner() {
  return (
    <div className="bannerContent">
      <Container className="banner">
        <div className="bannerTitle">
          <h1>Crypto</h1>
          <div className="paragraph">
            get all the information about the crypto currency
          </div>
        </div>
        <TrendingCoins />
      </Container>
    </div>
  );
}

export default Banner;
