import { A, Show } from 'pota/components'
import { location, navigate } from 'pota/use/location'
import ChevronLeft from './Icons/ChevronLeft'
import Updates from './Updates'
import PacNewSave from './PacNewSave'
import Editable from './Editable'

export default function Nav() {
	return (
		<nav>
			<div class="centered">
				<Show
					when={() => location.pathname() !== '/'}
					fallback={
						<ChevronLeft
							style={'width: 32px; height: auto; color: black;'}
						/>
					}
				>
					<A href="/" title="Dashboard">
						<ChevronLeft style={'width: 32px; height: auto;'} />
					</A>
				</Show>
				<span
					style={
						'color: var(--matcha); font-size: 1.4em; height: fit-content;'
					}
				>
					<Editable
						value={() => location.pathname().substring(1)}
						prefix="/"
						onChange={e => {
							navigate(e.currentTarget.value || '#')
						}}
					/>
				</span>
			</div>

			<div
				style={'flex: 1; display: flex; justify-content: flex-end'}
			>
				<Updates />
				<PacNewSave />
			</div>
		</nav>
	)
}
