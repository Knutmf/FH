import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';



function Routering() {
    return(
        <Router>
            <div>
            <Route path="/dashboard" component={Dashboard} />
            </div>
        </Router>
    );
}


function Navigation() {
    return (
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
        </nav>
    );
    }

    function Switching() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        );
     }