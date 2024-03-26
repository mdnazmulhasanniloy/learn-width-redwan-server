import { v4 as uuidv4 } from 'uuid';

export const getTranId = async (): Promise<string> => {
  const id = uuidv4();
  return id.toString();
};
