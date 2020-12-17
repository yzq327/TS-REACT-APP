import React from "react";
import { Select, Input, Button, Modal, DatePicker } from "antd";

import "./index.css";
const { Option } = Select;
const width = 300;
class AddAndExport extends React.Component {
  state = {
    modalVisible: false,
  };

  setModal1Visible(param: Boolean) {
    this.setState({ modalVisible: param });
    console.log("modal1Visible", this.state.modalVisible);
  }

  onChangeDate(date: any, dateString: any) {
    console.log(date, dateString);
  }

  handleDownload = () => {
    console.log("download");
  };
  render() {
    return (
      <div className="buttons">
        <Button
          type="primary"
          icon="plus"
          onClick={() => this.setModal1Visible(true)}
        >
          添加新员工
        </Button>
        <Modal
          title="添加新员工"
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
        <Button type="primary" icon="download" onClick={this.handleDownload}>
          导出
        </Button>
      </div>
    );
  }
}

export default AddAndExport;
