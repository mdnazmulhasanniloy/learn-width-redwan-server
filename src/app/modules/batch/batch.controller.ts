import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import { BatchService } from './batch.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IBatch } from './batch.interface';
import pick from '../../../shared/pick';
import { batchFilterableFields } from './batch.constants';
import { paginationFields } from '../../../constants/pagination';

const createBatch = CatchAsync(async (req: Request, res: Response) => {
  const batch = req?.body;
  const result = await BatchService.createBatch(batch);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'batch created successfully!',
    data: result,
  });
});

//get all batch
const getAllBatch = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, batchFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BatchService.getAllBatches(filters, paginationOptions);

  sendResponse<IBatch[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all batch get successfully!',
    meta: result?.meta,
    data: result?.data,
  });
});

//get batch by id
const getBatchById = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BatchService.getBatchById(id);
  sendResponse<IBatch>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'batch retrieved successfully!',
    data: result,
  });
});

//update batch
const updateBatch = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req?.body;
  const result = await BatchService.updateBatch(id as string, updatedData);
  sendResponse<IBatch>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'batch updated successfully!',
    data: result,
  });
});

//delete batch
const deleteBatch = CatchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await BatchService.deleteBatch(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'batch deleted successfully!',
    data: result,
  });
});

export const BatchController = {
  createBatch,
  getAllBatch,
  getBatchById,
  updateBatch,
  deleteBatch,
};
