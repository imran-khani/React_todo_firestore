import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Todo from "../components/TodoList";
import styles from "../styles";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { MagnifyingGlass } from "react-loader-spinner";

const TodoApp = () => {
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
  };

  // read todo from database
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
      setLoading(false);
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
  

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    
  };

 

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <h3 className={styles.heading}>React Todo App</h3>
        <form className={styles.form} onSubmit={createTodo}>
          <input
            value={input}
            type="text"
            className={`${styles.input} `}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            disabled={!input}
            onClick={() => setInput("")}
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
        ) : todos.length === 0 ? (
          <p className={styles.count}>
            Add New Todo and Click on{" "}
            <strong className="text-indigo-500 font-bold">+</strong> Button
          </p>
        ) : (
          <ul>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={() => deleteTodo(todo.id)}
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

export default TodoApp;
