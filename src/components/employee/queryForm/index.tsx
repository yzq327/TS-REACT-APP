import React, { Component } from "react";
import { Form, Input, Select, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { EmployeeRequest } from "../../../interface/emplayee";

const { Option } = Select;

interface Props extends FormComponentProps {
  getData(param: EmployeeRequest, callback: () => void): void;
  setLoading(loading: boolean): void;
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
    this.queryEmployee(this.state);
  };
  componentDidMount() {
    this.queryEmployee(this.state);
  }
  queryEmployee(param: EmployeeRequest) {
    this.props.setLoading(true);
    this.props.getData(param, () => {
      this.props.setLoading(false);
    });
  }

  handleReset = () => {
    this.setState({
      name: "",
      departmentId: undefined,
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
          <Button type="primary" icon="search" onClick={this.handleClick}>
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={this.handleReset}>重置</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrapQueryForm = Form.create<Props>({
  name: "employee_query",
})(QueryForm);

export default WrapQueryForm;
