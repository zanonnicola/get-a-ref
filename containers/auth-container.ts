import { createContainer } from 'unstated-next';
import useSWR from 'swr';
import { ENDPOINTS } from './endpoints';
import { UserService } from '../services/user-serivce';

const userService = new UserService();

function useAuth() {
  const { data: user, error } = useSWR(ENDPOINTS.USER, userService.getUser);
  const loading = user === undefined;
  return {
    user,
    loading,
    error,
  };
}

const Auth = createContainer(useAuth);

export { Auth };
