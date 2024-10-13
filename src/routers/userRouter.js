const { getUsers,getUserByID, deleteUserByID } = require('../controllers/userController');

const userRouter = require('express').Router();




userRouter.get('/',getUsers);
userRouter.get('/:id',getUserByID);
userRouter.delete('/:id', deleteUserByID);

module.exports = {userRouter}
