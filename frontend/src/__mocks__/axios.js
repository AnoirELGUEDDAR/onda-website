// Simple axios mock usable for both axios.get(...) and axios.create(...).get(...)
const get = jest.fn();
const post = jest.fn();
const put = jest.fn();
const del = jest.fn();

const mockInstance = {
  get,
  post,
  put,
  delete: del,
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
  },
};

const axiosMock = {
  get,
  post,
  put,
  delete: del,
  create: () => mockInstance,
  // If some code does axios.defaults...
  defaults: {},
  isAxiosError: () => false,
};

export default axiosMock;
