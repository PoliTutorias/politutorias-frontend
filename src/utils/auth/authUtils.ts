export async function getTutorIdFromSession(): Promise<string> {
  // TODO: Replace this mock with real auth/session integration.
  return process.env.TEST_TUTOR_ID ?? process.env.NEXT_PUBLIC_TUTOR_ID ?? 'mock-tutor-id-123';
}
