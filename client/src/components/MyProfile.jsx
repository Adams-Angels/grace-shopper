import useAuth from "../components/Auth/hooks/useAuth";
export function MyProfile() {
  const { user } = useAuth();
  return (
    <div>
      <h3>Welcome, {user.username}</h3>;
    </div>
  );
}
