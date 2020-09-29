import { get } from '../network/http';
import { UserDTO } from '../pages/api/user';

class UserService {
  getUser(path: string) {
    return get<UserDTO>(path);
  }
}

export { UserService };
