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

import './local.scss'

class BlockInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocksmbl: null,
      showProgress: false,
      progressVal: 100,
      lastPrice: 0,
      parameterID: "",
      parameter0: "",
      parameter1: "",
      parameter2: "",
      parameter3: "",
      parameter4: "",
      parameter5: "",
      parameter6: "",
      parameter7: "",
      parameter8: "",
      errorVal: "",
      errorOrNo: null
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
    if(nextProps.sendorder != this.props.sendorder){
        // console.log('inside sendorder and new value is ', nextProps.sendorder);
        // var sendJSON = JSON.parse(nextProps.sendorder);
        // console.log('value of sendJSON: ', sendJSON);
        // console.log('SENDORDERerror: ', nextProps.sendorder);
        // console.log('SENDORDERerror[0]: ', nextProps.sendorder[0]);
        // console.log('SENDORDERerror[1]: ', nextProps.sendorder[1]);

        console.log('typeof error: ', typeof nextProps.sendorder.error);
        if (nextProps.sendorder.includes("error")){
          this.setState({
            errorOrNo: true,
            sendorder: nextProps.sendorder
          })
        }else{
          this.setState({
            errorOrNo: false,
            sendorder: nextProps.sendorder
          })
        }
        // if (nextProps.sendorder.includes("error")){
        //   console.log('inside nextProps.sendorder.Value===undefined');
        //   console.log('value of errorVal: ', nextProps.sendorder.error);
        //   this.setState({
        //     errorOrNo: true,
        //     errorVal: nextProps.sendorder
        //   })
        // }else {
        //   console.log('inside else');
        //   this.setState({
        //     errorOrNo: false,
        //     parameterID: nextProps.sendorder.TxId,
        //     parameter0: nextProps.sendorder.Value.docType,
        //     parameter1: nextProps.sendorder.Value.documentID,
        //     parameter2: nextProps.sendorder.Value.folderID,
        //     parameter3: nextProps.sendorder.Value.action,
        //     parameter4: nextProps.sendorder.Value.user,
        //     parameter5: nextProps.sendorder.Value.orgName,
        //     parameter6: nextProps.sendorder.Value.dateTime,
        //     parameter7: nextProps.sendorder.Value.message,
        //     parameter8: nextProps.sendorder.Value.documentHash
        //   })
        // }
    }
  }


  render() {
      return (
        <div>
          <FlexColumn>
            <Flex1><br/></Flex1>
            <Flex1>
              <div className="blockdisplaygreen">
                <div className="blockdisplayblack">
                  <div style={{width: "70%", marginLeft: "20%", marginTop:"0", backgroundColor:`#73ba9b`, color: "#030301", fontSize: "11pt", fontWeight: "bold"}}>
                    Block chain successful trades.
                  </div>
                  {renderIf(this.state.errorOrNo===false)(
                    <div style={{width: "90%", marginLeft: "2.5%", marginRight: "5%", marginTop:"0", color: "#73ba9b", fontSize: "8pt", textAlign: "left", paddingRight: "15%"}}>
                      <p>
                        <span style={{fontWeight: "bold"}}>SUCCESS:</span> {this.state.sendorder}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Flex1>
            <Flex1><br/></Flex1>
            <Flex1>
              <div className="blockdisplayred">
                <div className="blockdisplayblack">
                  <div style={{width: "70%", marginLeft: "20%", marginTop:"0", backgroundColor:"#ba2d0b", color: "#030301", fontSize: "11pt", fontWeight: "bold"}}>
                    <p>
                      Block chain failed trades.
                    </p>
                  </div>
                  {renderIf(this.state.errorOrNo===true)(
                    <div style={{width: "90%", marginLeft: "2.5%", marginRight: "5%", marginTop:"0", color: "#ba2d0b", fontSize: "8pt", textAlign: "left", paddingRight: "15%"}}>
                      <p>
                        <span style={{fontWeight: "bold"}}>ERROR:</span> {this.state.sendorder}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Flex1>
            <Flex1>
              <Card style={{backgroundColor: "#030301", color: "#edf2f4", width: "90%", marginLeft: "20%", fontWeight:"bold", fontSize: "11pt", marginTop: "5%", textAlign:"left", paddingRight: "10%"}}>
                <p>
                  This shows the error if the block chain is not written to, or
                  the values if it is written to.
                </p>
                <br/><br/>
                <p>
                  Yet to do is only allow a trade if the trader has enough money in their account.
                </p>
              </Card>
            </Flex1>
            <Flex1/>
          </FlexColumn>
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
      sendorder: state.sendorder
    })
}
//
//
export default connect(
    mapStateToProps, mapDispatchToProps)(
    BlockInfo
)
