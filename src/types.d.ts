import type { JSX } from 'pota'

declare module 'pota' {
	namespace JSX {
		interface ElementAttributes<Element> {
			'use:tooltip'?: {
				position: { x: number; y: number }
				value: Element
			}
		}
	}
}
