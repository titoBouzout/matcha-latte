import { A } from 'pota/components'
import Card from '../Card'
import { signal } from 'pota'
import { Command } from '@tauri-apps/plugin-shell'
import Gear1 from '../Icons/Gear'
import Monitor from '../Icons/Monitor'
import styles from './index.module.css'
import Updates from '../Updates'
import Todos from './Todos'

export default function Dashboard() {
	const [user, setUser] = signal('Guest')
	;(async function getUser() {
		const r = await Command.create('exec-sh', [
			'-c',
			'echo $USER@$HOSTNAME',
		]).execute()
		setUser(r.stdout.trim())
	})()
	return (
		<div>
			<h1>
				Welcome to <span class={styles.grad}>Matcha Linux</span>
			</h1>
			<span>Hello, {user}!</span>

			<div class={styles.cards}>
				<A href="/maintenance">
					<Card>
						<div>
							<Monitor />
						</div>
						<span>Maintenance</span>
						<p>Tools to help with upkeep</p>
					</Card>
				</A>
				<A href="/settings">
					<Card>
						<div>
							<Gear1 />
						</div>
						<span>Settings</span>
						<p>Pimp out your Caelestia setup</p>
					</Card>
				</A>
			</div>

			<Todos />
		</div>
	)
}
