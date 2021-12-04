import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import Login  from "./Pages/Login"
import Register from "./Pages/Register"
import Start from "./Pages/Start"
import Profile from "./Pages/Profile"
import BuyCar from "./Pages/Buy"
import PaymentForm from "./Pages/PaymentForm"
import Search from "./Pages/Search"
import Contract from "./Pages/Contract"
import ContractsManage from "./Pages/ContractsManage"
import SalaryManage from "./Pages/SalaryManage"
import AutoManage from "./Pages/AutoManage"


function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Start}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/buy">
                    <BuyCar/>    
                </Route>  
                <Route exact path="/search" component={Search}></Route>
                <Route exact path="/auto/buy">
                    <PaymentForm/>
                </Route>
                <Route exact path="/contracts">
                    <Contract/>
                </Route>
                <Route exact path="/contracts_manage/">
                    <ContractsManage/>
                </Route>
                <Route exact path="/salary_manage">
                    <SalaryManage/>
                </Route>
                <Route exact path="/auto_manage">
                    <AutoManage/>
                </Route>

            </Switch>
        </Router>
    )
}


export default App;