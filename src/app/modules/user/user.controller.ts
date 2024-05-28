// import { NextFunction, RequestHandler } from 'express-serve-static-core'
import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { IUser } from './user.interface';
import { paginationFields } from '../../../constants/pagination';
import { userFilterableFields } from './user.constants';

const createUser = CatchAsync(async (req: Request, res: Response) => {
  const user = req?.body;
  const result = await UserService.createUser(user);
  console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
  });
});

//get all user
const getAllUsers = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'users get successfully!',
    meta: result?.meta,
    data: result?.data,
  });
});

//get user by email
const getUserByEmail = CatchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await UserService.getUserByEmail(email);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user get successfully!',
    data: result,
  });
});

//update user
const updateUser = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await UserService.updateUser(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user updated successfully!',
    data: result,
  });
});

//block user
const blockUser = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.blockUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user blocked successfully!',
    data: result,
  });
});

//delete user
const deleteUser = CatchAsync(async (req: Request, res: Response) => {
  const id = req?.params.id;
  const result = await UserService.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user deleted successfully!',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  blockUser,
  deleteUser,
};
