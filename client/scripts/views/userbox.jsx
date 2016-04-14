import React from 'react';
import ReactDOM from 'react-dom';

import UserActions from '../actions/userActions';
import UserStore from '../stores/userStore';

const getUserStoreStates = () => UserStore.getAjaxResult();

//フォームとリストを一つにしたもの
class UserBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = getUserStoreStates();
    this.onViewUsers = this.onViewUsers.bind(this);
    this.onUpdatedUser = this.onUpdatedUser.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
  }

  componentWillMount(){
    UserStore.addLoadListener(this.onViewUsers);
    UserStore.addRegisterListener(this.onUpdatedUser);
  }
  
  componentWillUnmount(){
    UserStore.removeLoadListener(this.onViewUsers);
    UserStore.removeRegisterListener(this.onUpdatedUser);
  }
  
  onViewUsers(){
    this.setState(getUserStoreStates());
  }
  
  onUpdatedUser(){
    //更新成功したらクリアする
    ReactDOM.findDOMNode(this.refs.userform.refs.name).value = "";
    ReactDOM.findDOMNode(this.refs.userform.refs.mail).value = "";
    this.onViewUsers();
  }
  
  handleAddUser(name, mail){
    UserActions.register({name: name, mail: mail});
  }
  
  componentDidMount(){
    UserActions.load();
  }
  
  render(){
    return(
      <div style={{width:"300px"}}>
        <UserForm addUser={this.handleAddUser} ref="userform"/>
        <hr/>
        <UserList userData={this.state.userData}/>
      </div>
    );
  }
}

//リスト一行分を表示するコンポーネントを定義
class User extends React.Component{
  render(){
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.mail}</td>
      </tr>
    );
  }
}
//propTypesは外で定義する
User.propTypes = {
  name: React.PropTypes.string.isRequired,
  mail: React.PropTypes.string
};


//リストそのものを表示するコンポーネントを定義
class UserList extends React.Component{
  render(){
    const UserNodes = this.props.userData.map((user, index) => {
      return (
        <User name={user.name} mail={user.mail} key={index}/>
      );
    });
    return (
      <table>
        <tbody>
          <tr>
            <th>名前</th>
            <th>メールアドレス</th>
          </tr>
          {UserNodes}
        </tbody>
      </table>
    );
  }
}
UserList.propTypes = {
  userData:React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

//ユーザーの入力フォームを定義
class UserForm extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const mail = ReactDOM.findDOMNode(this.refs.mail).value.trim();
    this.props.addUser(name, mail);
  }

  render(){
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <label>名前</label>
              </td>
              <td>
                <input type="text" ref="name"/>
              </td>
            </tr>
            <tr>
              <td>
                <label>メールアドレス</label>
              </td>
              <td>
                <input type="text" ref="mail"/>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{textAlign:"right"}}>
          <button onClick={this.handleSubmit}>追加</button>
        </div>
      </div>
    );
  }
}
UserForm.propTypes = {
  addUser:React.PropTypes.func.isRequired
}

export default UserBox;
