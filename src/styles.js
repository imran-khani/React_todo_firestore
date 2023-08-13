const styles = {
  bg: "h-screen w-screen  p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]",
  container: `bg-slate-100 md:max-w-[600px] w-full mx-auto rounded-md shadow-xl p-4 mt-10`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: "flex justify-between",
  input:
    "w-full p-3 border-indigo-500 border outline-none text-xl rounded-md my-2 bg-white text-black",
  button: "ml-2  text-indigo-500",
  count: "text-center p-2",
  li: "flex justify-between bg-slate-200 p-4 capitalize my-2 user-select-none text-black ",
  liComplete:
    "flex justify-between bg-slate-400 p-4 my-2 capitalize text-red-500",
  row: "flex overflow-hidden",
  text: "ml-2 cursor-pointer",
  textComplete: "ml-2 cursor-pointer line-through",
  liButton: "cursor-pointer flex items-center hover:text-red-500 text-xl",
};

export default styles;
