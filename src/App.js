import logo from "./logo.svg";
import "./App.css";
import CarForm from "./pages/CarRegister";
import { Button } from "antd";
import { greeterABI, address } from "./constants";
import { ethers } from "ethers";

function App() {
  // const triggerContract = async () => {
  //   const provider = new ethers.BrowserProvider(window.ethereum);
  //   const contract = await new ethers.Contract(address, greeterABI, provider);
  //   const value = await contract.getGreeting();
  //   console.log(value, "Greeting: ");
  // };
  return (
    // <div className="App">
    //  <button onClick={triggerContract}>Call contract</button>
    //  </div>

    <CarForm />
  );
}

export default App;
