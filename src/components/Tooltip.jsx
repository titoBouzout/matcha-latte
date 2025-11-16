import { effect, memo, propsPlugin, ref, signal } from 'pota'

import { Collapse, Show } from 'pota/components'

const [tooltipNode, setTooltipNode] = signal({
	position: { x: 0, y: 0 },
})

let outTO
propsPlugin('use:tooltip', (node, value) => {
	// if (value().trim() === "") return;
	// console.log(value);
	node.addEventListener('mouseover', e => {
		console.log('mouseover', outTO)
		clearTimeout(outTO)

		function getWidth() {
			let { width } = getComputedStyle(
				document.getElementById('tooltip'),
			)
			console.log('getwidth', width)
			return +width.replace(/[^.\d]/g, '') || 0
		}

		let x = e.clientX
		let width = getWidth()
		console.log(width)
		if (width === 0) {
			setTooltipNode({
				node,
				value,
				position: { x, y: e.clientY },
			})
		}

		if (x + getWidth() > document.body.clientWidth) {
			console.log('offscreen')
			x = x - getWidth() - 8
		}
		setTooltipNode({
			node,
			value,
			position: { x, y: e.clientY },
		})
	})
	node.addEventListener('mouseout', e => {
		console.log('mouseout', outTO)
		clearTimeout(outTO)
		outTO = setTimeout(() => {
			setTooltipNode({
				position: { x: e.clientX, y: e.clientY },
			})
		}, 500)
	})
})

export default function Tooltip(props) {
	const value = memo(() => tooltipNode().value)
	const x = memo(() => tooltipNode().position.x + 'px')
	const y = memo(() => tooltipNode().position.y + 10 + 'px')
	return (
		<Collapse when={value}>
			<div
				id="tooltip"
				style={{
					left: x,
					top: y,
				}}
			>
				{value}
			</div>
		</Collapse>
	)
}
