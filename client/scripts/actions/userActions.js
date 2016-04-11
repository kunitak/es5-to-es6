import Dispatcher from '../dispatchers/dispatcher';

const userActions = {
  //ユーザー一覧の取得
  load(target){
    Dispatcher.handleServerAction({
      type: 'load',
      target: target
    });
  },
  //ユーザーの登録
  register(target) {
    Dispatcher.handleServerAction({
      type: 'register',
      target: target
    });
  }
};

export default userActions;
