import React, { Component } from 'react';
import { Table, message, Card } from 'antd';
import 'whatwg-fetch'
import { Link } from 'react-router-dom'
import Cnf from "../../utils/config"
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva'
import styles from './index.less'

const columns = (self) => [
  {
    title: formatMessage({ id: 'delegate.username' }),
    dataIndex: 'username',
    sorter: false,
    width: '15%',
    render: (text, record, index) => {
      const length = text.length / 2
      return text.substr(0, length) + '***'
    }
  },
  {
    title: formatMessage({ id: 'delegate.address' }),
    dataIndex: 'address',
    sorter: false,
    width: '25%',
    render: (text, record, index) => { return <Link to={"/accounts/" + text} target="_blank">{text}</Link> }
  }, {
    title: formatMessage({ id: 'delegate.approval' }),
    dataIndex: 'approval',
    sorter: false,
    width: '20%',
    render: text => `${text}%`
  },
  {
    title: formatMessage({ id: 'delegate.productivity' }),
    sorter: false,
    width: '15%',
    dataIndex: 'productivity',
    render: text => `${text}%`
  }, {
    title:  formatMessage({id:'delegate.forged'}) + `(${Cnf.coinName})`,
    sorter: false,
    width: '15%',
    dataIndex: 'forged',
    render: text => `${text / 100000000}`  
  }
];
@connect(({ delegatesModel }) => ({
  delegatesModel
}))
class DelegateView extends Component {
  state = {

    loading: false,
  };
  componentDidMount() {
    this.getBlocks({ offset: 0, limit: 10 });
  }
  handleTableChange = (pagination, filters, sorter) => {

    this.getBlocks({
      current: pagination.current,
      limit: pagination.pageSize,
      offset: (pagination.current - 1) * pagination.pageSize
    });
  }
  getBlocks = async (params = {}) => {
    this.setState({ loading: true });

    this.props.dispatch({
      type: 'delegatesModel/getDelegates',
      payload: {
        ...params
      },
      callback: (res) => {
        if (res.success !== true) {
          message.error(res.error)
        }
        this.setState({
          loading: false
        })
      }
    })
  }
  render() {
    const { delegatesModel } = this.props
    const data = delegatesModel.delegatesList.delegates.delegates
    const pagination = delegatesModel.delegatesList.pagination
    return (
      <div className={styles.pageWrap}>
        <Card>
          <Table columns={columns(this)}
            rowKey={record => record.address}
            dataSource={data}
            pagination={pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
            rowClassName={styles.rowStyle}
          />
        </Card>
      </div>
    );
  }
}

export default DelegateView;
