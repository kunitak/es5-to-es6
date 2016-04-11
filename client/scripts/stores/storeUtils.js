import React from 'react';
import request from 'superagent';

let ajax = {
  get  : (url, params, callback) => {
    request
      .get(url)
      .query(params)
      .end((err, res) => callback(err, res))
  },
  post : (url, params, callback) => {
    request
      .post(url)
      .send(params)
      .end((err, res) => callback(err, res))
  }
};

export default ajax;
