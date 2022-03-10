import { useState } from "react";
import { TextField } from "@material-ui/core";
function SearchCoins() {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };
  return (
    <TextField
      value={search}
      onChange={handleSearch}
      label="search for currency..."
      variant="outlined"
      style={{ marginBottom: 20, width: "100%" }}
    />
  );
}

export default SearchCoins;
