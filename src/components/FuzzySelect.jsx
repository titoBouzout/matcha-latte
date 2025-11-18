import { memo, ready, ref, signal, writable } from 'pota'
import { Collapse, For } from 'pota/components'
import { bind } from 'pota/use/bind'
import styles from '../css/FuzzySelect.module.css'
import useFuzzySearchList from '../use/fuzzySearch.jsx'
import Highlighter from './Highlighter.jsx'

export default function FuzzySelect(props) {
	const input = bind('')
	const [expanded, setExpanded, updateExpanded] = signal(false)

	let containerRef = ref()
	let selectionRef = ref()
	let collapseRef = ref()
	let inputRef = ref()

	const filteredList = useFuzzySearchList({
		...props.options,
		queryText: input,
	})

	const selected = writable(
		() =>
			props.defaultSelected() ||
			props.options.list()[0]?.[props.options.key],
	)
	const hovering = writable(
		() =>
			props.options
				.list()
				.findIndex(v => v.name === props.defaultSelected()) || 0,
	)

	const width = memo(() => {
		filteredList()
		return getComputedStyle(containerRef()).width || 'fit-content'
	})

	function onOpen() {
		updateExpanded(v => !v)
		setTimeout(() => {
			inputRef().focus()
		}, 0)
	}

	function onSelect(item) {
		selected(item)
		props.onSelect(item)
	}

	function clickClose(e) {
		if (
			e.target != selectionRef() &&
			e.target.parentNode != selectionRef() &&
			e.target.parentNode != collapseRef()
		) {
			setExpanded(false)
		}
	}

	function onKeyDown(e) {
		if (
			e.key === 'ArrowDown' &&
			hovering() < filteredList().length - 1
		) {
			hovering(hovering() + 1)
			if (!expanded()) onSelect(filteredList()[hovering()].name)
		} else if (e.key === 'ArrowUp' && hovering() > 0) {
			hovering(hovering() - 1)
			if (!expanded()) onSelect(filteredList()[hovering()].name)
		} else if (e.key === ' ' && !expanded()) {
			onOpen()
		} else if (e.key === 'Enter') {
			const name = filteredList()[hovering()].name
			if (!name) return
			onSelect(name)
			setExpanded(false)
			setTimeout(() => {
				selectionRef().focus()
			}, 0)
		}
	}

	ready(() => {
		window.addEventListener('click', clickClose)
	})

	return (
		<div
			class={styles.container}
			style:width={width}
			use:ref={containerRef}
			on:keydown={onKeyDown}
		>
			<div
				use:ref={selectionRef}
				class={styles.selection}
				tabindex={0}
				on:click={onOpen}
			>
				<span>{selected}</span> <sup>↧</sup>
			</div>
			<Collapse when={expanded}>
				<div
					class={styles.collapse}
					use:ref={collapseRef}
					style:width={width}
				>
					<input
						use:ref={inputRef}
						use:bind={input}
						placeholder="Search"
					/>
					<ul style={{ all: 'unset' }}>
						<For each={filteredList}>
							{(item, i) => (
								<li
									on:mouseenter={() => {
										hovering(i)
									}}
									/** @ts-expect-error custom attribute */
									hovering={() => hovering() === i}
									class={styles.item}
									on:click={() => {
										onSelect(item[props.options.key])
									}}
								>
									<Highlighter
										style={`{background-color:var(--bright-yellow);color:var(--bg)}`}
										ranges={item.highlightRanges}
									>
										{item[props.options.key]}
									</Highlighter>
								</li>
							)}
						</For>
					</ul>
				</div>
			</Collapse>
		</div>
	)
}
