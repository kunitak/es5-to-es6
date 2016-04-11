import React from 'react';

//ボディの定義
class Body extends React.Component{
  constructor(props) {
    super(props);
    this.state = {message: ''}; //getInitialStateの代わりにconstructorで設定する
  }
  
  render(){
    return (
      <h1>ポータル {this.state.message}</h1>
    );
  }
}

//継承：ボディの定義
class ParentBody extends Body{
  componentDidMount() {
    this.setState({message: 'huga'});
  }
}

export default ParentBody;
