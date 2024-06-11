import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import { CourseService } from './course.service';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { courseFilterableFields } from './course.constants';
import { paginationFields } from '../../../constants/pagination';
import { ICourse } from './course.interface';

const createCourse = CatchAsync(async (req: Request, res: Response) => {
  const { file } = req;
  const course = { ...req?.body };

  const result = await CourseService.createCourse(course, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course created successfully!',
    data: result,
  });
});

//get all courses
const getAllCourses = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, courseFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  // console.log(req.headers);
  const result = await CourseService.getAllCourses(filters, paginationOptions);

  sendResponse<ICourse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all course get successfully!',
    meta: result?.meta,
    data: result?.data,
  });
});

//get course by id
const getCourseById = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CourseService.getCourseById(id);
  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course retrieved successfully!',
    data: result,
  });
});

//update course
const updateCourse = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { file } = req;
  const updatedData = { ...req?.body };

  const result = await CourseService.updateCourse(
    id as string,
    updatedData,
    file,
  );
  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course updated successfully!',
    data: result,
  });
});

//delete course
const deleteCourse = CatchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;

  const result = await CourseService.deleteCourse(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course deleted successfully!',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
