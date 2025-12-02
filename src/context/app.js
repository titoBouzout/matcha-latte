import { context, signal } from 'pota'
import { Command } from '@tauri-apps/plugin-shell'

import { parseVars } from '../js/utils.js'

async function getTheme() {
	const r = await Command.create('exec-sh', [
		'-c',
		'cat "$HOME/caelestia/hypr/scheme/current.conf"',
	]).execute()
	console.log(r)
	const cv = parseVars(r.stdout, 'color')
	console.log(r, cv)
	return cv
}

const [theme, setTheme] = signal([])

getTheme().then(theme => {
	setTheme(theme)
})

async function updateTheme() {
	setTheme(await getTheme())
}

export const defaultContext = {
	theme,
	getTheme,
	updateTheme,
}
const useContext = context(defaultContext)
export const Provider = useContext.Provider
export default useContext
