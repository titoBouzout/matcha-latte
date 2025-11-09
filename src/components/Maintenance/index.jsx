import { Command } from "@tauri-apps/plugin-shell";
import Card from "../Card";
import styles from "../Dashboard/index.module.css";

export default function Maintenance() {
  async function runInNewTerm(cmd, envVars = {}) {
    const envEntries = Object.entries(envVars);
    const envString =
      envEntries.length > 0
        ? envEntries.reduce((a, c) => a + `${c[0]}=${c[1]}`, "") + " "
        : "";
    const args = ["-e", "fish", "-C", envString + cmd];
    console.log(cmd, args);
    Command.create("foot", args).execute();
  }

  const commands = {
    update: "ua-update-all",
    yayCache: "yay -Sc",
    pacmanCache: "sudo pacman -Sc",
    orphans: "cleanup",
    refreshMirrors: "ua-update",
    btrfs: "",
    removePacLock: "pac-unlock",
    editRepos: "",
    mergePacDiff: "pacdiff",
  };
  return (
    <div class={styles.cards}>
      <Card
        onClick={() => {
          runInNewTerm(commands.update);
        }}
      >
        Update
      </Card>
      <Card
        onClick={() => {
          runInNewTerm(commands.pacmanCache);
        }}
      >
        Clean pacman cache
      </Card>
      <Card
        onClick={() => {
          runInNewTerm(commands.yayCache);
        }}
      >
        Clean yay cache
      </Card>
      <Card
        onClick={() => {
          runInNewTerm(commands.orphans);
        }}
      >
        Clean orphans
      </Card>
      <Card>Refresh mirrors</Card>
      <Card>Btrfs stuff</Card>
      <Card>Remove pacman lock</Card>
      <Card>Edit repos</Card>
      <Card
        onClick={() => {
          runInNewTerm(commands.mergePacDiff, { DIFFPROG: "meld" });
        }}
      >
        Merge pacdiff
      </Card>
    </div>
  );
}
