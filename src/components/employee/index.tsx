import React, { Component } from "react";
import { Table, Modal, Input, Select, DatePicker } from "antd";

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

interface State {
  modalVisible: Boolean;
}

const { Option } = Select;
const width = 250;

class Employee extends Component<Props, State> {
  state = {
    modalVisible: false,
  };

  handleDelete = () => {
    console.log("delete");
    // this.props.onDeleteEmployee(param);
  };

  setModal1Visible(param: boolean) {
    this.setState({
      modalVisible: true,
    });
  }
  handleUpdate = () => {
    this.setState({
      modalVisible: true,
      // edit: true,
      // rowData: record,
    });
    console.log("update");
  };
  onChangeDate(date: any, dateString: any) {
    console.log(date, dateString);
  }

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
        <Modal
          title="编辑"
          style={{ top: 20 }}
          visible={this.state.modalVisible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        >
          <Input
            placeholder="姓名"
            style={{ width: width }}
            className="modal-content"
          />
          <Select
            placeholder="部门"
            allowClear
            style={{ width: width }}
            className="modal-content"
          >
            <Option value={1}>技术部</Option>
            <Option value={2}>产品部</Option>
            <Option value={3}>市场部</Option>
            <Option value={4}>运营部</Option>
          </Select>
          <DatePicker
            onChange={this.onChangeDate}
            placeholder="入职时间"
            style={{ width: width }}
            className="modal-content"
          />
          <Select
            placeholder="职级"
            allowClear
            style={{ width: width }}
            className="modal-content"
          >
            <Option value={1}>1级</Option>
            <Option value={2}>2级</Option>
            <Option value={3}>3级</Option>
            <Option value={4}>4级</Option>
          </Select>
        </Modal>
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
