import { useEffect, useState } from "react";
import "./App.css";
import { AiFillPlusCircle } from "react-icons/ai";
import Todo from "./components/Todo";
import styles from "./styles";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { MagnifyingGlass } from "react-loader-spinner";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  // create todo
  const createTodo = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };
  // read todo from database
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setLoading(false);
      setTodos(todosArr);
    });
    return () => unSubscribe();
  }, []);
  // update todos in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  // delete todo
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <h3 className={styles.heading}>Todo App</h3>
        <form className={styles.form} onSubmit={createTodo}>
          <input
            value={input}
            type="text"
            className={`${styles.input} `}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            disabled={!input}
            className={`${styles.button} disabled:text-slate-500`}
          >
            <AiFillPlusCircle size={50} />
          </button>
        </form>
        {loading ? (
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperClass="MagnifyingGlass-wrapper mx-auto"
            glassColor="#c0efff"
            color="#e15b64"
          />
        ) : (
          <ul>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                loading={loading}
              />
            ))}
          </ul>
        )}

        {todos.length < 1 ? null : (
          <p className={styles.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
};

export default App;
