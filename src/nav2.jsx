import { API_BASE_URL } from './router/config';
import React, {useState, useEffect } from 'react';


function Nav2() {

	const [user, setUser] = useState(null);
		useEffect(() => {
		// Fetch the user data when the component mounts
		fetch('/user')
		.then(response => response.json())
		.then(data => {
		if (data.isAuthenticated) {
		setUser(data.user);
		}
		});
		}, []); 


    return (
    <nav className="myClass">
    
	{
    <ul className="navMain">
	  <li><a className="navbuttons" href="index.html">
				Forgotten Heralds
			</a>
	  	</li>
	  <li><a className="navbuttons" href="">Apply</a></li>
	  <li><a className="navbuttons" href="">Operations</a></li>
	  <li><a className="navbuttons" href="itc.html">ITC</a></li>

	  <li><button onClick={() => window.location.href=`${API_BASE_URL}/auth/discord`}>Login with Discord</button>
	</li>
	</ul>
    }
    
	</nav>

	
	);
}

export default Nav2;