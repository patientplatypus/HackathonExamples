import React, {Component} from 'react';
import logo from '../../../style/images/logo.png';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Card,
  Layout,
  Select,
  Modal,
  Row,
  Col,
  Menu
} from 'antd';
import {headStyles, cardStyles, contentStyles, medusa, layoutStyles} from '../../../style/MainStyles.js';
import { connect } from 'react-redux'
import './local.css'
import renderIf from 'render-if'
import styled, { keyframes }  from 'styled-components';

import {Link, Redirect} from "react-router-dom";
import { getPATIENTINFO, getALLPATIENTS, getRXINFO, submitRX, getIOTINFO } from '../../../redux';


class IoT extends Component {
  constructor() {
    super();
    this.state = {
      fitbitAccessToken: null,
      redirected: false,
    }
  }

  componentDidMount(){

    var currentURL = window.location.href;
    if (!currentURL.includes("access")){
      window.location.href = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22CR3Y&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fiot%2F&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800";
    }

    var accessToken = currentURL.substring(currentURL.indexOf("access_token="))
    var endLocation = currentURL.substring(currentURL.indexOf("&"))

    console.log('value of access location ', accessToken);
    console.log('value of end location ', endLocation);

    var cleanedToken = accessToken.replace("access_token=", "").replace(endLocation, "");
    console.log("value of cleaned token: ", cleanedToken);

    this.props.getiotinfo({token: cleanedToken})


  }

  componentWillUpdate(nextProps, nextState) {

  }

  render() {
    return(
      <div>
        <h1>
          Inside IoT Screen
        </h1>
        <h2>

        </h2>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
    return({
      getiotinfo: (e)=>{dispatch(getIOTINFO(e))}
    })
}

function mapStateToProps(state) {
    return({
      iotinfo: state.iotinfo
    })
}

export default (connect(
    mapStateToProps, mapDispatchToProps)(
    IoT
))
