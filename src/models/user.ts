import * as usersService from '../services/index';

export default {
    namespace: 'user',
    state: {
        username:''
    },
    reducers: {
        updateUser(state, { payload: { username } }) { return { username } },
    },
};
