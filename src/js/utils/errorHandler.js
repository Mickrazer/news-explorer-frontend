export default async function errorHandler(err) {
  let error;
  if (err.message) {
    error = `Ошибка: ${err.message}`;
  } else {
    error = await err.then((parsedErr) => `Ошибка ${parsedErr.statusCode}: ${parsedErr.message}`);
  }
  console.log(error);
}