import { signal } from 'pota'
import {
	Tabs,
	TabLabel,
	TabContent,
	TabList,
	TabPanel,
} from '../Tabs/index.js'

import VarIcon from '../../assets/svg/variable.svg'
import HamburgerIcon from '../../assets/svg/hamburger.svg'
import PaletteIcon from '../../assets/svg/palette.svg'

import tabStyles from '../Tabs/Tabs.module.css'
import { Dynamic, For } from 'pota/components'
import Vars from './Vars.jsx'
import Colors from './Colors.jsx'

export default function Settings() {
	const [expanded, _, updateExpanded] = signal(true)

	function doLog({ event, index, props }) {
		console.log(
			`You clicked a tab named ${
				typeof props.children === 'object'
					? props.children[1]()
					: props.children
			} with index ${index}!`,
			event,
			props,
		)
	}

	function expandedText(str) {
		return expanded() ? str : ''
	}

	function ExpandedTextIcon(props) {
		return (
			<>
				<Dynamic component={props.icon} aria-hidden="true" />
				{() => expandedText(props.text)}
			</>
		)
	}

	function FoldButton() {
		return (
			<button
				class={tabStyles.expander}
				on:click={() => updateExpanded(v => !v)}
				aria-expanded={() => (expanded() ? 'true' : 'false')}
				aria-controls="vertical-tabs-list"
			>
				<ExpandedTextIcon icon={HamburgerIcon} text="Fold" />
			</button>
		)
	}

	return (
		<div class={tabStyles.container}>
			<div class={`${tabStyles.Tabs} ${tabStyles.vertical}`}>
				<Tabs>
					<div
						id="vertical-tabs-list"
						role="tablist"
						aria-label="Vertical Tabs Example"
						class={tabStyles.tablist}
						expanded={expanded}
					>
						<FoldButton />
						<TabList>
							<TabLabel
								class={tabStyles.italic}
								aria-label="Variables"
							>
								<ExpandedTextIcon icon={VarIcon} text="Variables" />
							</TabLabel>
							<TabLabel aria-label="Colors" onClick={doLog}>
								<ExpandedTextIcon icon={PaletteIcon} text="Colors" />
							</TabLabel>
						</TabList>
						<div class={tabStyles.end} />
					</div>
					<div class={tabStyles.panel}>
						<TabPanel>
							<TabContent class={tabStyles.content}>
								<Vars />
							</TabContent>
							<TabContent class={tabStyles.content}>
								<Colors />
							</TabContent>
						</TabPanel>
					</div>
				</Tabs>
			</div>
		</div>
	)
}
