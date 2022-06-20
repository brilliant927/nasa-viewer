import { doGet } from './http';
import { ApiSearchResponse } from '../types/collection';

export const apiService = {
  collections: async (searchUrl: string): Promise<ApiSearchResponse> => {
    return doGet<ApiSearchResponse>({ url: `search?${searchUrl}` });
  }
}
