import React, {Component} from 'react';
import logo from '../../../style/images/logo.png';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Card,
  Layout,
  Row,
  Col,
  Menu
} from 'antd';
import {headStyles, cardStyles, contentStyles, medusa, layoutStyles} from '../../../style/MainStyles.js';
import { connect } from 'react-redux';
import "../../../style/fonts/fontface.css";
import './local.css';
import GreenCloud from '../../../style/images/GreenCloud.png';
import DoctorSplash from '../../../style/images/doctorsplashkeyboard.jpg';
import MedicalSplash from '../../../style/images/medicalbackground.jpg';

import Fawkes from '../../../style/images/fawkesmask.png';
import Cancel from '../../../style/images/circleslash.png';
import styled from 'styled-components';





import {Link, Redirect} from "react-router-dom";
import { checkLoginOCI } from '../../../redux';
const {Header, Content} = Layout;
const FormItem = Form.Item;

import renderIf from 'render-if'

const Flex1 = styled.div`
  flex: 1
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  text-align:center;
`


class Entry extends Component {
  constructor() {
    super();
    this.state = {
      redirect: null
    }
  }

  buttonClicked(value){
    console.log('inside button clicked and value: ', value);

  }

  render() {
    return (
      <div>
        <div className="mainTitle" style={{position: "absolute", left: "0", right: "0", top: "0", bottom: "95vh"}}>
          <div style={{zIndex:"2", position: "absolute", right: "5vw", top: "0vh"}}>
            Oracle Cloud Wellness
          </div>
        </div>

        <div style={{position:"absolute", top: "5vh", left:"0", height:"95vh", width: "100vw", backgroundImage: "url(" + MedicalSplash + ")", backgroundSize: "cover"}}>
        </div>

        <Card style={{position: "absolute", width: "20vw", height: "47vh", top: "6vh", left: "0.5vw", fontSize:"2vh", backgroundColor: "#1989AC", overflow: "hidden", overflowY: "auto", color: "#E8F1F5"}}>
          <div style={{fontSize: "2.5vh", fontWeight: "bold", textDecoration: "underline"}}>
            <p>
              Technical Specs
            </p>
          </div>
          <p>
            This demonstration uses a new Oracle blockchain service that is currently in beta. Under the hood we utilize a Hyperledger Fabric network that pushes a smart contract that is subscribed to all systems that want to modify the blockchain. Hyperledger Fabric is different from most common cryptocurrencies in that the chain is not commonly shared on a P2P network, but hosted on a local networked servers.
          </p>
        </Card>

        <Card style={{position: "absolute", width: "20vw", height: "45vh", top: "54vh", left: "0.5vw", fontSize:"2vh", backgroundColor: "#1989AC", overflow: "hidden", overflowY: "auto", color: "#E8F1F5"}}>
          <div style={{fontSize: "2.5vh", fontWeight: "bold", textDecoration: "underline"}}>
            <p>
              Project Business Case
            </p>
          </div>
          <p>
            HIPAA (Health Insurance Portability and Accountability Act of 1996) mandates privacy restrictions on patient healthcare records. Many businesses in the medical field struggle with protecting user data and also ensuring that the right medical records are tied to the right patient. With a distributed ledger a company can be sure that their records do not fall into the wrong hands.
          </p>
        </Card>

        <Card style={{position: "absolute", width: "80vw", height: "93vh", top: "6vh", left: "21vw", fontSize:"2vh", backgroundColor: "#1989AC", overflow: "hidden", overflowY: "auto", color: "#E8F1F5", opacity: "0.8"}}>
        </Card>


        <div style={{position: "absolute", width: "25vw", height: "35vh", backgroundColor: "#E8F1F5", top: "10vh", left: "25vw", borderRadius: "20%"}}>
          <div style={{position: "relative", left: "10%", fontWeight: "bold", fontSize: "3vh", top: "2.5%", opacity: "0.6"}}>
            <p>
              Oracle Blockchain Network
            </p>
          </div>
        </div>


        <div style={{position: "absolute", width: "5vw", height: "5vh", backgroundColor: "orange", top: "38vh", left: "29.5vw", borderRadius: "20%", zIndex: "2", fontWeight: "bold", fontSize: "1.4vh", overflow: "hidden", textAlign: "center", padding: ".1%"}}>
          <p>
            Doctor REST Endpt
          </p>
        </div>

        <div style={{position: "absolute", width: "5vw", height: "5vh", backgroundColor: "orange", top: "38vh", left: "40.5vw", borderRadius: "20%", zIndex: "2", fontWeight: "bold", fontSize: "1.4vh", overflow: "hidden", textAlign: "center"}}>
          <p>
            RX REST Endpt
          </p>
        </div>

        <div style={{position: "absolute", width: "5vw", height: "5vh", backgroundColor: "orange", top: "25vh", left: "26.5vw", borderRadius: "20%", zIndex: "2", fontWeight: "bold", fontSize: "1.4vh", overflow: "hidden", textAlign: "center", paddingTop: ".6%"}}>
          <p>
            MD Node 1
          </p>
        </div>

        <div style={{position: "absolute", width: "5vw", height: "5vh", backgroundColor: "orange", top: "25vh", left: "32vw", borderRadius: "20%", zIndex: "2", fontWeight: "bold", fontSize: "1.4vh", overflow: "hidden", textAlign: "center", paddingTop: ".6%"}}>
          <p>
            MD Node 2
          </p>
        </div>

        <div style={{position: "absolute", width: "5vw", height: "5vh", backgroundColor: "orange", top: "25vh", left: "38vw", borderRadius: "20%", zIndex: "2", fontWeight: "bold", fontSize: "1.4vh", overflow: "hidden", textAlign: "center", paddingTop: ".6%"}}>
          <p>
            RX Node 1
          </p>
        </div>

        <div style={{position: "absolute", width: "5vw", height: "5vh", backgroundColor: "orange", top: "25vh", left: "43.5vw", borderRadius: "20%", zIndex: "2", fontWeight: "bold", fontSize: "1.4vh", overflow: "hidden", textAlign: "center", paddingTop: ".6%"}}>
          <p>
            RX Node 2
          </p>
        </div>

        <div style={{position: "absolute", width: "5vw", height: "5vh", backgroundColor: "orange", top: "15vh", left: "35vw", borderRadius: "20%", zIndex: "2", fontWeight: "bold", fontSize: "1.4vh", overflow: "hidden", textAlign: "center"}}>
          <p>
            Load Balancer
          </p>
        </div>


        <div style={{position: "absolute", width: "5vw", height: "5vh", backgroundColor: "orange", top: "60vh", left: "40vw", borderRadius: "20%", zIndex: "2", fontWeight: "bold", fontSize: "1.4vh", overflow: "hidden", textAlign: "center"}}>
          <p>
            Smart Contract
          </p>
        </div>




        <div style={{position: "absolute", width: "0.5vw", height: "15vh", transform: "rotate(25deg)", backgroundColor: "black", left: "34vw", top: "25vh"}}/>

        <div style={{position: "absolute", width: "0.5vw", height: "15vh", transform: "rotate(-25deg)", backgroundColor: "black", left: "30vw", top: "25vh"}}/>

        <div style={{position: "absolute", width: "0.5vw", height: "15vh", transform: "rotate(-25deg)", backgroundColor: "black", left: "41vw", top: "25vh"}}/>

        <div style={{position: "absolute", width: "0.5vw", height: "15vh", transform: "rotate(25deg)", backgroundColor: "black", left: "45vw", top: "25vh"}}/>

        <div style={{position: "absolute", width: "0.5vw", height: "15vh", transform: "rotate(-60deg)", backgroundColor: "black", left: "42vw", top: "15vh"}}/>

        <div style={{position: "absolute", width: "0.5vw", height: "15vh", transform: "rotate(60deg)", backgroundColor: "black", left: "32vw", top: "15vh"}}/>

        <div style={{position: "absolute", width: "0.5vw", height: "15vh", transform: "rotate(15deg)", backgroundColor: "black", left: "35vw", top: "15vh"}}/>

        <div style={{position: "absolute", width: "0.5vw", height: "15vh", transform: "rotate(-15deg)", backgroundColor: "black", left: "39.2vw", top: "15vh"}}/>


        <div style={{position: "absolute", width: "25vw", height: "45vh", backgroundColor: "#E8F1F5", top: "50vh", left: "25vw", borderRadius: "20%", overflow: "hidden", overflowY: "scroll"}}>
          <div style={{position: "relative", left: "10%", fontWeight: "bold", fontSize: "2vh", top: "5%", opacity: "0.6"}}>
            <p>
              Code
            </p>
          </div>
          <div style={{position: "relative", left: "42%", fontWeight: "bold", fontSize: "12pt", top: "27%", fontColor: "#283E56", paddingRight: "43%"}}>
            <p>
              The code for the front end and the back end is a typical REST API structure. The smart contract, also called "chain code", is the business logic that lives on the Blockchain network and is pushed once by the network admin.
            </p>
          </div>
        </div>

        <div style={{position: "absolute", width: "5vw", height: "5vh", backgroundColor: "orange", top: "60vh", left: "30vw", borderRadius: "20%", zIndex: "2", fontWeight: "bold", fontSize: "1.4vh", overflow: "hidden", textAlign: "center"}}>
          <p>
            Golang Backend
          </p>
        </div>

        <div style={{position: "absolute", width: "5vw", height: "5vh", backgroundColor: "orange", top: "80vh", left: "30vw", borderRadius: "20%", zIndex: "2", fontWeight: "bold", fontSize: "1.4vh", overflow: "hidden", textAlign: "center"}}>
          <p>
            React Frontend
          </p>
        </div>

        <div style={{position: "absolute", width: "0.5vw", height: "25vh", transform: "rotate(0deg)", backgroundColor: "black", left: "32vw", top: "60vh"}}/>

        <div style={{position: "absolute", width: "0.5vw", height: "25vh", transform: "rotate(0deg)", backgroundColor: "black", left: "32vw", top: "40vh"}}/>

        <div style={{position: "absolute", width: "0.5vw", height: "30vh", transform: "rotate(45deg)", backgroundColor: "black", left: "37vw", top: "38vh"}}/>

        <div style={{position: "absolute", width: "0.5vw", height: "10vh", transform: "rotate(0deg)", backgroundColor: "black", left: "42.25vw", top: "52.5vh"}}/>

        <div style={{position: "absolute", width: "0.5vw", height: "2vh", transform: "rotate(45deg)", backgroundColor: "black", left: "42.05vw", top: "52vh"}}/>

        <div style={{position: "absolute", width: "0.5vw", height: "2vh", transform: "rotate(-45deg)", backgroundColor: "black", left: "42.45vw", top: "52vh"}}/>


        <div style={{position: "absolute", width: "45vw", height: "45vh", backgroundColor: "#E8F1F5", top: "10vh", left: "53vw", borderRadius: "20%"}}>
          <div style={{position: "relative", left: "5%", fontWeight: "bold", fontSize: "2vh", top: "15%", fontColor: "#283E56", paddingRight: "43%"}}>
            <p>
              In this example proof of concept, both the doctor and the pharmacist have their own API endpoints which the backend can call. Each of these endpoints routes to one of two nodes that they each own and where the blockchain is instantiated. Each of the nodes coordinates with the others using Byzantine Fault Tolerance to make sure that no hacker has penetrated the network. For a hacker to maliciously change the blockchain, he must do so on all nodes, or have his update detected!
            </p>
          </div>
        </div>

        <div style={{position:"absolute", top: "17%", left:"81%", backgroundImage: "url(" + Fawkes + ")", backgroundSize: "100% 100%", height: "25vh", width: "16vw"}}>
        </div>

        <div style={{position:"absolute", top: "16%", left:"81%", backgroundImage: "url(" + Cancel + ")", backgroundSize: "100% 100%", height: "25vh", width: "16vw"}}>
        </div>

        <div style={{position: "absolute", width: "45vw", height: "30vh", backgroundColor: "#E8F1F5", top: "58vh", left: "53vw"}}>

          <div style={{position: "relative", top: "5%", left: "5%", fontWeight: "bold", fontSize: "4vh"}}>
            <p>
              Try now!
            </p>
          </div>

          <div style={{position: "relative", top: "5%", left: "5%", fontWeight: "bold", fontSize: "2vh", paddingRight: "60%"}}>
            <p>
              IoT, internet of things, functionality is coming soon and is currently under construction!
            </p>
          </div>

        </div>


        <Card title="Portal" bordered={false} style={{width: "20vw", left: "77vw", top: "60vh", backgroundColor: "#1989AC"}}>
          <FlexColumn>
            <Flex1>
              <Button type="secondary" size="large" onClick={()=>this.setState({redirect: "doctor"})}>
                Doctor
              </Button>
            </Flex1>
            <Flex1>
              <br/>
            </Flex1>
            <Flex1>
              <Button type="secondary" size="large" onClick={()=>this.setState({redirect: "pharmacist"})}>
                Pharmacist
              </Button>
            </Flex1>
            <Flex1>
              <br/>
            </Flex1>
          </FlexColumn>
        </Card>
        {renderIf(this.state.redirect==="doctor")(
          <Redirect to='/doctor' />
        )}
        {renderIf(this.state.redirect==="pharmacist")(
          <Redirect to='/pharmacist' />
        )}
        {renderIf(this.state.redirect==="iot")(
          <Redirect to='/iot' />
        )}
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
    return({
      //  checkloginoci: (e)=>{dispatch(checkLoginOCI(e))},
    })
}

function mapStateToProps(state) {
    return({
      // loginreturn: state.loginreturn,
    })
}

export default (connect(
    mapStateToProps, mapDispatchToProps)(
    Entry
))
