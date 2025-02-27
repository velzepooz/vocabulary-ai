'use server';
import { getWordsRequest } from '../../api/vocabulary';
import { Word } from '../../types/vocabulary.types';
import { getSessionToken } from '../../session';

export async function getWords(): Promise<Word[]>{
  try {
    const accessToken = await getSessionToken();
    const words = await getWordsRequest(accessToken);

    return words;
  } catch (error) {
    console.error(error);

    return [];
  }
}

