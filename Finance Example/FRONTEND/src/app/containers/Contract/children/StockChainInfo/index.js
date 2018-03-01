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

class StockChainInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocksmbl: null,
      showProgress: false,
      progressVal: 100,
      parameterID: "",
      parameter0: "",
      parameter1: "",
      parameter2: "",
      parameter3: "",
      parameter4: "",
      parameter5: "",
      parameter6: "",
      parameter7: "",
      parameter8: ""
    }
    this.interval = null;
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.lastprice!=this.props.lastprice){
      console.log('inside nextProps.lastPrice in StockChainInfo');
      console.log('and value of parameterID: ', nextProps.lastprice.TxId);
      console.log('and value of Value is : ', nextProps.lastprice.Value);
      this.setState({
        parameterID: nextProps.lastprice.TxId,
        parameter0: nextProps.lastprice.Value.docType,
        parameter1: nextProps.lastprice.Value.documentID,
        parameter2: nextProps.lastprice.Value.folderID,
        parameter3: nextProps.lastprice.Value.action,
        parameter4: nextProps.lastprice.Value.user,
        parameter5: nextProps.lastprice.Value.orgName,
        parameter6: nextProps.lastprice.Value.dateTime,
        parameter7: nextProps.lastprice.Value.message,
        parameter8: nextProps.lastprice.Value.documentHash
      })

    }
  }


  render() {
      return (
        <div style={{height: "100%"}}>
          <FlexRow>
            <Flex1>
              <div className="blockdisplayorange2">
                <div className="blockdisplayblack2">
                  <div style={{width: "70%", marginLeft: "15%", marginRight: "15%", marginTop:"0", backgroundColor:"#F39C12", color: "#030301", fontSize: "11pt", fontWeight: "bold"}}>
                    <p>
                      Stock available on chain.
                    </p>
                  </div>
                  <br/>
                  {renderIf(this.state.parameterID!="")(
                    <div style={{width: "90%", marginLeft: "2.5%", marginRight: "5%", marginTop:"0", color: "#F39C12", fontSize: "8pt", textAlign: "left", paddingRight: "15%"}}>
                      <p>
                        <span style={{fontWeight: "bold"}}>ID:</span> {this.state.parameterID}
                      </p>
                      <p>
                        <span style={{fontWeight: "bold"}}>KeyID:</span> {this.state.parameter1}
                      </p>
                      <p>
                        <span style={{fontWeight: "bold"}}>Price:</span> {this.state.parameter2}
                      </p>
                      <p>
                        <span style={{fontWeight: "bold"}}>NewOrModify:</span> {this.state.parameter3}
                      </p>
                      <p>
                        <span style={{fontWeight: "bold"}}>Timestamp:</span> {this.state.parameter6}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Flex1>
          </FlexRow>
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
      lastprice: state.lastprice
    })
}
//
//
export default connect(
    mapStateToProps, mapDispatchToProps)(
    StockChainInfo
)
