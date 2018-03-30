import Express from 'express';
import path from 'path';
const _router = Express.Router();

export default (() => {
  _router.get('/health_check', ( req, res ) => res.sendStatus( 200 ));
	_router.get('/favicon.ico', ( req, res ) => res.sendFile( path.resolve('src', 'favicon.ico' )));
	_router.get('/build/:filename', ( req, res) => {
    res.sendFile( path.resolve('build', req.params.filename ))
  });
  return _router;
})
