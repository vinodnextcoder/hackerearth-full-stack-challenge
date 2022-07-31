
// import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
export const successMessage = async (message, data) => {
  return {
    status: {
      code: 1000,
      header: "SUCCESS",
      description: message
    },
    data: data
  }

};
export const errorMessage = async (error, data) => {

  return {
    status: {
      code: 9999,
      header: "Bad request",
      description: error
    },
    data: null,
  }
};