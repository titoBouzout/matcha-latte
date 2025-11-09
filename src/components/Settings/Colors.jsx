import { Command } from "@tauri-apps/plugin-shell";
import useContext from "../../context/app";
import FuzzySettings from "./FuzzySettings";

export default function Colors() {
  const { theme, updateTheme } = useContext();

  async function resetSettings() {
    const r = await Command.create("exec-sh", [
      "-c",
      'cp "$HOME/caelestia/hypr/scheme/matcha.conf" "$HOME/caelestia/hypr/scheme/current.conf"',
    ]).execute();
    console.log(r);
  }

  function confirmReset(e) {
    const confirmed = confirm("Are you sure you want to reset everything?");
    if (!confirmed) return;
    resetSettings();
    updateTheme();
  }

  return (
    <FuzzySettings
      list={theme}
      confirmReset={confirmReset}
      path="$HOME/caelestia/hypr/scheme/current.conf"
    />
  );
}
