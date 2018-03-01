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
  message
} from 'antd';
// import {cardStyles, vmCard} from '../../../style/MainStyles.js';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
// import classNames from 'classnames';
import { moneyINIT } from '../../redux';
import local from './local.scss'
import './grid.scss'
import StockChart from './children/StockChart';
import StockInputProgress from './children/StockInputProgress';
import Instructions from './children/Instructions';
import BuySellOrder from './children/BuySellOrder';
import ChainCode1 from './children/ChainCode1';
import StockInfo from './children/StockInfo';
import BlockInfo from './children/BlockInfo';
import StockChainInfo from './children/StockChainInfo';
import MoneyHeader from './children/MoneyHeader';

import { Flex1, Flex11, FlexColumn, FlexRow } from '../../style/MainStyles.js'


class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinWait: false,
      sentOrder: {},
      chartData: null,
      stocksymbol: "",
      lastPrice: null,
      showStockInfo: false
    }
  }

  componentWillMount(){
    //initialize trader money
    this.props.moneyinit();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.tradermoney!=this.props.tradermoney){
      console.log('the value of trader money is: ', nextProps.tradermoney);
    }
  }

  handleShowStockInfo(bool){
    this.setState({
      showStockInfo: bool
    })
  }

  handleStopSentOrder(){
    this.setState({
      sentOrder: {},
      chartData: null,
      showStockInfo: false
    })
  }

  handleLastPrice(price){
    this.setState({
      lastPrice: price
    })
  }

  handleSpinWait(bool){
    this.setState({
      spinWait: bool
    }, ()=>{
      // console.log('inside handleSpinWait and value: ', this.state.spinWait);
    })
  }

  handleStockSymbol(symbol){
    console.log('value of symbol: ', symbol);
    console.log('value of this.state.stocksymbol: ', this.state.stocksymbol);
    this.setState({
      stocksymbol: symbol
    })
  }

  handleSentOrder(payload){
    console.log('inside handleSentOrder and payload: ', payload);
    this.setState({
      sentOrder: payload
    })
  }

  render() {
      return (
        <div>
          <div className='GridContainer' style={{position: "absolute"}}>
            <div className='col1'>
              <Instructions />
            </div>
            <div className='col2'>
              <FlexColumn>
                <Flex1>
                  <StockChart
                    stocksymbol={this.state.stocksymbol}
                    handleSpinWait={this.handleSpinWait.bind(this)}
                    spinWait={this.state.spinWait}
                    handleLastPrice={this.handleLastPrice.bind(this)}
                    />
                </Flex1>
                <Flex1>
                  <StockInputProgress
                    handleShowStockInfo={this.handleShowStockInfo.bind(this)}
                    handleSpinWait={this.handleSpinWait.bind(this)}
                    handleStopSentOrder={this.handleStopSentOrder.bind(this)}
                    handleStockSymbol={this.handleStockSymbol.bind(this)}
                    spinWait={this.state.spinWait}
                  />
                </Flex1>
                <Flex1>
                  <StockInfo
                    lastPrice={this.state.lastPrice}
                    stocksymbol={this.state.stocksymbol}
                    showStockInfo={this.state.showStockInfo}
                    spinWait={this.state.spinWait}
                    />
                </Flex1>
                <Flex1><br/></Flex1>
              </FlexColumn>
            </div>
            <div className='col3'>
              <FlexColumn>
                <Flex1>
                  <MoneyHeader/>
                </Flex1>
                <Flex1>
                  <BuySellOrder
                    handleSentOrder={this.handleSentOrder.bind(this)}/>
                </Flex1>
                <Flex1>
                  <ChainCode1
                    sentOrder={this.state.sentOrder}/>
                </Flex1>
              </FlexColumn>
            </div>
            <div className='col4'>
              <FlexColumn>
                <Flex1>
                  <BlockInfo/>
                </Flex1>
              </FlexColumn>
            </div>
            <div style={{position: "relative", left: "25vw", bottom: "30vh"}}>
              <StockChainInfo
                showStockInfo={this.props.showStockInfo}
              />
            </div>
          </div>
        </div>
      );

  }
}

// export default AdminConsole;

// import { getBlueprint, getAllVDI } from '../../../redux/server/Blueprint';
// import { getInstances, getConsoles } from '../../../redux/server/Compartment';

function mapDispatchToProps(dispatch) {
    return({
      // signintoserver: (e)=>{dispatch(signupUSER(e))},
      // setthetoken: (e)=>{dispatch(setTOKEN(e))}
      // sendthepost: (e)=>{dispatch(sendPOST(e))},
      // getuserposts: (e)=>{dispatch(userPOSTS(e))}
      moneyinit: (e)=>{dispatch(moneyINIT(e))}
    })
}

function mapStateToProps(state) {
    return({
      // tokenreturn: state.token,
      // emailreturn: state.email,
      // userpostsreturn: state.retrieveuserposts
      tradermoney: state.tradermoney
    })
}


export default connect(
    mapStateToProps, mapDispatchToProps)(
    Contract
)
