import { signal } from 'pota'
import { invoke } from '@tauri-apps/api/core'

export default function RustGreet() {
	const [name, setName] = signal('')

	async function greet() {
		if (name() != '') {
			// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
			return invoke('greet', { name: name() })
		}
	}

	return (
		<>
			<form
				class="row"
				on:submit={e => {
					e.preventDefault()
				}}
			>
				<input
					id="greet-input"
					on:change={e => setName(e.currentTarget.value)}
					placeholder="Enter a name..."
				/>
				<button type="submit">Greet</button>
				{/* <button onClick={() => { location.reload() }}>refresh</button> */}
			</form>
			<p>{greet}</p>
		</>
	)
}
