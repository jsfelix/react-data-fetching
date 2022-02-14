import axios from "axios";
import { useQuery } from "react-query";

type Repository = {
  full_name: string;
  description: string;
};

function App() {
  const { data: repositories, isFetching } = useQuery<Repository[]>(
    "repos",
    async () => {
      const response = await axios.get(
        "https://api.github.com/users/jsfelix/repos"
      );
      return response.data;
    },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  return (
    <ul>
      {isFetching && <p>Carregando...</p>}
      {repositories?.map((repo) => (
        <li key={repo.full_name}>
          <strong>{repo.full_name}</strong>
          <p>{repo.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default App;
