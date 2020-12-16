import { Dispatch } from "redux";
import _ from "lodash";

import { get, post } from "../../utils/request";
import { department, level } from "../../constants/options";

import {
  GET_EMPLOYEE_URL,
  CREATE_EMPLOYEE_URL,
  DELETE_EMPLOYEE_URL,
  UPDATE_EMPLOYEE_URL,
} from "../../constants/urls";

import {
  GET_EMPLOYEE,
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "../../constants/actions";

import {
  EmployeeInfo,
  EmployeeRequest,
  EmployeeResponse,
  CreateRequest,
  DeleteRequest,
  UpdateRequest,
} from "../../interface/emplayee";

type State = Readonly<{
  employeeList: EmployeeResponse;
}>;

type Action = {
  type: string;
  payload: EmployeeResponse;
};

const initialState: State = {
  employeeList: undefined,
};

export function getEmployee(param: EmployeeRequest) {
  return (dispatch: Dispatch) => {
    get(GET_EMPLOYEE_URL, param).then((res) => {
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data,
      });
    });
  };
}

export function createEmployee(param: CreateRequest, callback: () => void) {
  return (dispatch: Dispatch) => {
    post(CREATE_EMPLOYEE_URL, param).then((res) => {
      dispatch({
        type: CREATE_EMPLOYEE,
        payload: {
          name: param.name,
          department: department[param.departmentId],
          departmentId: param.departmentId,
          hiredate: param.hiredate,
          level: level[param.levelId],
          levelId: param.levelId,
          ...res.data,
        },
      });
      callback();
    });
  };
}

export function deleteEmployee(param: DeleteRequest) {
  return (dispatch: Dispatch) => {
    post(DELETE_EMPLOYEE_URL, param).then((res) => {
      dispatch({
        type: DELETE_EMPLOYEE,
        payload: param.id,
      });
    });
  };
}

export function updateEmployee(param: UpdateRequest, callback: () => void) {
  return (dispatch: Dispatch) => {
    post(UPDATE_EMPLOYEE_URL, param).then((res) => {
      dispatch({
        type: UPDATE_EMPLOYEE,
        payload: param,
      });
      callback();
    });
  };
}

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        employeeList: action.payload,
      };
    case CREATE_EMPLOYEE:
      let newList = [action.payload, ...(state.employeeList as EmployeeInfo[])];
      return {
        ...state,
        employeeList: newList,
      };
    default:
      return state;
  }
}
