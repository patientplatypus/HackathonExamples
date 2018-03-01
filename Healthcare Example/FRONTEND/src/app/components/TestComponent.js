import React, {Component} from 'react';
// import logo from '../../../style/images/logo.png';
// import {
//   Form,
//   Icon,
//   Input,
//   Button,
//   Checkbox,
//   Card,
//   Layout,
//   Row,
//   Col,
//   Menu
// } from 'antd';
// import {headStyles, cardStyles, contentStyles, medusa, layoutStyles} from '../../../style/MainStyles.js';
// import { connect } from 'react-redux'
// import './local.css'
//
//
// import {Link, Redirect} from "react-router-dom";
// import { checkLoginOCI } from '../../../redux';
// const {Header, Content} = Layout;
// const FormItem = Form.Item;

class Test extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    console.log('inside Test');
    return (
      <div>
        <div>
          Hello there test
        </div>
      </div>
    );
  }
}

export default Test

//
// function mapDispatchToProps(dispatch) {
//     return({
//        checkloginoci: (e)=>{dispatch(checkLoginOCI(e))},
//     })
// }
//
// function mapStateToProps(state) {
//     return({
//       loginreturn: state.loginreturn,
//     })
// }
//
// export default (connect(
//     mapStateToProps, mapDispatchToProps)(
//     DoctorScreen
// ))
