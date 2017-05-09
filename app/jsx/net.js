import req from 'superagent'

export const request = (url, param, handler, type='POST', errorHandler=null) => {
  let r = type=='POST' ? req.post(url) : req.get(url);
  r
    .type('json')
    .send(JSON.stringify(param))
    .end((err, res) => {
      if (err) {
        console.error(url, err.toString());
        return errorHandler ? errorHandler(err) : 0;}
      else {
        return handler(JSON.parse(res.text));
      }})}
