import { For, Show } from 'pota/components'
import { TabContext } from './context.jsx'

/**
 * Renders a list of tabs
 * @module Tabs/List
 * @param {object} props
 * @param {Children} [props.children]
 * @returns {Children}
 * @url https://pota.quack.uy/Components/Tabs
 */
export default function List(props) {
	const context = TabContext()
	const { selected, tid, hiddenIndices } = context
	if (!props) {
		console.error('Missing children in TabList')
		return null
	}
	const children = Array.isArray(props.children)
		? props.children.map(child => child())
		: [props.children()]

	function onTabClick(event, index, props) {
		selected.write(index)
		if (props.onClick && typeof props.onClick === 'function')
			props.onClick({ event, index, props })
	}

	return (
		<For each={children}>
			{(childProps, i) => {
				if (!childProps) {
					console.error('Missing children in TabLabel')
					return null
				}
				const {
					children,
					onClick,
					defaultSelected,
					hidden = () => false,
					...rest
				} = childProps

				return (
					<Show when={() => !hidden()}>
						<button
							id={`tab-${tid}-${i}`}
							role="tab"
							selected={() => selected.read() === i}
							aria-selected={() =>
								selected.read() === i ? 'true' : 'false'
							}
							aria-controls={`tab-content-${tid}-${i}`}
							use:connected={() =>
								defaultSelected && selected.write(i)
							}
							use:disconnected={() => {
								if (selected.read() === i) selected.write(0)
							}}
							on:click={e => {
								onTabClick(e, i, childProps)
							}}
							{...rest}
						>
							{children}
						</button>
					</Show>
				)
			}}
		</For>
	)
}
