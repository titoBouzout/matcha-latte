import { context, signal } from 'pota'

export const TabContext = context({
	selected: signal(0),
	tid: 0,
})

export const TabProvider = TabContext.Provider
