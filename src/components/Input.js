import React, { Component } from 'react';


export class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputText : '',
    };
    this.timeout =  0;

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {

  }
  handleChange = (event) => {
    let newText = event.target.value;
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.changeInput(newText)
    }, 300);
    this.setState({
      inputText:newText,
    });

  }

  handleClick(e){
    e.preventDefault();
    this.props.handleCLick();

  }

  render() {
    let loading = this.props.loading;
    let com_code = "https://cdn.kuaidi100.com/images/all/56/"+this.props.com_code+".png";
    if (loading===0){
      var res = <img class="loading " id="com-loading" src="/img/loading.gif" title="Đang lấy thông tin" alt="Đang lấy thông tin" />;
    } else if (loading===1){
      var res = <img class="icon-com" id="com-unknown" src="/img/kygui100-logo-square.png" title="Không thể xác định được hãng vận chuyển" alt="Không thể xác định được hãng vận chuyển" />;
    } else {
      var res = <img class="icon-com " id="com-loaded" src={com_code} alt=""/>;
    }
    return (

      <div>
        <form id="form-search-waybill">
            <div class="express-company-logo white">
              {res}
            </div>
            <input class="input-text white" placeholder="Điền mã vận đơn cần tra cứu" id="input-waybill" value={this.state.inputText}

              onChange={this.handleChange}/>
            <button class="waves-effect waves-light btn-large orange btn-search hide-on-small-and-down" onClick={this.handleClick}>Tra cứu<i class="fa fa-search left"></i></button>
            <button class="waves-effect waves-light btn-large orange btn-search hide-on-med-and-up"><i class="fa fa-search left"></i></button>
        </form>
      </div>
    );
  }
}
