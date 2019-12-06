import * as usersService from '../services/index';

export default {
    namespace: 'users',
    state: {
        user: null
    },
    reducers: {
        updateUser(state,{payload:{user}}) {  return { user } },
    },
    effects: {
        *getUser(action, { put, call }) {
            const {payload} = action
            const user = yield call(usersService.fetch,payload);
            yield put({ type: 'updateUser', payload: { user:user.data.name }});
        }
    }
};
