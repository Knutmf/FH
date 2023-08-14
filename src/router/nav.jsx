import React, { Component } from 'react';

class Nav extends Component {
    render() {
    return <div>
        
        <ul className="nav">
	  <li><a className="navbuttons" href="index.html">
			<img src="images/favicon-32x32.png"  />
				Forgotten Heralds
			</a>
	  	</li>
	  <li><a className="navbuttons" href="">Apply</a></li>
	  <li><a className="navbuttons" href="">Operations</a></li>
	  <li><a className="navbuttons" href="itc.html">ITC</a></li>
      <li><img src='' id="avatar" className="rounded-full w-12 h-12 mr-3"/>
          <div id="name"></div>
    </li>
	</ul>
        
        </div>;
    }
    }
    export default Nav;