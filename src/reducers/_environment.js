export default (
  status = {
    NODE_ENV:'local'
  },
  action
) => {
  switch ( action.type ){
    default:
      return status;
  }
}
