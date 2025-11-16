import { effect, ref, signal } from 'pota'
import { Show } from 'pota/components'
import { bind } from 'pota/use/bind'

export default function Editable(props) {
	const value = bind(props.value())
	const [editing, setEditing] = signal(false)
	let inputRef = ref()

	function toggle() {
		const flop = !editing()
		setEditing(flop)
		if (flop) {
			setTimeout(() => {
				inputRef().focus()
				inputRef().select()
			}, 0)
		}
	}
	function onChange(e) {
		props.onChange(e, value)
		toggle()
	}

	effect(() => {
		value(props.value())
	})
	return (
		<div
			on:click={toggle}
			use:clickoutside={() => {
				if (editing()) toggle()
			}}
		>
			{props.prefix}
			<Show when={editing} fallback={<span>{value}</span>}>
				<input
					use:ref={inputRef}
					use:bind={value}
					on:change={onChange}
				/>
			</Show>
		</div>
	)
}
