import { ready, memo, writable } from 'pota'
import Bell1 from './Icons/Bell'
import { For } from 'pota/components'
import { Command } from '@tauri-apps/plugin-shell'
import Badge from './Badge'
import { rateLimited } from '../js/utils'

export default function Updates() {
	const updates = writable(async function checkUpdates() {
		const r = await Command.create('exec-sh', [
			'-c',
			'checkupdates',
		]).execute()
		if (r.stdout.trim() === '') return []
		const upd = r.stdout
			.trim()
			.split('\n')
			.map(line => {
				const { pkg, prev, cur } =
					/^(?<pkg>[^\s]+)\s(?<prev>[^ ]+)\s->\s(?<cur>[^ ]+)/.exec(
						line,
					).groups
				return { pkg, prev, cur }
			})

		return upd
	}, [])

	const updateCount = memo(() => updates().length.toString())

	ready(async () => {
		try {
			await rateLimited('updates', 60 * 1000 * 30, () =>
				updates.run(),
			)
		} catch (error) {
			console.error('too lazy to figure this out rn', error)
		}
	})

	return (
		<Badge
			x="8px"
			y="8px"
			style={
				'background: var(--milk-alpha); color: black; border-radius: 50px; width: 16px; height: 16px; box-shadow: 0 0 5px red;'
			}
			value={updateCount}
			tooltip={
				<For each={updates}>{data => <Update data={data} />}</For>
			}
			condition={() => updates().length > 0}
		>
			<Bell1 style={'width: 2em; height: auto'} />
		</Badge>
	)
}

function Update({ data }) {
	const semVer = ['major', 'minor', 'patch', 'release', 'hash']
	// if (data.prev.includes("r")) semVer.push(...["release", "hash"]);

	function parseVersion(version) {
		return version
			.split('.')
			.map((item, i) => ({ type: semVer[i], value: item }))
			.reduce((p, c) => ({ ...p, ...{ [c.type]: c.value } }), {})
	}

	const [prevVer, prevPkgBuild] = data.prev.split('-')
	const [curVer, curPkgBuild] = data.cur.split('-')

	const prev = parseVersion(prevVer)
	const cur = parseVersion(curVer)

	const what =
		+cur.major > (+prev.major || 0)
			? 'major'
			: +cur.minor > (+prev.minor || 0)
				? 'minor'
				: +cur.patch > (+prev.patch || 0)
					? 'patch'
					: +cur.release?.replace('r', '') >
						  +prev.release?.replace('r', '')
						? 'release'
						: +cur.hash?.replace('g', '') >
							  +prev.hash?.replace('g', '')
							? 'hash'
							: +curPkgBuild > +prevPkgBuild
								? 'pkgbuild'
								: 'unknown?'

	const colors = {
		major: 'lightred',
		minor: 'lightorange',
		patch: 'lightyellow',
		release: 'lightpink',
		hash: 'lightgold',
		pkgbuild: 'lightgreen',
		unknown: 'lightwhite',
	}
	return (
		<div
			class="centered"
			style={'gap:8px; justify-content: space-between;'}
		>
			<div style={`font-size: 1.2em;`}>
				<span>{data.pkg}</span>{' '}
				<sup style={`color: ${colors[what]}`}>[{what}]</sup>{' '}
			</div>
			<div>
				<div style:color="var(--matcha)">{data.cur}</div>
				<div style:color="gray">{data.prev}</div>
			</div>
		</div>
	)
}
