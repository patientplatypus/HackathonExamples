// @flow weak

/* eslint-disable no-process-env */
import React, {
  Component
}                               from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
}                               from 'react-router-dom';
import { Provider }             from 'react-redux';
import thunk                    from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import  reducer                 from './redux/reducers'

import renderIf from 'render-if'

import About from './containers/About';
import Contract from './containers/Contract';
import Splash from './containers/Splash';

import './style/fontface.css';
// import myFont from './style/fonts/Molot/Molot.otf'
// injectGlobal`
//   @font-face {
//     font-family: 'molot';
//     src: url(${myFont}) format('truetype');
//     font-weight: normal;
//     font-style: normal;
//   }
// `;

import Cloud from './style/images/rain2green.png';
import Logo from './style/images/transparentoraclered.png'

import './Root.css'

import { Menu, Icon } from 'antd';
// const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

class Root extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: 'contract'
    }
  }

  handleClick = (e) => {
    console.log('click ', e.key);
    this.setState({
      current: e.key,
    });
  }

  render() {

    return (
      <Provider store={store}>
        <div style={{position: "relative"}}>
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                style={{backgroundColor: "#030301",
                        color: "#edf2f4"}}
              >

                <Menu.Item key="contract">
                  <Icon type="area-chart" /> Contract
                </Menu.Item>
              
            </Menu>

          <div style={{height: "2.5vh", marginTop: "1.5vh", position:"absolute", top:"0", right:"20vw"}}>
            <img src={Logo} style={{maxHeight:"100%"}}/>
          </div>

          <div style={{height: "3vh", marginTop: "-.5vh", position:"absolute", top:"0", right:"7.5vw"}}>
            <div className="thunderstorm" style={{color: "#73ba9b", fontSize: "2vw"}}>
              <p>
                Thunderstorm
              </p>
            </div>
          </div>



          <div style={{height: "4vh", position:"absolute", top:"0.5vh", right:"5vw"}}>
            <img src={Cloud} style={{maxHeight:"100%"}}/>
          </div>

          {renderIf(this.state.current==='splash')(
            <div>
              <Splash />
            </div>
          )}

          {renderIf(this.state.current==='contract')(
            <div>
              <Contract />
            </div>
          )}

          {renderIf(this.state.current==='about')(
            <div>
              <About />
            </div>
          )}

        </div>
      </Provider>
    );
  }
}

// <Router>
//     <div>
//       <Route exact path="/" render={()=><Splash />}/>
//       <Route path="/splash" exact render={()=><Splash />}/>
//       <Route path="/contract" exact render={()=><Contract />}/>
//       <Route path="/about" exact render={()=><About />}/>
//     </div>
// </Router>

export default Root;
