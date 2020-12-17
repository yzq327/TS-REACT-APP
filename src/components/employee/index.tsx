import React, { Component } from "react";
import { Table } from "antd";

import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import QueryForm from "./queryForm";
import getColunms from "./colums";
import { EmployeeResponse, EmployeeRequest } from "../../interface/emplayee";
import { getEmployee } from "../../redux/employee";
import AddAndExport from "./addOrExport";
import "./index.css";

interface Props {
  onGetEmployee(param: EmployeeRequest): void;
  employeeList: EmployeeResponse;
}

class Employee extends Component<Props> {
  handleDelete = () => {
    console.log("delete");
    // this.props.onDeleteEmployee(param);
  };
  handleUpdate = () => {
    // this.setState({
    //   showModal: true,
    //   edit: true,
    //   rowData: record,
    // });
    console.log("update");
  };

  render() {
    const { employeeList, onGetEmployee } = this.props;
    return (
      <main className="main">
        <QueryForm getData={onGetEmployee} />
        <AddAndExport />
        <Table
          columns={getColunms(this.handleUpdate, this.handleDelete)}
          dataSource={employeeList}
          className="table"
        />
      </main>
    );
  }
}

const mapStateToProps = (state: any) => ({
  employeeList: state.employee.employeeList,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onGetEmployee: getEmployee,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
