import Home from "../components/Home";
import Welcome from "../components/Welcome";
import { useSelector } from "react-redux";

function Index() {
  // data & input
  const user = useSelector((state) => state.user.value);
  console.log("index, user: ", user);
  // logic

  //return
  const pageToDisplay = user.token ? <Home /> : <Welcome />;

  return <>{pageToDisplay}</>;
}

export default Index;
