import type { GithubUser } from "../../types";
interface UserCardProps {
  user: GithubUser | null;
  loading: boolean;
  error: Error | null;
}


const UserCard = ({ user, loading, error }: UserCardProps) => {
  if (loading) {
    return (
      <div className="user-card is-loading">
        <div className="avatar-skeleton" />
        <div className="text-skeleton">
          <div className="skeleton-line is-wide" />
          <div className="skeleton-line is-narrow" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-card is-error">
        <span>{error.message}</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="user-card">
      <img
        src={user.avatar_url}
        alt={`${user.name}'s avatar`}
        className="user-avatar"
      />
      <div className="user-details">
        <p className="user-name">{user.name || user.login}</p>
        {user.bio && <p className="user-bio">{user.bio}</p>}
        <div className="user-stats">
          <span> {user.public_repos} repos</span>
          <span>{user.followers} followers</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;