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
import { getSYMBOLDATA, sendLASTPRICE } from '../../../../redux';
import { connect } from 'react-redux';
import { VictoryTheme, VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory';
import { Flex1, FlexColumn, FlexRow } from '../../../../style/MainStyles.js'
import renderIf from 'render-if';

class StockChart extends Component {
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
    if(nextProps.stocksymbol!=this.props.stocksymbol){
      this.setState({
        stocksymbol: nextProps.stocksymbol
      })
    }
    if(nextProps.getsymboldata!=this.props.getsymboldata){
      console.log('inside componentWillReceiveProps and getsymboldata: ', nextProps.getsymboldata);

      var chartDataLocal = [];
      var min = null;
      var max = null;
      for(var x=0; x<nextProps.getsymboldata.length; x++){
        if(Number(nextProps.getsymboldata[x]['close'])<min||min===null){
          min = Number.parseFloat(nextProps.getsymboldata[x]['close']).toFixed(2)
        }
        if(Number(nextProps.getsymboldata[x]['close'])>max||max===null){
          max = Number.parseFloat(nextProps.getsymboldata[x]['close']).toFixed(2)
        }

        chartDataLocal.push({
          x: new Date(nextProps.getsymboldata[x]['time']),
          y: Number(Number.parseFloat(nextProps.getsymboldata[x]['close']).toFixed(2))
        })

        if(x===nextProps.getsymboldata.length-1){
          this.props.handleSpinWait(false);
          this.props.handleLastPrice(chartDataLocal[0]["y"]);
          this.setState({
            chartData: chartDataLocal,
            startDate: chartDataLocal[20]["x"],
            TwentyFiveDate: chartDataLocal[40]["x"],
            FiftyDate: chartDataLocal[60]["x"],
            endDate: chartDataLocal[80]["x"],
            yAxisMin: min,
            yAxisMax: max,
            yAxisMid1: Math.abs(max-min)/4 + min,
            yAxisMid2: 3*Math.abs(max-min)/4 + min
          }, ()=>{

            // var datetime;
            // var datestring;
            // var payload;
            //
            // function resolveAfterAssign(){
            //   return new Promise(resolve => {
            //     datetime = Date.now();
            //     datestring = datetime.toString();
            //     payload = {
            //       symbol: this.state.stocksymbol,
            //       timestamp: datestring,
            //       lastprice: chartDataLocal[0]["y"]
            //     };
            //     resolve("resolved")
            //   });
            // }
            //
            // var self = this;
            //
            // async function asyncCall(){
            //   self.props.sendlastprice(payload)
            // }
            //
            // asyncCall();

            this.props.sendlastprice({payload:
              {
                symbol: this.state.stocksymbol,
                timestamp: Date.now(),
                lastprice: chartDataLocal[0]["y"]
              }
            })


            // console.log('value of this.state.chartData: ', this.state.chartData);
            // console.log('value of yAxisMid1: ', this.state.yAxisMid1);
            // console.log('value of yAxisMid2: ', this.state.yAxisMid2);
            // console.log('value of min: ', this.state.yAxisMin);
            // console.log('value of max: ', this.state.yAxisMax);
          })
        }
      }
    }
  }

  render() {
      return (
        <div>
          {renderIf(this.state.chartData.length!=0)(
            <VictoryChart
              style={{
                parent: {
                  border: "1px solid #edf2f4"
                }
              }}
              padding={{left: 80, right: 80, top: 55, bottom: 55}}
            >
              <VictoryAxis
                dependentAxis={false}
                tickValues={[this.state.startDate, this.state.TwentyFiveDate, this.state.FiftyDate, this.state.endDate]}
                tickFormat={(t) => `${t.getHours()}:${t.getMinutes()}`}
              />
              <VictoryAxis
                dependentAxis={true}
                tickFormat={(t) => `$ ${t}`}
              />
                <VictoryLine
                  style={{
                    data: { stroke: "#F39C12" },
                  }}
                  data={this.state.chartData}
                />
            </VictoryChart>
          )}
          {renderIf(this.state.chartData.length===0)(
            <VictoryChart
              style={{
                parent: {
                  border: "1px solid #edf2f4"
                }
              }}
            >
              {renderIf(this.props.spinWait===false)(
              <VictoryLabel
                text={["Input a Stock Symbol", "to Populate Chart!"]}
                x={100} y={140}
                style={{fontSize:30}}
                />
              )}
              <VictoryAxis dependentAxis />
              <VictoryAxis
                tickValues={[`12:00`, `13:30`, `14:20`, `15:45`]}
                tickFormat={(t) => `${t}`}
              />
            </VictoryChart>
          )}
          {renderIf(this.props.spinWait===true)(
            <div style={{position: "absolute", top: "10vh", left:"35vw"}}>
              <Icon type="loading" style={{ fontSize: 100, color: "#F39C12" }} spin />
            </div>
          )}
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
      sendlastprice: (e)=>{dispatch(sendLASTPRICE(e))}
    })
}

function mapStateToProps(state) {
    return({
      // tokenreturn: state.token,
      // emailreturn: state.email,
      // userpostsreturn: state.retrieveuserposts
      getsymboldata: state.getsymboldata,
      sendorder: state.sendorder
    })
}


export default connect(
    mapStateToProps, mapDispatchToProps)(
    StockChart
)
