import React, { Component } from "react";
import { Form, Input, Select, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { EmployeeRequest, EmployeeResponse } from "../../../interface/emplayee";
import { GET_EMPLOYEE_URL } from "../../../constants/urls";
import { get } from "../../../utils/request";

const { Option } = Select;

interface Props extends FormComponentProps {
  onDataChange(employee: EmployeeResponse): void;
}

class QueryForm extends Component<Props, EmployeeRequest> {
  state: EmployeeRequest = {
    name: "",
    departmentId: undefined,
  };
  handleChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ name: e.currentTarget.value });
  };
  handleChangeDepartment = (value: number) => {
    this.setState({ departmentId: value });
  };
  handleClick = () => {
    this.queryDepartment(this.state);
  };
  componentDidMount() {
    this.queryDepartment(this.state);
  }
  queryDepartment = (param: EmployeeRequest) => {
    console.log(param);
    get(GET_EMPLOYEE_URL, param).then((response) => {
      this.props.onDataChange(response.data);
    });
  };

  render() {
    return (
      <Form layout="inline">
        <Form.Item>
          <Input
            placeholder="姓名"
            style={{ width: 120 }}
            allowClear
            value={this.state.name}
            onChange={this.handleChangeName}
          />
        </Form.Item>
        <Form.Item>
          <Select
            placeholder="部门"
            style={{ width: 120 }}
            allowClear
            value={this.state.departmentId}
            onChange={this.handleChangeDepartment}
          >
            <Option value={1}>技术部</Option>
            <Option value={2}>产品部</Option>
            <Option value={3}>市场部</Option>
            <Option value={4}>运营部</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.handleClick}>
            查询
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrapQueryForm = Form.create<Props>({
  name: "employee_query",
})(QueryForm);

export default WrapQueryForm;