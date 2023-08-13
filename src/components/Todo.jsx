import { BsFillTrash2Fill } from "react-icons/bs";

import styles from "../styles";

const Todo = ({ todo, toggleComplete }) => {
  return (
    <li className={todo.completed ? styles.liComplete : styles.li} >
      <div className={styles.row}>
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        <p
          onClick={() => toggleComplete(todo)}
          className={todo.completed ? styles.textComplete : styles.text}
        >
          {todo.text}
        </p>
      </div>
      <button className={styles.liButton}>
        <BsFillTrash2Fill />
      </button>
    </li>
  );
};

export default Todo;
