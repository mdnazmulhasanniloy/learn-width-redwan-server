import { Batch } from './batch.models';

export const findLastBatchId = async (): Promise<string | undefined> => {
  const lastBatchId = await Batch.findOne().sort({ createdAt: -1 }).lean();
  return lastBatchId?.id
    ? lastBatchId?.id.substring(2)
    : // eslint-disable-next-line no-undefined
      undefined;
};

export const generateBatchId = async (): Promise<string> => {
  const currentId =
    (await findLastBatchId()) || (0).toString().padStart(5, '0');
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `B-${incrementedId}`;
  return incrementedId.toString();
};
