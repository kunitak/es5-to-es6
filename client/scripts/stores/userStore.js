import React from 'react';
import ajax from './storeUtils';

import Dispatcher from '../dispatchers/dispatcher';
import {EventEmitter} from 'events';
import assign from 'object-assign';

let userStore = assign({}, EventEmitter.prototype, {
  data: {userData: []},
  addLoadListener(callback) {
    this.on('load', callback);
  },
  removeLoadListener(callback) {
    this.removeListener('load', callback);
  },
  addRegisterListener(callback) {
    this.on('register', callback);
  },
  removeRegisterListener(callback) {
    this.removeListener('register', callback);
  },
  getAjaxResult(){
    return userStore.data;
  }
});

//バリデーション
let validation = function(target){
  if (!target.name){
    alert('名前を入力してください');
    return false;
  }
  if (!target.mail){
    alert('メールアドレスを入力してください');
    return false;
  }
  return true;
};

userStore.dispatchToken = Dispatcher.register(function (payload) {
  let registerCallback = (err, res) => callback(err, res, 'register');
  let loadCallback = (err, res) => callback(err, res, 'load');
  let callback = (err, res, name) => {
    if (err){
      alert(res.text);
      return;
    }
    userStore.data = {userData: JSON.parse(res.text)};
    userStore.emit(name);
  }

  let actions = {
    load(payload){
      //ajax通信する
      ajax.get("/get_users", {}, loadCallback);
    },
    register(payload) {
      if (!validation(payload.action.target)){
        return;
      }
      //ajax通信する
      ajax.post("/post_user", payload.action.target, registerCallback);
    }
  };

  actions[payload.action.type] && actions[payload.action.type](payload);
});

export default userStore;
