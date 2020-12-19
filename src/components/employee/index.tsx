import React, { Component } from "react";
import { Table, Modal, Input, Select, DatePicker, Button } from "antd";

import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import QueryForm from "./queryForm";
import getColunms from "./colums";
import {
  EmployeeResponse,
  EmployeeRequest,
  EmployeeInfo,
  CreateRequest,
  DeleteRequest,
  UpdateRequest,
} from "../../interface/emplayee";
import {
  createEmployee,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} from "../../redux/employee";
import InfoModal from "./infnModal";
import { DOWNLOAD_EMPLOYEE_URL } from "../../constants/urls";
import "./index.css";

interface Props {
  onGetEmployee(param: EmployeeRequest, callback: () => void): void;
  onCreateEmployee(param: CreateRequest, callback: () => void): void;
  onDeleteEmployee(param: DeleteRequest): void;
  onUpdateEmployee(param: UpdateRequest, callback: () => void): void;
  employeeList: EmployeeResponse;
}

interface State {
  loading: boolean;
  showModal: Boolean;
  edit: boolean;
  rowData: Partial<EmployeeInfo>;
}

class Employee extends Component<Props, State> {
  state = {
    loading: false,
    showModal: false,
    edit: false,
    rowData: {},
  };

  setLoading = (loading: boolean) => {
    this.setState({
      loading,
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
      rowData: {},
    });
  };

  handleCreate = () => {
    this.setState({
      showModal: true,
      edit: false,
      rowData: {},
    });
  };

  handleUpdate = (record: EmployeeInfo) => {
    this.setState({
      showModal: true,
      edit: true,
      rowData: record,
    });
  };

  handleDelete = (param: DeleteRequest) => {
    this.props.onDeleteEmployee(param);
  };

  setModal1Visible(param: boolean) {
    this.setState({
      showModal: param,
    });
  }

  handleDownload = () => {
    window.open(DOWNLOAD_EMPLOYEE_URL);
  };

  render() {
    const {
      employeeList,
      onGetEmployee,
      onCreateEmployee,
      onUpdateEmployee,
    } = this.props;
    return (
      <main className="main">
        <QueryForm getData={onGetEmployee} setLoading={this.setLoading} />
        <div className="buttons">
          <Button type="primary" icon="plus" onClick={this.handleCreate}>
            添加新员工
          </Button>
          <Button type="primary" icon="download" onClick={this.handleDownload}>
            导出
          </Button>
        </div>
        <InfoModal
          visible={this.state.showModal}
          edit={this.state.edit}
          rowData={this.state.rowData}
          hide={this.hideModal}
          createData={onCreateEmployee}
          updateData={onUpdateEmployee}
        />
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
      onCreateEmployee: createEmployee,
      onUpdateEmployee: updateEmployee,
      onDeleteEmployee: deleteEmployee,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
