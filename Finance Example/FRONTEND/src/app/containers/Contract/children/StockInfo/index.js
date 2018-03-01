import React, {Component} from 'react';
import {
  Icon,
  Card,
  Col,
  Row,
  Badge,
  Menu,
  Dropdown,
  Button,
  Modal,
  Input,
  Progress,
  message
} from 'antd';
// import {cardStyles, vmCard} from '../../../style/MainStyles.js';
import {Link} from "react-router-dom";
import { connect } from 'react-redux'

import { getSYMBOLDATA } from '../../../../redux';


import { VictoryTheme, VictoryChart, VictoryLine } from 'victory';

import renderIf from 'render-if';

import { Flex1, Flex4, FlexColumn, FlexRow } from '../../../../style/MainStyles.js'


class StockInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocksmbl: null,
      showProgress: false,
      progressVal: 100,
      lastPrice: 0
    }
    this.interval = null;
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.lastPrice!=this.props.lastPrice){
      console.log('inside nextProps.chartData in StockInfo');
      this.setState({
        lastPrice: nextProps.lastPrice
      })
    }
  }


  render() {
      return (
        <div>
          {renderIf(this.props.lastPrice!=null&&this.props.stocksymbol!=""&&this.props.showStockInfo===true&&this.props.spinWait===false)(
                <Card style={{width: "80%", margin: "10%", backgroundColor: '#030301', color: "#edf2f4", fontSize: "11pt", fontWeight: 'bold'}}>
                  <p>
                    The exchange is currently offering and accepting shares of {this.props.stocksymbol} ...
                  </p>
                  <p>
                    ... at a price of ${this.state.lastPrice} per share.
                  </p>
                </Card>
          )}
        </div>
      );

  }
}

// export default StockInputProgress;

// <VictoryChart
//   theme={VictoryTheme.material}
// >
//   <VictoryLine
//     style={{
//       data: { stroke: "#c43a31" },
//       parent: { border: "1px solid #ccc"}
//     }}
//     data={[
//       { x: 1, y: 2 },
//       { x: 2, y: 3 },
//       { x: 3, y: 5 },
//       { x: 4, y: 4 },
//       { x: 5, y: 7 }
//     ]}
//   />
// </VictoryChart>

// export default AdminConsole;

// import { getBlueprint, getAllVDI } from '../../../redux/server/Blueprint';
// import { getInstances, getConsoles } from '../../../redux/server/Compartment';

function mapDispatchToProps(dispatch) {
    return({
      // signintoserver: (e)=>{dispatch(signupUSER(e))},
      // setthetoken: (e)=>{dispatch(setTOKEN(e))}
      // sendthepost: (e)=>{dispatch(sendPOST(e))},
      // getuserposts: (e)=>{dispatch(userPOSTS(e))}
      getsymboldata: (e)=>{dispatch(getSYMBOLDATA(e))}
    })
}

function mapStateToProps(state) {
    return({
      // tokenreturn: state.token,
      // emailreturn: state.email,
      // userpostsreturn: state.retrieveuserposts
    })
}
//
//
export default connect(
    mapStateToProps, mapDispatchToProps)(
    StockInfo
)
