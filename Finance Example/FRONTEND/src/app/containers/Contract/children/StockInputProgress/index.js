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


class StockInputProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocksymbol: null,
      showProgress: false,
      progressVal: 100,
    }
    this.interval = null;
  }

  handlestocksymbol(){
    console.log('inside handlestocksymbol and value ', this.state.stocksymbol);
    this.props.handleSpinWait(true)
    this.props.handleShowStockInfo(true);
    this.setState({
      showProgress: true,
      progressVal: 100
    })
    this.interval = setInterval(()=>{
      if((this.state.progressVal+100/60)>100){
        this.setState({
          progressVal: 0
        })
        this.props.getsymboldata({symbol: this.state.stocksymbol})
      }else{
        this.setState({
          progressVal: this.state.progressVal+100/60
        })
      }
    }, 1000);
  }

  handleStopGET(){
    this.props.handleStopSentOrder();
    this.setState({
      showProgress: false,
      progressVal: 0
    },()=>{
        window.clearInterval(this.interval);
        // for (var i = 1; i < 99999; i++){
        //   window.clearInterval(i);
        // }
      }
    )
  }

  handleInput(e){
    e.preventDefault();
    this.setState({stocksymbol: e.target.value}, ()=>{
      this.props.handleStockSymbol(this.state.stocksymbol)
    })
  }

  render() {
      return (
        <div>
          {renderIf(this.state.showProgress===false)(
            <FlexRow>
              <Flex1/>
              <Flex1>
                <Input placeholder="Stock SMBL" value={this.state.stocksymbol} onChange={(e)=>this.handleInput(e)}/>
              </Flex1>
              <Flex1>
                <Button style={{backgroundColor: '#030301', color:'#73ba9b'}} onClick={()=>{this.handlestocksymbol()}}>GO</Button>
              </Flex1>
              <Flex1/>
            </FlexRow>
          )}
          {renderIf(this.state.showProgress===true)(
            <FlexRow>
              <Flex1/>
              <Flex4>
                <Progress percent={this.state.progressVal}
                format={percent => ``}
                />
              </Flex4>
              <Flex1>
                <Button onClick={()=>{this.handleStopGET()}} style={{backgroundColor: '#030301', color:'#ba2d0b'}} >STOP</Button>
              </Flex1>
              <Flex1/>
            </FlexRow>
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
    StockInputProgress
)
