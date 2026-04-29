import MainLayout from "./layouts/MainLayout";
import TodoList from "./components/todos/TodoList";
const App = () => {
  return (
    <MainLayout>
      <TodoList />
    </MainLayout>
  );
};
export default App;