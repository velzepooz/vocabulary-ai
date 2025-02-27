import { Word } from '../types/vocabulary.types';
import { HttpRequestUtil } from '../utils/http-request';

export async function getWordsRequest(accessToken: string): Promise<Word[]> {
  const response = await HttpRequestUtil.makeGetRequest<Word[]>(`${process.env.NEXT_PUBLIC_API_URL}/words`, {
    Authorization: `Bearer ${accessToken}`,
  });

  return response;
}