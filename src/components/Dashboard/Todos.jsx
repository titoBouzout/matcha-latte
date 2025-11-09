import Card from "../Card";
import { effect, signal } from "pota";
import { For } from "pota/components";
import Editable from "../Editable";

function Todo(props) {
  return (
    <Card>
      <span>{new Date(props.data.date).toLocaleString()}</span>
      <p>{props.data.content}</p>
      <div>
        <button
          on:click={() => props.toggleTodo(props.data.id)}
          style:color={() => (props.data.done ? "green" : "red")}
        >
          done
        </button>
        <button on:click={() => props.removeTodo(props.data.id)}>delete</button>
      </div>
    </Card>
  );
}

export default function Todos() {
  const [todos, setTodos, updateTodos] = signal([
    // {
    //   id: crypto.randomUUID(),
    //   date: 1758100930308,
    //   content:
    //     "move colors to their own tab, \
    //       and handle setting vars in different files",
    //   done: false,
    // },
  ]);

  function addTodo(data) {
    updateTodos((v) => [...v, data]);
  }

  function removeTodo(id) {
    updateTodos((v) => v.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    updateTodos((v) =>
      v.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  }

  function onChange(e, setValue) {
    addTodo({
      id: crypto.randomUUID(),
      date: Date.now(),
      content: e.currentTarget.value,
      done: false,
    });
    setValue("Todo shits");
  }

  return (
    <div>
      <Editable onChange={onChange} value={() => "Todo shits"} />
      <div class="centered">
        <For each={todos}>
          {(todo) => (
            <Todo data={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />
          )}
        </For>
      </div>
    </div>
  );
}
