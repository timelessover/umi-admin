import * as usersService from '../services/index';

export default {
    namespace: 'login',
    state: {
        // 0:登陆，1：注册
        status: 0,
        username: null
    },
    reducers: {
        changeStatus(state, { payload: { status } }) { return { status } },
    },
    effects: {
        *login(action, { put, call }) {
            const { payload } = action
            const user = yield call(usersService.login, payload);
            yield put({ type: 'updateUser', payload: { username: user.data.name } });
        },
    }
};
