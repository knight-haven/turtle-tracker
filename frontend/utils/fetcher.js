import { BASE_URL } from '../env';

/* 
  Basic function to fetch data from the backend schema
  that replaces to BASE_URL with whatever the location
  of the backend is. 
*/
export default function fetcher(path) {
  return fetch(BASE_URL + path)
}