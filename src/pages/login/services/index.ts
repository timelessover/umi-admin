import request from '../../../utils/request';

export function fetch() {
  return request(`http://localhost:8000/api/users`);
};
