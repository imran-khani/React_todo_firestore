import { useEffect, useState } from "react";
import "./App.css";
import { AiFillPlusCircle } from "react-icons/ai";
import Todo from "./components/Todo";
import styles from "./styles";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const App = () => {
  const [todos, setTodos] = useState([]);

  // create todo
  // read todo from database
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
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
        <form className={styles.form}>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setTodos(e.target.value)}
          />
          <button className={styles.button}>
            <AiFillPlusCircle size={50} className={styles.button} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} />
          ))}
        </ul>
        <p className={styles.count}>You have 2 count</p>
      </div>
    </div>
  );
};

export default App;
