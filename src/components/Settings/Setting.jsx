import { Command } from "@tauri-apps/plugin-shell";
import { Match, Switch } from "pota/components";
import { camelCaseToLabel } from "../../js/utils";
import Highlighter from "../Highlighter";

export default function Setting({ item, path }) {
  // console.log(item, path);
  async function setVar(k, v) {
    const cmd = `~/.scripts/ucv.sh ${k} ${v} "${path}"`;
    console.log(cmd);
    const r = await Command.create("exec-sh", ["-c", cmd]).execute();
    console.log(r, r.stdout.trim());
  }
  function onChange(e) {
    const value =
      e.currentTarget.type === "checkbox"
        ? e.currentTarget.checked
        : e.currentTarget.value;

    console.log(value);
    setVar(item.key, item.type === "color" ? value.substring(1) : value);
  }
  return (
    <label>
      <Highlighter
        ranges={item.highlightRanges}
        style={"{color:var(--matcha); background: transparent;}"}
      >
        {camelCaseToLabel(item.key)}
      </Highlighter>
      <Switch fallback={<input on:change={onChange} value={item.value} />}>
        <Match when={item.type === "boolean"}>
          <input on:change={onChange} type="checkbox" checked={item.value} />
        </Match>
        <Match when={item.type === "integer"}>
          <input
            on:change={onChange}
            type="number"
            step="1"
            value={item.value}
          />
        </Match>
        <Match when={item.type === "float"}>
          <input
            on:change={onChange}
            type="number"
            step="0.1"
            value={item.value}
          />
        </Match>
        <Match when={item.type === "color"}>
          <input on:change={onChange} type="color" value={"#" + item.value} />
        </Match>
      </Switch>
    </label>
  );
}
