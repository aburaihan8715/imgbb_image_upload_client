import { useUsers } from "../hooks/useUsers";

const UserList = () => {
  const { isLoading, error, users } = useUsers();
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="p-4 flex-1">
      <h3 className="text-center text-3xl font-medium uppercase">user list</h3>
      <ul className="">
        {users?.map((item) => (
          <li key={item._id} className="border-b flex items-center gap-4  p-4">
            <div className="bg-slate-600">
              <img className="h-[100px] w-full object-contain pt-2" src={item.image || "default-user.png"} alt="profile" />
            </div>
            <div>
              <h2 className="text-2xl font-medium uppercase">{item.name}</h2>
              <p className="lowercase">{item.email}</p>
            </div>
            <div className="flex gap-2 items-start">
              <button className="c-btn bg-green-600">delete</button>
              <button className="c-btn bg-green-600">update</button>
              <button className="c-btn bg-blue-600">details</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
