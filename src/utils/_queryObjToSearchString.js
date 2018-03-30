import _ from 'lodash'

const queryObjToSearchString = ( query, excludedParams = [] ) => {
  let queryAsString = '';
  _.each(query, ( value, key ) => {
    if ( !_.includes( excludedParams, key )){
      queryAsString += queryAsString ?  `&${key}=${value}` : `?${key}=${value}`
    }
  });
  return queryAsString
}

export default queryObjToSearchString
