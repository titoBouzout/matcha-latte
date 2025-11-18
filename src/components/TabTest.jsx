import { signal } from 'pota'
import {
	Tabs,
	TabLabel,
	TabContent,
	TabList,
	TabPanel,
} from './Tabs/index.js'

import CogIcon from '../assets/svg/cog.svg'
import ChatIcon from '../assets/svg/chat-bubble.svg'
import HamburgerIcon from '../assets/svg/hamburger.svg'

import tabStyles from './Tabs/Tabs.module.css'
import { Dynamic } from 'pota/components'

export default function TabTest() {
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
			<button on:click={toggleHost}>Toggle host</button>
			<div class={`${tabStyles.Tabs} ${tabStyles.vertical}`}>
				<Tabs>
					<div
						id="vertical-tabs-list"
						role="tablist"
						aria-label="Vertical Tabs Example"
						class={tabStyles.tablist}
						/** @ts-expect-error custom attribute */
						expanded={expanded}
					>
						<FoldButton />
						<TabList>
							<TabLabel
								class={tabStyles.italic}
								aria-label="Caelestia Vars"
							>
								<ExpandedTextIcon
									icon={CogIcon}
									text="Caelestia Vars"
								/>
							</TabLabel>
							<TabLabel aria-label="Caelestia Colors" onClick={doLog}>
								<ExpandedTextIcon
									icon={ChatIcon}
									text="Caelestia Colors"
								/>
							</TabLabel>
						</TabList>
						<div class={tabStyles.end} />
					</div>
					<div class={tabStyles.panel}>
						<TabPanel>
							<TabContent class={tabStyles.content}></TabContent>
							<TabContent class={tabStyles.content}></TabContent>
						</TabPanel>
					</div>
				</Tabs>
			</div>
		</div>
	)
}
