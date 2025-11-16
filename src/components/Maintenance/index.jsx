import { Command } from '@tauri-apps/plugin-shell'
import Card from '../Card'
import styles from '../Dashboard/index.module.css'
import { For } from 'pota/components'

export default function Maintenance() {
	async function runInNewTerm(cmd, envVars = {}) {
		const envEntries = Object.entries(envVars)
		const envString =
			envEntries.length > 0
				? envEntries.reduce((a, c) => a + `${c[0]}=${c[1]}`, '') + ' '
				: ''
		const args = ['-e', 'fish', '-C', envString + cmd]
		console.log(cmd, args)
		Command.create('foot', args).execute()
	}

	/**
	 * @type {{
	 * 	label: string
	 * 	cmd: string
	 * 	env?: Record<PropertyKey, string>
	 * }[]}
	 */ const commands = [
		{ label: 'Update', cmd: 'ua-update-all' },
		{ label: 'Clean pacman cache', cmd: 'sudo pacman -Sc' },
		{ label: 'Clean yay cache', cmd: 'yay -Sc' },
		{ label: 'Clean orphans', cmd: 'cleanup' },
		{ label: 'Refresh mirrors', cmd: 'ua-update' },
		{ label: 'Btrfs stuff', cmd: '' },
		{ label: 'Remove pacman lock', cmd: 'pac-unlock' },
		{ label: 'Edit repos', cmd: '' },
		{
			label: 'Merge pacDiff',
			cmd: 'pacdiff',
			env: { DIFFPROG: 'meld' },
		},
	]
	return (
		<div class={styles.cards}>
			<For each={commands}>
				{item => (
					<Card
						onClick={() => {
							runInNewTerm(item.cmd, item.env)
						}}
					>
						{item.label}
					</Card>
				)}
			</For>
		</div>
	)
}
