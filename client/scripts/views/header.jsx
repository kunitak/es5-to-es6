import React from 'react';
import ReactRouter, {History as History, Link as Link} from 'react-router';//コンポーネントのメンバの場合は{}で囲む as をつけると右側が変数名になる

//ヘッダの定義
class Header extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
  	/* ログアウト処理 */
    
    //ログイン画面へ
    this.context.router.push('/');
  }
  render(){
    return (
      <header>
        <div style={{position:"absolute", margin: "-15px 0px"}}>
          <h1>ヘッダです</h1>
        </div>
        <div style={{position:"relative", textAlign:"right", paddingTop: "30px"}}>
          <Link to="/portal" style={{paddingRight: "5px"}}>ポータル</Link>
          <Link to="/userbox" style={{paddingRight: "5px"}}>ユーザーリスト</Link>
          <button onClick={this.handleClick}>ログアウト</button>
        </div>
        <hr/>
      </header>
    );
  }
};
//contextTypesは外で定義する
Header.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Header;
