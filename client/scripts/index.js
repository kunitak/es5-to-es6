import React from 'react';
import {Router, Route, IndexRoute, History, hashHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Header from './views/header.jsx';
import Body from './views/body.jsx';
import UserBox from './views/userbox.jsx';
import Footer from './views/footer.jsx';

class Index extends React.Component{
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

class Top extends React.Component{
  constructor(props, context){
    super(props, context);
    //thisを使えるようにbindする
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
      e.preventDefault();
      /* ログイン処理 */

      //ポータルページへ
      this.context.router.push({pathname: '/portal', query: '', state: ''});
  }
  
  render(){
    return (
      <div>
        <div className="main">
          <h1>ログイン</h1>
          <form onSubmit={this.handleSubmit}>
            <input placeholder="userid"/>
            <input placeholder="password"/>
            <div style={{textAlign:"cener"}}>
              <button type="submit">ログイン</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
}
//contextTypesは外で定義する
Top.contextTypes = {
  router: React.PropTypes.object.isRequired
}

class Main extends React.Component{
  render(){
    return (
      <div>
        <Header/>
        <div className="main">
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
};

const Routes = (
  <Route path="/" component={Index}>
    <IndexRoute component={Top}/>
    <Route path="/top" component={Top}/>
    <Route path="/portal" component={Main}>
      <IndexRoute component={Body}/>
      <Route path="/userbox" component={UserBox}/>
    </Route>
  </Route>
);

ReactDOM.render(
  <Router history={hashHistory}>{Routes}</Router>,
  document.getElementById('content')
);
