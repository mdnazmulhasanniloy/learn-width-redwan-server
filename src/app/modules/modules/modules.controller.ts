import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ModuleService } from './modules.service';
import pick from '../../../shared/pick';
import { ModuleFilterableFields } from './modules.constants';
import { paginationFields } from '../../../constants/pagination';
import { IModules } from './modules.interface';

//create a module
const createModule = CatchAsync(async (req: Request, res: Response) => {
  const module = req?.body;
  const result = await ModuleService.createModule(module);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'module created successfully!',
    data: result,
  });
});

//get all modules
const getAllModules = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ModuleFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ModuleService.getAllModules(filters, paginationOptions);

  sendResponse<IModules[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all modules get successfully!',
    meta: result?.meta,
    data: result?.data,
  });
});

//get modules by id
const getModuleById = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ModuleService.getModuleById(id);
  sendResponse<IModules>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'module retrieved successfully!',
    data: result,
  });
});

//update module
const updateModule = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req?.body;
  const result = await ModuleService.updateModules(id as string, updatedData);
  sendResponse<IModules>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'module updated successfully!',
    data: result,
  });
});

//delete module
const deleteModule = CatchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await ModuleService.deleteModule(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'module deleted successfully!',
    data: result,
  });
});

export const ModuleController = {
  createModule,
  getAllModules,
  getModuleById,
  updateModule,
  deleteModule,
};
