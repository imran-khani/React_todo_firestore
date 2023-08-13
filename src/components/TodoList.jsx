import PropTypes from "prop-types";
import { BsFillTrash2Fill } from "react-icons/bs";

import styles from "../styles";

const TodoList = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={todo.completed ? styles.liComplete : styles.li}>
      <div className={styles.row}>
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed}
          className="checkbox checkbox-info"
        />

        <p
          onClick={() => toggleComplete(todo)}
          className={`${todo.completed ? styles.textComplete : styles.text} whitespace-pre-wrap`}
        >
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)} className={styles.liButton}>
        <BsFillTrash2Fill />
      </button>
    </li>
  );
};

TodoList.propTypes = {
  todo: PropTypes.object.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;