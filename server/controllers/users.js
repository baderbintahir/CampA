import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const secret = 'test';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const oldUser = await User.findOne({ username });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const createUser = async (req, res) => {
    const { name, username, password, email, cnic, phoneNumber, designation, roles } = req.body;

    try {
        const oldUser = await User.findOne({ username });

        if (oldUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ name, username, password: hashedPassword, email, cnic, phoneNumber, designation, roles });

        res.status(201).json({ result });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
};

export const updateUser = async (req, res) => {
    const { id: _id } = req.params
    const user = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id')

    const updatedUser = await User.findByIdAndUpdate(_id, { ...user, _id }, { new: true })

    res.json(updatedUser)
}

export const deleteUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id')

    await User.findByIdAndRemove(id)

    res.json({ message: "User deleted successfully!" })
}