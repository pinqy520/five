/* @flow */

export default function (state = { list: '', date: ''}, action) {
    switch (action.type) {
        case 'SHOW_PAPAR_LIST':
            return action.data
        default:
            return state
    }
}
