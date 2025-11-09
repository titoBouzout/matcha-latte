import { Collapse, Dynamic, For, Show } from 'pota/components'
import { TabContext } from './context.jsx'

/**
 * Renders a tab panel with contents
 * @module Tabs/Panel
 * @param {object} props
 * @param {Children} [props.children]
 * @returns {Children}
 * @url https://pota.quack.uy/Components/Tabs
 */
export default function Panel(props) {
	const context = TabContext()
	const { selected, tid, hidden } = context
	if (!props) {
		console.error('Missing children in TabPanel')
		return null
	}
	const children = Array.isArray(props.children)
		? props.children.map(child => child())
		: [props.children()]

	return (
		<For each={children}>
			{(childProps, i) => {
				if (!childProps) {
					console.error('Missing children in TabContent')
					return null
				}
				const { collapse, children, ...rest } = childProps
				return (
					<Dynamic
						component={collapse ? Collapse : Show}
						when={() => selected.read() === i}
					>
						<section
							id={`tab-content-${tid}-${i}`}
							aria-labelledby={`tab-${tid}-${i}`}
							aria-live="polite"
							on:click={() => {
								selected.write(i)
							}}
							{...rest}
						>
							{children}
						</section>
					</Dynamic>
				)
			}}
		</For>
	)
}
