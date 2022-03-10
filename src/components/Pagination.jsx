import React from "react";
import { Pagination } from "@material-ui/lab";
import "./Pagination.css";
const Pages = ({ coinsList, setPage }) => {
  const handlePagination = (_, value) => {
    setPage(value);
    window.scroll(0, 450);
  };

  return (
    <Pagination
      onChange={handlePagination}
      className="pagination"
      count={(coinsList.length / 10).toFixed(0)}
    />
  );
};

export default Pages;
