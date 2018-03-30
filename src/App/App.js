import React from 'react'
import Backbone from 'backbone'
import _ from 'lodash'
import MobileDetect from 'mobile-detect';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const App = React.createClass({

  getInitialState(){
    let md = {};
    if ( typeof window !== 'undefined' && window.navigator )
      md = new MobileDetect(window.navigator.userAgent);
    return {
      isMobile: md.mobile && md.mobile() !== null,
      dispatcher: _.clone(Backbone.Events)
    }
  },

  getChildContext(){
    const { dispatcher, isMobile } = this.state;
    return {
      isMobile,
      dispatcher
    }
  },

	assignStaticContext(){
		const { staticContext, location } = this.props;

		// TODO: MAKE THIS NOT TERRIBLE
		switch( location.pathname ){
			// VALID PATHS
			case '/':
				return

			// REDIRECT TO HOME PAGE IF NOT VALID ROUTE
			default:
				staticContext.redirectUrl = '/'
		}
	},

  render() {
    const { isMobile } = this.state;
		const { staticContext } = this.props;
		// staticContext only exists on the server side - used to control redirects
		if ( staticContext ) this.assignStaticContext()

    if ( isMobile ){
      return (
        <div id="MobileApp">
					Hello Mobile World
				</div>
      );
    } else {
      return (
				<div id="App">
					<div>Hello World</div>
				</div>

      );
    }
  }
});

App.childContextTypes = {
  dispatcher: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired
};

export default App
