export async function FetchUserInfo(errorFn: any, uid: string) {
  const req = await fetch("/api/users/userprofile");
  if (!req.ok) {
    errorFn();
    return;
  }
  const { username, imgUser, description } = await req.json();
  return { username, imgUser, description };
}
