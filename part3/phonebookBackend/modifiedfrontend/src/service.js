import axios from "axios";

const url = "/api/persons";

const getAll = () => {
  const request = axios.get(url);

  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const response = axios.put(`${url}/${id}`, newObject);

  return response.then((response) => {
    return response.data;
  });
};

const create = (newObject) => {
  const request = axios.post(url, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update };
