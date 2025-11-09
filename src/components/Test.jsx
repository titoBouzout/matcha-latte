import {signal, ready } from 'pota';
import { Command } from '@tauri-apps/plugin-shell';
async function Test() {
    const [display, setDisplay] = signal('')

    async function run() {
        const r = await Command.create('exec-sh', [
            '-c',
            "echo 'Hello World!'",
        ]).execute();
        console.log(r, r.stdout.trim())
        setDisplay(r.stdout.trim())
    }

    ready(run)
    return (
        <div>
            <marquee>testing!</marquee>
            <p>wtf lol where is it? {display}</p>
        </div>
    )
}
export default Test