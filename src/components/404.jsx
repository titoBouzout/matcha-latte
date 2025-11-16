import { location } from 'pota/use/location'

export default function FourZeroFour() {
	return (
		<div class="centered" style={'flex-direction: column; flex: 1;'}>
			<h1>You seem to be lost ¯\_(ツ)_/¯</h1>
			<p>
				{location.pathname} doesn't exist. I'd redirect you but I'm
				lazy..
			</p>
		</div>
	)
}
