import { BrowserRouter, Switch, Route } from "react-router-dom";
import TrackPage from "./components/TrackPage";
import SubsPage from "./components/SubsPage";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/tracking" component={TrackPage} />
            <Route path="/subsciption" component={SubsPage} />
            <Route path="/" component={TrackPage} />
        </Switch>
    </BrowserRouter>
);

export default Router;