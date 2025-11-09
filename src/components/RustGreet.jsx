import { signal } from "pota";
import { invoke } from "@tauri-apps/api/core";

export default function RustGreet() {
  const [greetMsg, setGreetMsg] = signal("");
  const [name, setName] = signal("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  return (
    <>
      <form
        class="row"
        on:submit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          on:change={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
        {/* <button onClick={() => { location.reload() }}>refresh</button> */}
      </form>
      <p>{greetMsg}</p>
    </>
  );
}
