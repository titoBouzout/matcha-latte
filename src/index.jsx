/* @refresh reload */
import { render } from "pota";
import App from "./App";
import { Provider, defaultContext } from "./context/app";
import "pota/use/clickoutside";

// import { TrayIcon } from "@tauri-apps/api/tray";
// import { Menu } from "@tauri-apps/api/menu";

// const menu = await Menu.new({
//   items: [{ id: "quit", text: "Quit" }],
// });

// const options = {
//   menu,
//   menuOnLeftClick: true,
// };

// const tray = await TrayIcon.new(options);

render(
  <Provider value={defaultContext}>
    <App />
  </Provider>
);
