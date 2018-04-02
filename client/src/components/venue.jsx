import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import * as actions from '../actions/index.js';
import calendar from './calendar.jsx';
import Requests from './requests.jsx';
import VenueDetails from './venueDetails.jsx';

const { Header, Content, Footer, Sider } = Layout;//eslint-disable-line

class Venue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '1',
    };
  }

  onSelect(info) {
    if (info.key === '5') {
      this.props.actions.logout();
    } else {
      this.setState({ key: info.key });
    }
  }

  view() {
    const { bookings } = this.props.store;
    const { key } = this.state;
    if (key === '1') {
      return calendar(bookings, true);
    }
    if (key === '2') {
      return (<div>Find Artist</div>);
    }
    if (key === '3') {
      return (<Requests />);
    }
    if (key === '4') {
      return (<VenueDetails venueId={this.props.store.venueId} />);
    }
  }

  logout() {
    this.props.actions.logout();
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            onSelect={info => this.onSelect(info)}
          >
            <Menu.Item key="1">
              <Icon type="calendar" />
              <span>Calendar</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="search" />
              <span>Find Artist</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="book" />
              <span>Booking Requests</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="profile" />
              <span>Venue Details</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="logout" />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item />
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.view()}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
          Ruber Ducky Dynasty!
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => (
    { store: state } // eslint-disable-line
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Venue));
