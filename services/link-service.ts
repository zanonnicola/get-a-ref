import { get } from '../network/http';
import { LinkDTO } from '../pages/api/link';

class LinkService {
  /**
   *
   * @param {string} path - API endpoint. Must include ?id=number
   */
  getLink(path: string) {
    return get<LinkDTO>(path);
  }
}

export { LinkService };
