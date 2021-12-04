import { useHistory } from "react-router";
import "./App.css"


function Start() {
    let history = useHistory()

    function redirect () {
        history.push('/register')
    }

    return (
    <div className="App">
        <h1>Start Page</h1>
        <button onClick={redirect} style={{height: "100px", width:"200px"}}>Click here!</button>
    </div>
    );
  }
  
  export default Start;