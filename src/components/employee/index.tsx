import React, { Component } from "react";
import { Table } from "antd";

import QueryForm from "./queryForm";
import { employeeColumns } from "./colums";
import { EmployeeResponse  } from "../../interface/emplayee";
import "./index.css";

interface State {
  employee: EmployeeResponse;
}

class Employee extends Component<{}, State> {
  state: State = {
    employee: undefined,
  };
  setEmployee = (employee: EmployeeResponse) => {
    this.setState({
      employee,
    });
  };
  totolEmployee() {
    let total: number;
    if (typeof this.state.employee !== "undefined") {
      total = this.state.employee.length;
    } else {
      total = 0;
    }
    return <p>共 {total} 名员工</p>;
  }
  render() {
    return (
      <main className="main">
        <QueryForm onDataChange={this.setEmployee} />
        {this.totolEmployee()}
        <Table
          columns={employeeColumns}
          dataSource={this.state.employee}
          className="table"
        />
      </main>
    );
  }
}

export default Employee;
