// frontend/src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";
// import EventDetail from "./components/EventDetail";

function App() {
  return (
    <>
      <EventList />
    </>
  );
}

export default App;
