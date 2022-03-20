import React from 'react';


const Home = () => {

	/*useEffect(() => {
		// POST request using fetch inside useEffect React hook
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: 'React Hooks POST Request Example' })
		};
		fetch('http://10.10.30.10:9000/api/building/1')
			.then(response => response.json())
			.then(data => console.log(data.floorDtos.length));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
	}, []);*/

	return(
		<>
			<h1>Hello</h1>
		</>
	);
}

export default Home;