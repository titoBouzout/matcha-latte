import { Command } from '@tauri-apps/plugin-shell'
import { writable } from 'pota'
import { parseVars } from '../../js/utils.js'
import FuzzySettings from './FuzzySettings.jsx'

export default function Vars() {
	async function getVars() {
		const r = await Command.create('exec-sh', [
			'-c',
			'cat "$HOME/caelestia/hypr/variables.conf"',
		]).execute()
		const cv = parseVars(r.stdout)
		console.log(r, cv)
		return cv
	}

	const variables = writable(getVars, [])

	async function resetSettings() {
		const r = await Command.create('exec-sh', [
			'-c',
			'cp "$HOME/caelestia/hypr/variables.backup" "$HOME/caelestia/hypr/variables.conf"',
		]).execute()
		console.log(r)
		variables.run()
	}

	function confirmReset(e) {
		const confirmed = confirm(
			'Are you sure you want to reset everything?',
		)
		if (!confirmed) return
		resetSettings()
	}

	return (
		<FuzzySettings
			list={variables}
			confirmReset={confirmReset}
			path="$HOME/caelestia/hypr/variables.conf"
		/>
	)
}
