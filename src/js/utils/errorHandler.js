export default async function errorHandler(err) {
  let error;
  if (err.message) {
    error = err.then((parsedErr) => parsedErr.message);
  } else {
    error = await err.then((parsedErr) => `Ошибка ${parsedErr.message}`);
  }
  console.log(error);
}