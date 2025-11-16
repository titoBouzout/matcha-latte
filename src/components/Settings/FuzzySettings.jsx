import { For } from 'pota/components'
import { bind } from 'pota/use/bind'
import { location } from 'pota/use/location'
import { camelCaseToLabel } from '../../js/utils'
import styles from './index.module.css'
import Setting from './Setting'
import { effect, ref } from 'pota'
import useFuzzySearchList from '../../use/fuzzySearch.jsx'

export default function FuzzySettings(props) {
	const input = bind(location.searchParams?.q || '')

	const filteredVariables = useFuzzySearchList({
		list: props.list,

		getText: item => [
			camelCaseToLabel(item.key),
			item.value.toString(),
		],
		mapResultItem: ({ item, score, matches: [highlightRanges] }) => ({
			...item,
			highlightRanges,
			score,
		}),
		queryText: input,
	})

	const reset = (
		<label>
			Reset to default
			<button on:click={props.confirmReset}>Reset ALL</button>
		</label>
	)

	const scrollRef = ref()
	const searchRef = ref()
	const search = (
		<label class={styles.sticky} use:ref={searchRef}>
			Search
			<input use:bind={input} autocomplete="on" />
		</label>
	)

	function toggleStuck(e) {
		const rect = scrollRef().getBoundingClientRect()
		if (rect.top <= 0) {
			searchRef().classList.add(styles.stuck)
		} else {
			searchRef().classList.remove(styles.stuck)
		}
	}

	effect(() => {
		input(location.searchParams?.q || '')
	})

	return (
		<div class={styles.settings} on:scroll={toggleStuck}>
			<div use:ref={scrollRef} />
			{search}
			<For each={filteredVariables}>
				{item => <Setting item={item} path={props.path} />}
			</For>
			{reset}
		</div>
	)
}
