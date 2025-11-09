/**
 * Callback of TabLabel click
 * @module Tabs/Label
 * @callback OnTabClick
 * @param {object} data
 * @param {Event} data.event The on:click event
 * @param {number} data.id The id of the clicked tab
 * @param {object} data.props The props of the TabLabel
 * @returns {void}
 */

/**
 * Passthrough for label in TabList
 * @module Tabs/Label
 * @param {object} props Leftover props are passed to the button container
 * @param {boolean} props.defaultSelected Set as default tab
 * @param {boolean} props.hidden Hide the tab
 * @param {OnTabClick} props.onClick Callback of TabLabel click returning event, id, and props
 * @param {Children} [props.children]
 * @returns {object} props
 * @url https://pota.quack.uy/Components/Tabs
 */
export default function Label(props) {
	return props
}
