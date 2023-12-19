import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("http://localhost:5000/api/users").then((res) => res.json()),
  });
  const users = data?.data?.users;
  return { isLoading, error, users, refetch };
};

export { useUsers };
