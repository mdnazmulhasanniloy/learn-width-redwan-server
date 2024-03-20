import { Module } from './modules.models';

//modules generate id
const findLastModuleId = async (): Promise<string | undefined> => {
  const lastModuleId = await Module.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  // eslint-disable-next-line no-undefined
  return lastModuleId?.id ? lastModuleId.id.substring(2) : undefined;
};
export const generateModuleId = async (): Promise<string> => {
  const currentId =
    (await findLastModuleId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `M-${incrementedId}`;

  return incrementedId;
};
