const { getAllUsers, createUser, findUserByEmail, updateUser } = require('../models/userModel');
const { generateToken, hashPassword, isPasswordValid } = require('../utils/authHelpers');


const fetchUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });

    const hashedPassword = await hashPassword(password);
    const user = await createUser(name, email, hashedPassword);

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });
    const isValid = await isPasswordValid(password, user.password);
    if (!isValid) return res.status(400).json({ error: 'Invalid email or password' });
    
    delete user.password;
    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserDetails = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user.id;

  try {
    const updatedUser = await updateUser(userId, name, email);
    delete updateUser.password
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchUsers, signup, login, updateUserDetails };
