import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { LectureService } from './lecture.service';
import { ILecture } from './lecture.interface';
import pick from '../../../shared/pick';
import { lectureFilterableFields } from './lecture.constants';
import { paginationFields } from '../../../constants/pagination';

//create a lecture
const createLecture = CatchAsync(async (req: Request, res: Response) => {
  const lecture = req.body;
  const result = await LectureService.createLecture(lecture);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'lecture created successfully!',
    data: result,
  });
});

//get all lectures

const getAllLectures = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, lectureFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await LectureService.getAllLectures(
    filters,
    paginationOptions,
  );

  sendResponse<ILecture[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all lecture get successfully!',
    meta: result?.meta,
    data: result?.data,
  });
});

//get lecture by id

const getLectureById = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await LectureService.getLectureById(id);
  sendResponse<ILecture>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'lecture get successfully!',
    data: result,
  });
});

//update lecture

const updateLecture = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const lecture = req.body;
  const result = await LectureService.updateLecture(id, lecture);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'lecture updated successfully!',
    data: result,
  });
});

//delete lecture

const deleteLecture = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await LectureService.deleteLecture(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'lecture deleted successfully!',
    data: result,
  });
});

export const LectureController = {
  createLecture,
  getAllLectures,
  getLectureById,
  updateLecture,
  deleteLecture,
};
