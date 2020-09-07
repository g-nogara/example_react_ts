export default async () => {
  const TTLAuth = 5 * 60 * 1000; // 5 Minutes in milliseconds
  const authAge = sessionStorage.getItem('createdAt');
  if (typeof authAge !== 'string') {
    sessionStorage.clear();
    window.location.replace(`${process.env.REACT_APP_SPA_URL}:${process.env.REACT_APP_SPA_PORT}/`);
    return;
  }
  const dateAuth = new Date(authAge);
  const timeSinceAuth = Math.abs(dateAuth.getTime() - Date.now());
  if (timeSinceAuth > TTLAuth) {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/usuario/renovar-ticket?token=${sessionStorage.getItem('token')}`)
      return true;
    } catch (error) {
      console.error(`Falha ao renovar token: ${error}`);
      return false
    }
  }
  return true;
}