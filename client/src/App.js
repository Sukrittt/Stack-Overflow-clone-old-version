import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
//css
import "./App.css";

//redux
import { useDispatch } from "react-redux";

//components
import Navbar from "./components/Navbar/Navbar";
import RoutePage from "./RoutePage";

//actions
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuestions()); // every time there is a change in dispatch, it will fetch all questions
    dispatch(fetchAllUsers()); // same for this, it will fetch all user details all the time
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <RoutePage />
      </Router>
    </div>
  );
}

export default App;
