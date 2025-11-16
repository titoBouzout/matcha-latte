import { Command } from '@tauri-apps/plugin-shell'

function Test() {
	async function display() {
		const r = await Command.create('exec-sh', [
			'-c',
			"echo 'Hello World!'",
		]).execute()
		console.log(r, r.stdout.trim())
		return r.stdout.trim()
	}

	return (
		<div>
			<marquee>testing!</marquee>
			<p>wtf lol where is it? {display}</p>
		</div>
	)
}
export default Test
