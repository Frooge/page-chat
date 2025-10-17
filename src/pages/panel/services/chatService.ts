import api from '@src/utils/api';
import { ChatStreamRequest } from '@page-chat/api-schema';

export async function streamChat(prompt: string): Promise<ReadableStream<Uint8Array>> {
  const request: ChatStreamRequest = { prompt };
  const response = await api.post<ReadableStream<Uint8Array>>('/chat/stream', request, {
    responseType: 'stream',
  });
  
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Stream request failed: ${response.statusText}`);
  }
  
  // Return the underlying response stream
  return response.data;
}
