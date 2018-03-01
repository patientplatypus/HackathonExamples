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
import {Link} from "react-router-dom";
import { getSYMBOLDATA } from '../../../../redux';
import { connect } from 'react-redux';
import { VictoryTheme, VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory';
import { Flex1, Flex3, FlexColumn, FlexRow } from '../../../../style/MainStyles.js'
import renderIf from 'render-if';
import '../../local.scss'

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      startDate: Date.now(),
      TwentyFiveDate: Date.now(),
      FiftyDate: Date.now(),
      endDate: Date.now(),
    }
  }

  componentWillReceiveProps(nextProps){

  }

  render() {
      return (
        <div>
          <FlexColumn>
            <Flex1>
              <br/><br/><br/>
              <Card style={{backgroundColor: "#edf2f4", color: "#030301", width: "80%", marginLeft: "10%", marginRight: "10%", fontWeight:"bold", fontSize: "11pt", marginTop: "5%"}}>
                <p>
                  What this is and why you should care.
                </p>
              </Card>
            </Flex1>
            <Flex1>
              <Card style={{backgroundColor: "#edf2f4", color: "#030301", width: "80%", marginLeft: "10%", marginRight: "10%", fontSize: "10pt", marginTop: "5%", fontWeight: "bold", textAlign: "left"}}>
                <p>
                  This is a mock trading platform.
                </p>
                <br/>
                <p>
                  It uses a free API (AlphaVantage) to pull real time stock data every minute and right these values to the block chain. It then allows the user to make stock requests from this "exchange" and only allows a trade to go through if the buy price is higher than the exchange price or the sell price is lower than the exchange price. Once the trade is authenticated it allows the trade to be written to the chain.
                </p>
                <br/>
                <p>
                  This may not be as sophisticated as many of the trading platforms that enterprise financial customers currently use, however if Oracle can make the case that banking consumers are worried about user security (see: Wells Fargo Trading Scandal) then it would be useful to build for financial enterprises to build "Block Chain Certified" authentication and financial transaction services.
                </p>
              </Card>
            </Flex1>
          </FlexColumn>
        </div>
      );

  }
}


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
    })
}

function mapStateToProps(state) {
    return({
      // tokenreturn: state.token,
      // emailreturn: state.email,
      // userpostsreturn: state.retrieveuserposts
      // getsymboldata: state.getsymboldata
    })
}


export default connect(
    mapStateToProps, mapDispatchToProps)(
    Instructions
)
