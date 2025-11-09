import { Navigate, Route } from "pota/components";
import Settings from "./Settings";
import Test from "./Test";
import RustGreet from "./RustGreet";
import Dashboard from "./Dashboard";
import Maintenance from "./Maintenance";
import FourZeroFour from "./404";

export default function Router() {
  return (
    <>
      <Route path="/">
        <Route>
          <Dashboard />
        </Route>
        <Route path="settings">
          <Settings />
        </Route>
        <Route path="maintenance">
          <Maintenance />
        </Route>
        {/* goof */}
        <Route path="test">
          <Test />
        </Route>
        <Route path="greet">
          <RustGreet />
        </Route>
        <Route.Default>
          <FourZeroFour />
        </Route.Default>
      </Route>
      <Route path="#">
        <Navigate path="/" />
      </Route>
    </>
  );
}
