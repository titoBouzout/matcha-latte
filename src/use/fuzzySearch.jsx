import createFuzzySearch from '@nozbe/microfuzz'
import { memo } from 'pota'

export default function useFuzzySearchList({
	list,
	key,
	getText,
	queryText,
	mapResultItem = ({ item }) => item,
	strategy,
}) {
	const performSearch = memo(() =>
		createFuzzySearch(list(), { key, getText, strategy }),
	)

	const searchResults = memo(() => {
		return queryText()
			? performSearch()(queryText()).map(mapResultItem)
			: list().map(item =>
					mapResultItem({
						item,
						score: Number.POSITIVE_INFINITY,
						matches: [],
					}),
				)
	})

	return searchResults
}
