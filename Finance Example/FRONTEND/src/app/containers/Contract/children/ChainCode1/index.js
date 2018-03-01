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
  Progress,
  Dropdown,
  Tooltip,
  Button,
  Modal,
  message
} from 'antd';
import {Link} from "react-router-dom";
import { sendQUERY, sendORDER } from '../../../../redux';
import { connect } from 'react-redux';
import { VictoryTheme, VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory';
import { Flex1, Flex3, Flex4, Flex5, Flex9, FlexColumn, FlexRow } from '../../../../style/MainStyles.js'
import renderIf from 'render-if';
import '../../local.scss'

const Option = Select.Option;

class ChainCode1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryvalue: null,
      //this is what is in orderLine
      ordertype: null,
      sharenumber: 0,
      shareprice: null,
      stocksymbol: null,
      progressVal: null
    }
    this.interval = null;
  }

  componentWillMount(){
    if (this.interval!=null){
      window.clearInterval(this.interval)
    }
    this.interval = setInterval(()=>{
      if((this.state.progressVal+100/3)>100){
        this.setState({
          progressVal: 0,
        })
        //Try and buy shares here!
        // console.log('value of payload in ChainCode1: ', payload);
        if (this.state.sharenumber>0){
          this.props.sendorder({
            ordertype: this.state.ordertype,
            sharenumber:this.state.sharenumber,
            shareprice: this.state.shareprice,
            stocksymbol:this.state.stocksymbol
          })
          this.setState({
            sharenumber: this.state.sharenumber-1
          })
        }
      }else{
        this.setState({
          progressVal: this.state.progressVal+100/3
        })
      }
    }, 1000);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.query!=this.props.query){
      console.log('value of nextProps.query: ', nextProps.query);
    }
    if (nextProps.sentOrder!=this.props.sentOrder){
      console.log("INSIDE SENTORDER PROPS");
      console.log('value of nextProps.sentOrder: ', nextProps.sentOrder);
      this.setState({
        ordertype: nextProps.sentOrder.ordertype,
        sharenumber:nextProps.sentOrder.sharenumber,
        shareprice: nextProps.sentOrder.shareprice,
        stocksymbol:nextProps.sentOrder.stocksymbol,
        progressVal: 0
      })
    }
  }

  handleQueryChainCode(){
    console.log('inside handleQueryChainCode');
    this.props.sendquery({value: this.state.queryvalue})
  }

  render() {
      return (
        <div>
          <FlexColumn>
            {renderIf(this.state.sharenumber>0)(
              <Flex1 style={{textAlign: "center"}}>
                  <Card style={{backgroundColor: "#edf2f4", color: "#030301", marginLeft: '10%', marginRight: '10%', marginTop:"3%", fontSize:"11pt",  padding:"1%"}}>
                  <div style={{marginLeft:"10%"}}>
                    <p>
                      {this.state.sharenumber} shares left to {this.state.ordertype} at a price of ${this.state.shareprice}
                    </p>
                  </div>
                  <Progress percent={this.state.progressVal}
                  style={{width: "100%", marginLeft:"10%"}}
                  format={percent => ``}/>
                </Card>
              </Flex1>
            )}
          </FlexColumn>
        </div>
      );
  }
}

// <Flex1>
//   <Input placeholder="Value to query." value={this.state.queryvalue} onChange={(e)=>{this.setState({queryvalue: e.target.value})}}/>
// </Flex1>
// <Flex1>
//   <Button onClick={()=>{this.handleQueryChainCode()}}>
//     Query chain code.
//   </Button>
// </Flex1>


// data={[
//   { x: 1, y: 2 },
//   { x: 2, y: 3 },
//   { x: 3, y: 5 },
//   { x: 4, y: 4 },
//   { x: 5, y: 7 }
// ]}
// export default StockChart;

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
      sendquery: (e)=>{dispatch(sendQUERY(e))},
      sendorder: (e)=>{dispatch(sendORDER(e))}
    })
}

function mapStateToProps(state) {
    return({
      query: state.query,
      // tokenreturn: state.token,
      // emailreturn: state.email,
      // userpostsreturn: state.retrieveuserposts
      // getsymboldata: state.getsymboldata
      // savesymbol: state.savesymbol,
      orderreturn: state.orderreturn
    })
}


export default connect(
    mapStateToProps, mapDispatchToProps)(
    ChainCode1
)
