import { BASE_URL } from '../env';

export default function fetcher(path) {
    return fetch(BASE_URL+"/"+path)
    .catch((error) => {
        console.error(error);
      });
}