import { Auth } from '../containers/auth-container';

const Profile = () => {
  const { loading, user, error } = Auth.useContainer();

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <div>Profile of {user!.authorized ? JSON.stringify(user!.user) : 'Not logged in'}</div>;
};

export default Profile;
