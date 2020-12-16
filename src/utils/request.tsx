import originAxios from "axios";
import { message } from "antd";

const axios = originAxios.create({
  timeout: 20000,
});

axios.interceptors.response.use(
  function (response) {
    if (response.data && response.data.flag === 1) {
      let errormsg = response.data.msg;
      message.error(errormsg);
      return Promise.reject(errormsg);
    }
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export function get(url: string, date: any) {
  return axios.get(url, { params: date });
}

export function post(url: string, data: any) {
  return axios({
    method: "post",
    url,
    data,
  });
}
