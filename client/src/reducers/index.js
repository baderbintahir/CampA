import { combineReducers } from 'redux'

import posts from './posts.js'
import users from './users'

export default combineReducers({
    posts,
    users
})