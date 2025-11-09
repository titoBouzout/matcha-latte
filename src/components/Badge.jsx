import { memo } from "pota";
import { Show } from "pota/components";

export default function Badge({
  x,
  y,
  value,
  children,
  style,
  tooltip,
  condition,
}) {
  const s = memo(
    () =>
      `padding: 0; display: flex; justify-content: center; align-items: center; top:${y};left:${x};${
        style || ""
      }`
  );
  return (
    <div
      use:tooltip={tooltip}
      style:position="relative"
      style:width="fit-content"
    >
      {children}
      <Show when={condition}>
        <div class="badge" style={s}>
          {value}
        </div>
      </Show>
    </div>
  );
}
