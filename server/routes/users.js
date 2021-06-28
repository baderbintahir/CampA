import express from 'express'

import { login, getUsers, createUser, updateUser, updateUserRoles, deleteUser, deleteUserRoles } from '../controllers/users.js'

const router = express.Router()

router.post('/login', login)
router.get('/', getUsers)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.patch('/pushRole/:username', updateUserRoles)
router.delete('/:id', deleteUser)
router.patch('/deleteRole/:username', deleteUserRoles)

export default router