import { signal } from 'pota'
import { TabProvider } from './context.jsx'

let idCounter = 0

/**
 * Context wrapper for tabs
 *
 * @module Tabs/Tabs
 * @param {object} props
 * @param {number} [props.defaultSelectedIndex] Which tab index to
 *   select by default
 * @param {Children} [props.children]
 * @returns {Children}
 * @url https://pota.quack.uy/Components/Tabs
 */
export default function Tabs(props) {
	const tid = idCounter++
	return (
		<TabProvider
			value={{
				selected: signal(props.defaultSelectedIndex || 0),
				tid,
			}}
		>
			{props.children}
		</TabProvider>
	)
}
