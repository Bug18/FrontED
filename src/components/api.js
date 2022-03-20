import React from 'react';


const ApiConnection = () => {
	const apiUrl = 'http://10.10.30.10:9000/api/';

	/*
	* const data = {
	*	method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
        },
        body: JSON.stringify({ title: 'React POST Request Example' })
	* };
	* */

	function POSTtoApi(path, data){
		fetch(apiUrl + path, data).then(res => res.json())
			.then((response) => response.json())
			.then((data) => console.log('This is your data', data));
	}

	function GETfromApi(path, data){
		fetch(apiUrl + path, data).then(res => res.json())
			.then((response) => response.json())
			.then((data) => console.log('This is your data', data));
	}


}

export default ApiConnection;