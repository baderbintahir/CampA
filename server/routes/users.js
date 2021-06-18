import express from 'express'

import { login, getUsers, createUser, updateUser, deleteUser } from '../controllers/users.js'

const router = express.Router()

router.post('/login', login)
router.get('/', getUsers)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router