import useGithubUser from "../hooks/useGithubUser";
import UserCard from "../components/user/UserCard";



const GITHUB_USERNAME = "RawdhaMahmoud";


const Header = () => {
  const { data: user, isLoading, error } = useGithubUser(GITHUB_USERNAME);

  return (
    <header className="top-bar">
      <h1 className="page-title">Todo List</h1>

      <div className="header-actions">

        <UserCard user={user ?? null} loading={isLoading} error={error} />
      </div>
    </header>
  );
};

export default Header;