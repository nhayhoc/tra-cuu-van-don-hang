import React, { Component } from 'react';


export class Result extends Component {
  constructor(props){
    super(props);
    this.handleCLick = this.handleCLick.bind(this);
  }

  handleCLick(){
    this.props.hideResult();

  }
  render() {
    if (this.props.isFound) {
      var result = this.props.dataJson;
      var listResult = result.map((item,i)=>

        <tr class={i===0 ? 'last':''} key={i}>
          <td class="row1" >
              <span class="day">{item.time.split(' ')[0]}</span>
              <span class="time">{item.time.split(' ')[1].substring(0,item.time.split(' ')[1].lastIndexOf(':'))}</span>
          </td>
          <td class="status">
              <div class="col2"><span class="step"></span></div>
          </td>
          <td class="context">{item.context}</td>
        </tr>
      );
      console.log(listResult);
    }
    if(this.props.showResult && this.props.isFound){
      return (
        <div class="search-box-result" id="search-box-result">
          <button class="btn-floating btn waves-effect waves-light red" id="btn-close-result" onClick={this.handleCLick}><i class="fa fa-close"></i></button>
          <div class="center-align" id="check-msg">
              <h5>ĐÃ NHẬP Kho đích tại Trung Quốc</h5></div>
          <table class="result-info result-info-down" cellSpacing="0">
              <tbody>
                  {listResult}
              </tbody>
          </table>
        </div>
      );
    } else if(this.props.showResult && !this.props.isFound ){
      return (
        <div id="toast-container"><div class="toast">Không tìm thấy lộ trình của mã vận đơn này</div></div>
      );
    } else if (!this.props.showResult){
      return (<div></div>);
    }

  }
}
