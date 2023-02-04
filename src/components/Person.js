import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const Person = (props) => {
	const [data,setData] = useState([]);
	const [isLoaded,setIsLoaded] = useState(false);
	const [isDataFound,setIsDataFound] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		axios.get(`https://swapi.dev/api/people/${id}`)
			.then(res => {
				setData(res.data);
				setIsLoaded(true);
				setIsDataFound(true);
				console.log(res);
			})
			.catch(err => {
				console.log(err);
				setIsLoaded(true);
				setIsDataFound(false);
			});
	},[id]);

  return (
    <main>
			{ !isLoaded ? (<p>Loading...</p>) :
				isDataFound ?
					(<h1>{data.name}</h1>)
					: (<p>Not found!</p>) }
		</main>
  );
}

export default Person;
