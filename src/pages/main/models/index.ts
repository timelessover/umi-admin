import * as usersService from '../services/index';

export default {
    namespace: 'count',
    state: {
        name:'xxx'
    },
    reducers: {
        add(count) { return count + 1 },
        minus(count) { return count - 1 },
    },
};
