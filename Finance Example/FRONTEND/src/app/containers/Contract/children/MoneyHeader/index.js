import React, {Component} from 'react';
import {
  Icon,
  Card,
  Col,
  Row,
  Badge,
  Menu,
  Select,
  Input,
  Dropdown,
  Tooltip,
  Button,
  Modal,
  message
} from 'antd';
import {Link} from "react-router-dom";
import { getSYMBOLDATA, sendORDER } from '../../../../redux';
import { connect } from 'react-redux';
import { VictoryTheme, VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory';
import { Flex1, Flex3, Flex4, Flex5, Flex9, FlexColumn, FlexRow } from '../../../../style/MainStyles.js'
import renderIf from 'render-if';
import '../../local.scss'
import './local.scss'

const Option = Select.Option;

class MoneyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedsymbol: null,
      ordertype: "Select order type",
      orderColor: null,
      sharenumber: ``,
      shareprice: ``,
      tradermoney: "1000"
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.tradermoney!=this.props.tradermoney){
      console.log("this is the value of tradermoney: ", nextProps.tradermoney);
      this.setState({
        tradermoney: nextProps.tradermoney.Value.folderID
      })
    }
  }

  render() {
      return (
        <div>
          <Card style={{width: "80%", marginLeft: "10%", marginRight: "10%", marginTop: "5%", backgroundColor: "#edf2f4", textAlign: "center", color: "#73ba9b", fontWeight: "bold", fontSize: "20pt"}}>
            <p>
              ${this.state.tradermoney}
            </p>
          </Card>
        </div>
      );
  }
}

function mapDispatchToProps(dispatch) {
    return({
      sendorder: (e)=>{dispatch(sendORDER(e))}
    })
}

function mapStateToProps(state) {
    return({
      // tokenreturn: state.token,
      // emailreturn: state.email,
      // userpostsreturn: state.retrieveuserposts
      // getsymboldata: state.getsymboldata
      savesymbol: state.savesymbol,
      orderreturn: state.orderreturn,
      tradermoney: state.tradermoney
    })
}


export default connect(
    mapStateToProps, mapDispatchToProps)(
    MoneyHeader
)
