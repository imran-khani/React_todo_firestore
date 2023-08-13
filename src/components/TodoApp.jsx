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
  const [deleteItemId, setDeleteItemId] = useState(null);

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
  const openDeleteModal = (id) => {
    setDeleteItemId(id);
    window.my_modal_5.showModal();
  };

  const confirmDelete = async () => {
    await deleteDoc(doc(db, "todos", deleteItemId));
    setDeleteItemId(null);
    window.my_modal_5.close();
  };

  const cancelDelete = () => {
    setDeleteItemId(null);
    window.my_modal_5.close();
  };

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
                deleteTodo={() => openDeleteModal(todo.id)}
              />
            ))}
          </ul>
        )}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <form method="dialog" className="modal-box bg-indigo-500 text-white">
            <h3 className="font-bold text-lg">Warning</h3>
            <p className="py-4">Do you want to delete this item?</p>
            <div className="modal-action">
              <button
                className="btn bg-white text-black outline-none border-none hover:text-white hover:bg-red-500"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="btn bg-white border-none hover:bg-green-300 hover:text-black"
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </form>
        </dialog>
        {todos.length < 1 ? null : (
          <p className={styles.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
