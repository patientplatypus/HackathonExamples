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
  Select,
  Modal,
  Row,
  Col,
  Menu
} from 'antd';
import {headStyles, cardStyles, contentStyles, medusa, layoutStyles} from '../../../style/MainStyles.js';
import { connect } from 'react-redux'
import './local.css'
import renderIf from 'render-if'
import styled, { keyframes }  from 'styled-components';

import {Link, Redirect} from "react-router-dom";
import { getPATIENTINFO, getALLPATIENTS, getRXINFO, submitRX } from '../../../redux';
const {Header, Content} = Layout;
const FormItem = Form.Item;

import { fadeInRight } from 'react-animations';
import { fadeInLeftBig } from 'react-animations';

const FadeInRightAnimation = keyframes`${fadeInRight}`;
const FadeInLeftBigAnimation = keyframes`${fadeInLeftBig}`;

const FadeInRightDiv = styled.div`
  animation: 1s ${FadeInRightAnimation};
`;

const FadeInLeftBigDiv = styled.div`
  animation: 1.5s ${FadeInLeftBigAnimation};
`;
const FadeInLeftBigDiv2 = styled.div`
  animation: 1.9s ${FadeInLeftBigAnimation};
`;

const Option = Select.Option;

const Flex1 = styled.div`
  flex: 1
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  text-align:center;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  text-align:center;
`

class Doctor extends Component {
  constructor() {
    super();
    this.state = {
      allpatients: [],
      // requestpatientinfo: false,
      // requestallpatients: false,
      // requestpatientrx: false,
      // receivedpatientrx: false
      receivedpatientinfo: false,
      receivedallpatients: false,
      patientinfoTitle: null,
      patientinfoID: null,
      patientinfoDOB: null,
      patientinfoAddress: null,
      patientinfoEthnicity: null,
      patientinfoPhone: null,
      selectedFirstName: null,
      selectedLastName: null,
      displaygetpatientwarning: false,
      rxinfo: [],
      rxidinput: "",
      doctorinput: "",
      licenseinput: "",
      scriptinput: "",
      refillsinput: "",
      showsubmitinputbutton: false,
      modalVisible: false
    }
  }

  componentDidMount(){
    console.log('inside componentDidMount of Doctor');
    this.setState({
      requestallpatients: true
    }, ()=>{
      //
      this.props.getallpatients();
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.patientinfo!=this.props.patientinfo){
      this.setState({
        patientinfoTitle: "Patient Name: " + nextProps.patientinfo.LastName + ", " + nextProps.patientinfo.FirstName,
        patientinfoFirstName: nextProps.patientinfo.FirstName,
        patientinfoLastName: nextProps.patientinfo.LastName,
        patientinfoID: nextProps.patientinfo.ID,
        patientinfoDOB: nextProps.patientinfo.DOB,
        patientinfoAddress: nextProps.patientinfo.Address,
        patientinfoEthnicity: nextProps.patientinfo.Ethnicity, //misspelled doy!
        patientinfoPhone: nextProps.patientinfo.Phone,
      }, ()=>{
        this.setState({
          receivedpatientinfo: true,
        })
      })
      console.log('value of patientinfo after receiving props: ', nextProps.patientinfo);
      if(nextProps.patientinfo.ID!=null){
        // this.props.getrxinfo({id: nextProps.patientinfo.ID})
        console.log("8888888888");
        console.log('value of nextProps id', nextProps.patientinfo.ID);
        console.log('value of state id',
        this.state.patientinfoID);
        this.props.getrxinfo({id: nextProps.patientinfo.ID})
      }
    }
    if(nextProps.allpatients!=this.props.allpatients){
      this.setState({
        receivedallpatients: true
      }, () => {
        this.setState({
          allpatients: nextProps.allpatients.Persons
        })
      })
      console.log('value of allpatients after receiving props: ', nextProps.allpatients.Persons);
    }
    if(nextProps.rxinfo!=this.props.rxinfo){
      this.setState({
        receivedpatientrx: true,
        rxinfo: nextProps.rxinfo
      }, ()=>{
        console.log("in componentWillReceiveProps and requestpatientrx: ", nextProps.rxinfo);
      })
    }
    if(nextProps.submitrxreturn!=this.props.submitrxreturn){
      console.log('value of submitrx in componentWillReceiveProps, ', nextProps.submitrxreturn.response);
      if(nextProps.submitrxreturn.response==="ok"){
        // this.props.getpatientinfo({firstname: this.state.selectedFirstName, lastname: this.state.selectedLastName})
        // this.props.getrxinfo({id: nextProps.patientinfoID})
        // this.props.getrxinfo({id: nextProps.patientinfo.ID})
        this.props.getrxinfo({id: nextProps.patientinfo.ID})
        this.setState({
          modalVisible: true,
          rxidinput: "",
          doctorinput: "",
          licenseinput: "",
          scriptinput: "",
          refillsinput: "",
        })
      }
    }

  }

  handleChange(value) {
    console.log(`selected ${value}`);
    var localNames = value.split(" ");
    this.setState({
      selectedFirstName: localNames[0],
      selectedLastName: localNames[1],
      displaygetpatientwarning: false
    })
  }

  submitScriptButton(){
    var payload;
    var localTimestamp = Date.now()
    payload = {
      id: this.state.patientinfoID,
      FirstName: this.state.patientinfoFirstName,
      LastName: this.state.patientinfoLastName,
      DOB: this.state.patientinfoDOB,
      Prescription: this.state.scriptinput,
      Doctor: this.state.doctorinput,
      Refills: this.state.refillsinput,
      License: this.state.licenseinput,
      Status: "prescribed",
      Timestamp: localTimestamp,
    };
    console.log("&&&&&&&&&&&&&&&&");
    console.log("&&&&&&&&&&&&&&&&");
    console.log('value of payload ID ', payload.id);
    console.log("&&&&&&&&&&&&&&&&");

    console.log('value of payload: ', payload);
    console.log('value of payload.FirstName: ', payload.FirstName);
    this.props.submitrx(payload)
    console.log("value of payload: ", payload);

  }

  handleGetPatient(){
    if (this.state.selectedLastName!=null && this.state.selectedFirstName!=null){
      this.setState({
        requestpatientinfo: true
      }, ()=>{
        this.props.getpatientinfo({firstname: this.state.selectedFirstName, lastname: this.state.selectedLastName})
      })
    }else{
      this.setState({
        displaygetpatientwarning: true
      })
    }
  }

  handleBlur() {
    console.log('blur');
  }

  handleFocus() {
    console.log('focus');
  }

  checkAllInputs(){
    if (this.state.doctorinput!=""&&this.state.licenseinput!=""&&this.state.scriptinput!=""&&this.state.refillsinput!=""){
      this.setState({
        showsubmitinputbutton: true
      })
    }else{
      this.setState({
        showsubmitinputbutton: false
      })
    }
  }

  updateInputs(input, value){
    if (input==="RXID"){
      this.setState({
        rxidinput: value
      }, ()=>{this.checkAllInputs()})
    }else if(input==="DOCTOR"){
      this.setState({
        doctorinput: value
      }, ()=>{this.checkAllInputs()})
    }else if(input==="LICENSE"){
      this.setState({
        licenseinput: value
      }, ()=>{this.checkAllInputs()})
    }else if(input==="SCRIPT"){
      this.setState({
        scriptinput: value
      }, ()=>{this.checkAllInputs()})
    }else if(input==="REFILLS"){
      this.setState({
        refillsinput: value
      }, ()=>{this.checkAllInputs()})
    }
  }

  render() {
    console.log('inside DoctorScreen');
    let patientnames;
    patientnames = this.state.allpatients.map(function(patient, i){
      let patientFullName = patient.FirstName + " " + patient.LastName
      console.log('value of patientFullName: ', patientFullName);
      return(<Option value={patientFullName} key={i}>{patientFullName}</Option>);
    })
    let scriptlist;
    if (this.state.rxinfo.RX!=undefined){
      scriptlist = this.state.rxinfo.RX.map(function(pill, i){
        return(
          <Card style={{fontWeight: "bold", fontSize:"1.5vh", marginBottom: "1vh", padding:"0vh", textAlign: "left", backgroundColor: "#E8F1F5"}}>
            <FlexRow>
              <Flex1>
                <p key={i}>
                  {pill.RXID}
                </p>
              </Flex1>
              <Flex1>
                <p key={i}>
                  {pill.Doctor}
                </p>
              </Flex1>
              <Flex1>
                <p key={i}>
                  {pill.License}
                </p>
              </Flex1>
              <Flex1>
                <p key={i}>
                  {pill.Prescription}
                </p>
              </Flex1>
              <Flex1>
                <p key={i}>
                  {pill.Refills}
                </p>
              </Flex1>
              <Flex1>
                <p key={i}>
                  {pill.Status}
                </p>
              </Flex1>
            </FlexRow>
          </Card>
        );
      })
    }

    console.log('value of patientnames: ', patientnames);
    return (
      <div>


      <Card title="Welcome to the Doctor Portal!" style={{position: "absolute", left: "2vw", height: "20.5vh", top: "2.5vh", width: "50vw", backgroundColor: "#1989AC", color: "#E8F1F5", fontSize: "2vh"}}>
        <p>
          Select a user and you will be able to see their chart and assign them prescriptions.
        </p>
        <p>
          Prescriptions will be stored on the block chain and pharmacists will then be able to fill them.
        </p>
        <p>
          Have fun!
        </p>
      </Card>

      {renderIf(this.state.receivedallpatients===true)(
        <div>
          <Card title="Search for a Patient" bordered={false} style={{width: "20vw", left: "55vw", top: "2.5vh", height:"100%", backgroundColor: "#1989AC"}}>
            <FlexColumn>
              <Flex1>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a person"
                  size="large"
                  optionFilterProp="children"
                  onChange={(e)=>this.handleChange(e)}
                  onFocus={()=>this.handleFocus()}
                  onBlur={()=>this.handleBlur()}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {patientnames}
                  </Select>
                </Flex1>
                <Flex1><br/></Flex1>
                <Flex1>
                  <Button type="secondary" size="large" onClick={()=>this.handleGetPatient()}>
                    Get Records!
                  </Button>
                </Flex1>
                {renderIf(this.state.displaygetpatientwarning===true)(
                  <div>
                    <Flex1><br/></Flex1>
                    <Flex1 style={{color: "#FFDE25"}}>
                      You must select a patient first!
                    </Flex1>
                  </div>
                )}
            </FlexColumn>
          </Card>

        </div>
       )}


      {renderIf(this.state.receivedpatientinfo===true)(
        <FadeInRightDiv style={{position: "absolute", left: "77.5vw", right: "20vw", top: "2.5vh", width: "20vw", textAlign: "left",  overflow: "hidden", overflowY: "auto"}}>
          <Card title={this.state.patientinfoTitle} bordered={false} style={{ backgroundColor: "#1989AC", color: "#283E56"}}>
            <FlexColumn>
              <Flex1>
                <Card style={{fontWeight: "bold", fontSize:"2vh", paddingTop: "0",  textAlign: "left", backgroundColor: "#E8F1F5"}}>
                    ID
                  <div style={{fontSize:"1.5vh", textAlign: "right"}}>
                    <p>
                      {this.state.patientinfoID}
                    </p>
                  </div>
                </Card>
              </Flex1>
              <Flex1><br/></Flex1>
              <Flex1>
                <Card style={{fontWeight: "bold", fontSize:"2vh", paddingTop: "0",  textAlign: "left", backgroundColor: "#E8F1F5"}}>
                  <p>
                    DOB
                  </p>
                  <div style={{fontSize:"1.5vh", textAlign: "right"}}>
                    <p>
                      {this.state.patientinfoDOB}
                    </p>
                  </div>
                </Card>
              </Flex1>
              <Flex1><br/></Flex1>
              <Flex1>
                <Card style={{fontWeight: "bold", fontSize:"2vh", paddingTop: "0",  textAlign: "left", backgroundColor: "#E8F1F5"}}>
                  <p>
                    Address
                  </p>
                  <div style={{fontSize:"1.5vh", textAlign: "right"}}>
                    <p>
                      {this.state.patientinfoAddress}
                    </p>
                  </div>
                </Card>
              </Flex1>
              <Flex1><br/></Flex1>
              <Flex1>
                <Card style={{fontWeight: "bold", fontSize:"2vh", paddingTop: "0",  textAlign: "left", backgroundColor: "#E8F1F5"}}>
                  <p>
                    Ethnicity
                  </p>
                  <div style={{fontSize:"1.5vh", textAlign: "right"}}>
                    <p>
                      {this.state.patientinfoEthnicity}
                    </p>
                  </div>
                </Card>
              </Flex1>
              <Flex1><br/></Flex1>
              <Flex1>
                <Card style={{fontWeight: "bold", fontSize:"2vh", paddingTop: "0",  textAlign: "left", backgroundColor: "#E8F1F5"}}>
                  <p>
                    Phone
                  </p>
                  <div style={{fontSize:"1.5vh", textAlign: "right"}}>
                    <p>
                      {this.state.patientinfoPhone}
                    </p>
                  </div>
                </Card>
              </Flex1>
            </FlexColumn>
          </Card>
        </FadeInRightDiv>


      )}

      {renderIf(this.state.receivedpatientrx===true)(
        <div>
          <FadeInLeftBigDiv style={{position: "absolute", left: "2.5vw", top: "26.5vh", width: "72.5vw", height: "50vh", textAlign: "left"}}>
            <Card bordered={false} style={{ backgroundColor: "#1989AC", color: "#283E56"}}>
              <Card style={{fontWeight: "bold", fontSize:"1.5vh", marginBottom: "1vh", padding:"0vh", textAlign: "left", backgroundColor: "#283E56"}}>
                <FlexRow>
                  <Flex1>
                    <h1 style={{color:"#E8F1F5"}}>
                      RXID
                    </h1>
                  </Flex1>
                  <Flex1>
                    <h1 style={{color:"#E8F1F5"}}>
                      DOCTOR
                    </h1>
                  </Flex1>
                  <Flex1>
                    <h1 style={{color:"#E8F1F5"}}>
                      LICENSE
                    </h1>
                  </Flex1>
                  <Flex1>
                    <h1 style={{color:"#E8F1F5"}}>
                      SCRIPT
                    </h1>
                  </Flex1>
                  <Flex1>
                    <h1 style={{color:"#E8F1F5"}}>
                      REFILLS
                    </h1>
                  </Flex1>
                  <Flex1>
                    <h1 style={{color:"#E8F1F5"}}>
                      STATUS
                    </h1>
                  </Flex1>
                </FlexRow>
              </Card>
            </Card>
            <Card bordered={false} style={{ backgroundColor: "#1989AC", color: "#283E56", height: "30vh", overflow: "hidden", overflowY: "auto", paddingBottom: '2vh'}}>
              {scriptlist}
            </Card>
          </FadeInLeftBigDiv>




          <FadeInLeftBigDiv2 style={{position: "absolute", left: "2.5vw", top: "72vh", width: "72.5vw", height: "20vh", textAlign: "left"}}>
            <Card bordered={false} style={{ backgroundColor: "#1989AC", color: "#283E56"}}>
              <FlexColumn>
                <Flex1>
                  <Card style={{fontWeight: "bold", fontSize:"1vh", marginBottom: "1vh", padding:"0vh", textAlign: "left", backgroundColor: "#283E56"}}>
                    <FlexRow>
                      <Flex1>
                        <h1 style={{color:"#E8F1F5"}}>
                          DOCTOR
                        </h1>
                      </Flex1>
                      <Flex1>
                        <h1 style={{color:"#E8F1F5"}}>
                          LICENSE
                        </h1>
                      </Flex1>
                      <Flex1>
                        <h1 style={{color:"#E8F1F5"}}>
                          SCRIPT
                        </h1>
                      </Flex1>
                      <Flex1>
                        <h1 style={{color:"#E8F1F5"}}>
                          REFILLS
                        </h1>
                      </Flex1>
                    </FlexRow>
                  </Card>
                </Flex1>
                <Flex1>
                  <Card>
                    <FlexRow>
                      <Flex1 style={{marginRight:"1vw"}}>
                        <Input size="large" placeholder="DOCTOR"
                        value={this.state.doctorinput}
                        onChange={(e)=>{this.updateInputs("DOCTOR", e.target.value)}}/>
                      </Flex1>
                      <Flex1 style={{marginRight:"1vw"}}>
                        <Input size="large" placeholder="LICENSE"
                        value={this.state.licenseinput}
                        onChange={(e)=>{this.updateInputs("LICENSE", e.target.value)}}/>
                      </Flex1>
                      <Flex1 style={{marginRight:"1vw"}}>
                        <Input size="large" placeholder="SCRIPT"
                        value={this.state.scriptinput} onChange={(e)=>{this.updateInputs("SCRIPT", e.target.value)}}/>
                      </Flex1>
                      <Flex1 style={{marginRight:"1vw"}}>
                        <Input size="large" placeholder="REFILLS"
                        value={this.state.refillsinput}
                        onChange={(e)=>{this.updateInputs("REFILLS", e.target.value)}}/>
                      </Flex1>
                    </FlexRow>
                  </Card>
                </Flex1>
              </FlexColumn>
            </Card>
          </FadeInLeftBigDiv2>
        </div>
      )}

      {renderIf(this.state.showsubmitinputbutton===true)(
        <FadeInRightDiv style={{position: "absolute", left: "77.5vw", right: "20vw", top: "80vh", width: "20vw", textAlign: "left"}}>
          <Button type="primary" size={"large"} onClick={()=>{this.submitScriptButton()}}>
            Submit Script!
          </Button>
        </FadeInRightDiv>
      )}

      <Modal
          visible={this.state.modalVisible}
          title="Prescription Submitted!"
          footer={[
            <Button key="submit" type="primary" onClick={()=>this.setState({modalVisible: false, showsubmitinputbutton: false})}>
              Yata!
            </Button>,
          ]}
        >
          <p>You have written a prescription!</p>
        </Modal>


      </div>
    );
  }
}

// export default Doctor

//
function mapDispatchToProps(dispatch) {
    return({
      //  checkloginoci: (e)=>{dispatch(checkLoginOCI(e))},
      getpatientinfo: (e)=>{dispatch(getPATIENTINFO(e))},
      getallpatients: ()=>{dispatch(getALLPATIENTS())},
      getrxinfo: (e)=>{dispatch(getRXINFO(e))},
      submitrx: (e)=>{dispatch(submitRX(e))}
    })
}

function mapStateToProps(state) {
    return({
      // loginreturn: state.loginreturn,
      patientinfo: state.patientinfo,
      allpatients: state.allpatients,
      rxinfo: state.rxinfo,
      submitrxreturn: state.submitrx
    })
}

export default (connect(
    mapStateToProps, mapDispatchToProps)(
    Doctor
))


// <div style={{position:"absolute", left: "5vw"}}>
//   <i className="fas fa-user-md" style={{fontSize: "30vh"}}></i>
// </div>
// <div style={{position: "absolute", left: "20vw", top: "2vh", fontSize: "12vh", lineHeight: "13vh"}}>
//   <p>
//     Doctor
//   </p>
//   <p>
//     Portal
//   </p>
// </div>
