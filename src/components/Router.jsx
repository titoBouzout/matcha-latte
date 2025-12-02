import { Navigate, Route } from 'pota/components'

import Settings from './Settings/index.jsx'
import Test from './Test.jsx'
import RustGreet from './RustGreet.jsx'
import Dashboard from './Dashboard/index.jsx'
import Maintenance from './Maintenance/index.jsx'
import FourZeroFour from './404.jsx'

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
	)
}
