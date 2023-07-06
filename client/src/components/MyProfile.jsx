import useAuth from "../components/Auth/hooks/useAuth";
export function MyProfile() {
  const { user } = useAuth() || null;
  console.log("user from myprofile", user);
  return (
    <div>
      user && <h3>Welcome, {user.user.username}</h3>
    </div>
  );
}
