import { ready, ref } from 'pota'

export default function Highlighter(props) {
	let spanRef = ref()

	const uuid = 'hl-' + crypto.randomUUID()

	function run() {
		if (!props.ranges) return
		let ranges = []
		for (let [start, end] of props.ranges) {
			const range = new Range()
			range.setStart(spanRef().firstChild, start)
			range.setEnd(spanRef().firstChild, end + 1)
			ranges.push(range)
		}
		const highlight = new Highlight(...ranges)

		CSS.highlights.set(uuid, highlight)
	}

	ready(run)

	const defaultStyle = '{background-color: yellow; color: black;}'

	return (
		<>
			<style>{`::highlight(${uuid}) ${
				props.style || defaultStyle
			}`}</style>
			<span use:ref={spanRef}>{props.text || props.children}</span>
		</>
	)
}
