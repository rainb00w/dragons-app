import axios from 'axios';

const axiosRequest = axios.create({
    baseURL: 'https://api.spacexdata.com/v4/',
  });

  export function fetchDragons() {
    return axiosRequest(`dragons`).then(res => {
      if (!(res.status >= 200 && res.status < 300)) {
        throw Error(res.statusText);
      }
      return res.data;
    });
}

export function fetchDragonById(ID) {
    return axiosRequest(`dragons/${ID}`).then(res => {
      if (!(res.status >= 200 && res.status < 300)) {
        throw Error(res.statusText);
      }
      return res.data;
    });
  }