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

class BuySellOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedsymbol: null,
      ordertype: "Select order type",
      orderColor: null,
      sharenumber: ``,
      shareprice: ``
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.savesymbol!=this.props.savesymbol){
      this.setState({
        savedsymbol: nextProps.savesymbol,
        ordertype: "Select order type",
        orderColor: "black",
        modalVisible: false,
      })
    }
  }

  handleBuySellSelect(value){
    this.setState({
      ordertype: value
    })
  }

  placeOrderButton(){
    this.setState({
      modalVisible: false,
    })
    var payload={
      ordertype: this.state.ordertype,
      sharenumber: this.state.sharenumber,
      shareprice: this.state.shareprice,
      stocksymbol: this.state.savedsymbol
    }
    this.props.handleSentOrder(payload)
  }

  render() {
      return (
        <div>
          {renderIf(this.state.savedsymbol===null)(
            <div>
              <br/><br/><br/><br/>
              <FlexRow>
                <Flex1/>
                <Flex1>
                  <Card style={{fontSize:"11pt", fontWeight: "bold", backgroundColor: "#edf2f4", color: "#030301"}}>
                    <p>
                      First search for a stock, so you can then put in orders to buy or sell it!
                    </p>
                  </Card>
                </Flex1>
                <Flex1/>
              </FlexRow>
            </div>
          )}
          {renderIf(this.state.savedsymbol!=null)(
            <div>
              <br/>
              <FlexRow>
                <Flex1/>
                <Flex1>
                  <Card style={{fontSize:"11pt", fontWeight: "bold", backgroundColor: "#edf2f4", color: "#030301"}}>
                    <p>
                      Buy and sell {this.state.savedsymbol}.
                    </p>
                  </Card>
                </Flex1>
                <Flex1/>
              </FlexRow>
            </div>
          )}
          <br/>
          {renderIf(this.state.savedsymbol!=null)(
            <div>
              <FlexColumn>
                <Flex1>
                  <Card style={{backgroundColor: "#edf2f4", color: "#030301", marginLeft: '10%', marginRight: '10%', fontSize:"11pt",  padding:"1%"}}>
                    <p>
                      Buy or Sell?
                    </p>
                    <Select defaultValue="Order Type"
                    value={this.state.ordertype}
                    style={{color:`#030301`, width:"80%", paddingTop:"2%"}}
                    onChange={(e)=>this.handleBuySellSelect(e)}
                    >
                      <Option value="buy" style={{color:"#ba2d0b"}}>Buy {this.state.savedsymbol} stock</Option>
                      <Option value="sell" style={{color:"#73ba9b"}}>Sell {this.state.savedsymbol} stock</Option>
                    </Select>
                  </Card>
                </Flex1>
                <Flex1><br/></Flex1>
                <Flex1>
                  <Card style={{backgroundColor: "#edf2f4", color: "#030301", marginLeft: '10%', marginRight: '10%', padding:"1%", fontSize:"11pt"}}>
                    <p>
                      How many shares and at what price?
                      <Tooltip title="NOTE: If you put in an order to sell at a price that is less than the current market price, or to buy at a price that is more than the current market price, your order will clear immediately!">
                        <span>&nbsp;&nbsp;<Icon type="exclamation-circle" style={{fontWeight:`bold`, fontSize:"15pt", color: "#ba2d0b"}} /></span>
                      </Tooltip>
                    </p>
                    <FlexColumn style={{marginTop:"2%"}}>
                      <Flex1/>
                      <Flex4>
                        <FlexRow>
                          <Flex9/>
                          <Flex1>
                            Shares:
                          </Flex1>
                          <Flex1/>
                          <Flex4>
                            <Input placeholder="Shares" value={`${this.state.sharenumber}`} onChange={(e)=>{this.setState({sharenumber: e.target.value})}}
                            onClick={(e)=>{this.setState({sharenumber: ``})}}/>
                          </Flex4>
                        </FlexRow>
                      </Flex4>
                      <Flex4>
                        <div style={{marginTop: "2%"}}>
                          <FlexRow>
                            <Flex9/>
                            <Flex1>
                              &nbsp;&nbsp;&nbsp;Price:
                            </Flex1>
                            <Flex1/>
                            <Flex4>
                              <Input placeholder="Price" value={`${this.state.shareprice}`} onChange={(e)=>{this.setState({shareprice: e.target.value})}}
                              onClick={(e)=>{this.setState({shareprice: ``})}}/>
                            </Flex4>
                          </FlexRow>
                        </div>
                      </Flex4>
                      <Flex1/>
                    </FlexColumn>
                  </Card>
                </Flex1>
                <Flex1><br/></Flex1>
                <Flex1>
                  <Card style={{backgroundColor: "#edf2f4", color: "#030301", marginLeft: '10%', marginRight: '10%', position: "relative"}}>
                    <FlexRow>
                      <Flex9>
                        <FlexColumn style={{textAlign: "left", marginBottom:"4%", marginTop: "0%", paddingTop: "0%"}}>
                          <Flex1>
                            <p>
                              Checklist
                            </p>
                          </Flex1>
                          {renderIf(this.state.ordertype==="Select order type")(
                            <Flex1 style={{fontSize:"12pt"}}>
                              <p>
                                <Icon type="close" style={{fontWeight:`bold`, color: "#ba2d0b"}} />
                                &nbsp;
                                Declare an order type.
                              </p>
                            </Flex1>
                          )}
                          {renderIf(this.state.ordertype!="Select order type")(
                            <Flex1 style={{fontSize:"12pt"}}>
                              <p>
                                <Icon type="check" style={{fontWeight:`bold`, color: "#73ba9b"}} />
                                &nbsp;
                                Order type declared: {this.state.ordertype}.
                              </p>
                            </Flex1>
                          )}

                          {renderIf(this.state.sharenumber===null||this.state.sharenumber===0||this.state.sharenumber==='')(
                            <Flex1 style={{fontSize:"12pt"}}>
                              <p>
                                <Icon type="close" style={{fontWeight:`bold`, color: "#ba2d0b"}} />
                                &nbsp;
                                Declare share number.
                              </p>
                            </Flex1>
                          )}
                          {renderIf(this.state.sharenumber!=null&&this.state.sharenumber!=0&&this.state.sharenumber!='')(
                            <Flex1 style={{fontSize:"12pt"}}>
                              <p>
                                <Icon type="check" style={{fontWeight:`bold`, color: "#73ba9b"}} />
                                &nbsp;
                                Share number declared: {this.state.sharenumber}.
                              </p>
                            </Flex1>
                          )}


                          {renderIf(this.state.shareprice===null||this.state.shareprice===0||this.state.shareprice==='')(
                            <Flex1 style={{fontSize:"12pt"}}>
                              <p>
                                <Icon type="close" style={{fontWeight:`bold`, color: "#ba2d0b"}} />
                                &nbsp;
                                Declare share price.
                              </p>
                            </Flex1>
                          )}
                          {renderIf(this.state.shareprice!=null&&this.state.shareprice!=0&&this.state.shareprice!='')(
                            <Flex1 style={{fontSize:"12pt"}}>
                              <p>
                                <Icon type="check" style={{fontWeight:`bold`, color: "#73ba9b"}} />
                                &nbsp;
                                Share price declared: ${this.state.shareprice}.
                              </p>
                            </Flex1>
                          )}
                        </FlexColumn>
                      </Flex9>
                      <Flex1/>
                    </FlexRow>
                    <div style={{position: "absolute", right: "3%", bottom: "3%"}}>
                      {renderIf(this.state.shareprice!=null&&this.state.shareprice!=0&&this.state.shareprice!=''&&this.state.sharenumber!=null&&this.state.sharenumber!=0&&this.state.sharenumber!=''&&this.state.ordertype!="Select order type")(
                        <Button style={{backgroundColor: "#ba2d0b", color: "#edf2f4", fontWeight: "bold"}} onClick={()=>{this.setState({modalVisible: true})}}>
                          Place order.
                        </Button>
                      )}
                    </div>
                    <Modal
                      title="Order details"
                      visible={this.state.modalVisible}
                      onCancel={()=>{this.setState({modalVisible: false})}}
                      footer={[
                        <Button key="Cancel" style={{backgroundColor: "#73ba9b", color: "#edf2f4", fontWeight: "bold"}} onClick={()=>{this.setState({modalVisible: false})}}>Cancel order.</Button>,
                        <Button key="Place Order" style={{backgroundColor: "#ba2d0b", color: "#edf2f4", fontWeight: "bold"}} onClick={()=>{this.placeOrderButton()}}>
                          Confirm order.
                        </Button>,
                      ]}
                    >
                      <div style={{textAlign: "left"}}>
                        <p>
                          You are going to {this.state.ordertype} ...
                        </p>
                        <p>
                          ... {this.state.sharenumber} shares of {this.state.savedsymbol} ...
                        </p>
                        <p>
                          ... at a price of ${this.state.shareprice}.
                        </p>
                      </div>
                      <div style={{textAlign: "right"}}>
                        <p>
                          Confirm or cancel this order using the buttons below.
                        </p>
                      </div>
                    </Modal>
                  </Card>
                </Flex1>
              </FlexColumn>
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
      orderreturn: state.orderreturn
    })
}


export default connect(
    mapStateToProps, mapDispatchToProps)(
    BuySellOrder
)
