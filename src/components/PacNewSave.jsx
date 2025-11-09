import { Command } from "@tauri-apps/plugin-shell";
import { memo, ready, signal } from "pota";
import { For } from "pota/components";
import Badge from "./Badge";
import Chip from "./Icons/Chip";

export default function PacNewSave() {
  const [items, setItems] = signal([]);
  async function checkItems() {
    const r = await Command.create("exec-sh", [
      "-c",
      "find /etc -name '*.pacnew' -o -name '*.pacsave'",
    ]).execute();
    const upd = r.stdout
      .trim()
      .split("\n")
      .filter((v) => v);

    console.log(upd);
    return upd;
  }

  const updateCount = memo(() => items().length.toString());

  ready(async () => {
    setItems(await checkItems());
  });
  return (
    <Badge
      x="8px"
      y="8px"
      style={
        "background: var(--milk-alpha); color: black; border-radius: 50px; width: 16px; height: 16px; box-shadow: 0 0 5px red;"
      }
      value={updateCount}
      tooltip={<For each={items}>{(data) => data}</For>}
      condition={() => items().length > 0}
    >
      <Chip style={"width: 2em; height: auto"} />
    </Badge>
  );
}
