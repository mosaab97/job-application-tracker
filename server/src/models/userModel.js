const { simpleExecute } = require("../config/database");

const getAllUsers = async () => {
  const result = await simpleExecute('users/getUsers.sql');
  return result.rows;
};

// Create a new user
const createUser = async (name, email, hashedPassword) => {
  const values = [name, email, hashedPassword];
  const result = await simpleExecute('users/createUser.sql', values);
  return result.rows[0];
};

// Find a user by email
const findUserByEmail = async (email) => {
  const result = await simpleExecute('users/getUserByEmail.sql', [email]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await simpleExecute('users/getUserById.sql', [id]);
  return result.rows[0];
};

// Update user details
const updateUser = async (id, name, email) => {
  const values = [name, email, id];
  const result = await simpleExecute('users/updateUser.sql', values);
  return result.rows[0];
};

module.exports = { getAllUsers, createUser, findUserByEmail, updateUser, findUserById };
