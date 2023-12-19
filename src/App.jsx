import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const App = () => {
  return (
    <div className="max-w-6xl mx-auto min-h-screen flex justify-between">
      <UserForm />
      <UserList />
    </div>
  );
};

export default App;
