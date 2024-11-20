export const sendResponse = ({ res, code, message, data }) => {
  const response = {
    status: code >= 200 && code < 300 ? 'success' : 'error'
  };

  if (message) {
    response.message = message;
  }

  if (data) {
    response.results = data;
  }

  res.status(code).json(response);
};
