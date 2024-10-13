const createError = require("http-errors");
const { successResponse } = require("./responseController");
const User = require("../models/userModel");
const { findById } = require("../services/findItem");
const { deleteImage } = require("../helper/deleteImage");


const getUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        limit = Number(req.query.limit) || 10;
        const searchRegex = new RegExp('.*' + search + '.*', "i");
        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegex } },
                { email: { $regex: searchRegex } },
                { phone: { $regex: searchRegex } },
            ]
        }

        const options = {
            password: 0
        }

        const users = await User.find(filter, options)
            .limit(limit)
            .skip((page - 1) * limit)
        const totalUsers = await User.countDocuments(filter)
        if (!users) throw createError(404, 'No User Found')


        return successResponse(res, {
            statusCode: 200,
            message: 'All Users Are Return Successfully',
            payload: {
                users,
                pagination: {
                    totalPages: Math.ceil(totalUsers / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(totalUsers / limit) ? page + 1 : null,
                }
            }
        })
    } catch (error) {
        next(error)
    }
}
const getUserByID = async (req, res, next) => {
    try {
        const id = req.params.id;
        const options = {
            password: 0
        }
        const user = await findById(User, id, options);
        return successResponse(res, {
            statusCode: 200,
            message: 'User Return Successfully',
            payload: { user }
        })
    } catch (error) {
        next(error)
    }
}
const deleteUserByID = async (req, res, next) => {
    try {
        const id = req.params.id;
        const options = {
            password: 0
        }
        const user = await findById(User,id, options);
        const userImagePath = user.image;

        deleteImage(userImagePath);

        await User.findByIdAndDelete({_id:id, isAdmin: false});
        return successResponse(res, {
            statusCode: 200,
            message: 'User Delete Successfully',
            payload: {}
        })
    } catch (error) {
        next(error)
    }
}



module.exports = { getUsers, getUserByID, deleteUserByID }