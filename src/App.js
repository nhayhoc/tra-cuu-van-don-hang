import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Input} from './components/Input';
import {Result} from './components/Result';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {

      inputText : '',
      loading : 1,
      icon_com: '',
      isFound: false,
      showResult: false,
      dataJson : []
    };
    //loading: 0: dang load, 1: logo website, 2: icon-com

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.hideResult = this.hideResult.bind(this);
  }

  onChange(textInput){

    this.setState({ loading: 0 , inputText: textInput});
    //request api
    const APIUrl = "https://cors-anywhere.herokuapp.com/http://kygui100.vn/v1/waybill/express-company?num="+textInput;
    fetch(APIUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({
          icon_com: data.data.com_code,
          loading: data.data.com_code == null ? 1:2
        })
      });

  }

  onClick(){
    this.init();
    this.setState({ loading: 0 });
    //request API
    const APIUrl = "https://cors-anywhere.herokuapp.com/http://kygui100.vn/v1/waybill/tracking?num="+this.state.inputText;
    fetch(APIUrl)
      .then(response => response.json())
      .then(data => {
        if(data.data.result != false ){
          this.setState({
            dataJson: data.data.data,
            loading: 2,
            isFound: true,
            showResult:true
          })
        } else {
          this.setState({loading:1 , showResult: true});
        }

      });

  }

  init(){
    this.setState({

      inputText : '',
      loading : 1,
      icon_com: '',
      isFound: false,
      showResult: false,
      dataJson : []
    });
  }

  hideResult(){
    this.init();
    //this.setState({showResult:false});
  }
  render() {
    return (
      <div>
        <Input
          changeInput={this.onChange}
          loading={this.state.loading}
          com_code={this.state.icon_com}
          handleCLick={this.onClick}
        />
        <Result
          isFound={this.state.isFound}
          showResult={this.state.showResult}
          dataJson={this.state.dataJson}
          isFound={this.state.isFound}
          showResult={this.state.showResult}
          hideResult={this.hideResult}
        />
      </div>
    );
  }
}

export default App;
