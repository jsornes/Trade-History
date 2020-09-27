import React from "react";
import NavBar from "./components/NavBar";
import TradeHistoryTable from "./components/TradeHistoryTable";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <TradeHistoryTable />
    </div>
  );
}

export default App;
