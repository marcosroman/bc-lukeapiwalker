import { useState } from 'react';
import axios from 'axios';

const Main = (props) => {
	const [id,setId] = useState("");
	const [type,setType] = useState("people");
	const [isDataReceived,setIsDataReceived] = useState(false);
	const [isSubmitted,setIsSubmitted] = useState(false);
	const [isLoaded,setIsLoaded] = useState(false);
	const [receivedKeys,setReceivedKeys] = useState([]);
	const [receivedValues,setReceivedValues] = useState([]);

	const submit = (e,type,id) => {
		e.preventDefault();
		setIsDataReceived(false);
		if(id) {
			setIsSubmitted(true);
			setIsLoaded(false);
			axios.get(`https://swapi.dev/api/${type}/${id}`)
				.then(res => {
					setIsDataReceived(true);
					setReceivedKeys(Object.keys(res.data).slice(0,5));
					setReceivedValues(Object.values(res.data).slice(0,5));
					setIsLoaded(true);
				})
				.catch(err => {
					console.log(err)
					setIsLoaded(true);
				});
		} else {
			setIsSubmitted(false);
		}
	}

  return (
    <main>
			<form method="post">
				<label htmlFor="search">Search for:</label>
				<select name="search" id="search" value={type} onChange={e => setType(e.target.value)}>
					<option value="people">People</option>
					<option value="films">Films</option>
					<option value="starships">Starships</option>
					<option value="vehicles">Vehicles</option>
					<option value="species">Species</option>
					<option value="planets">Planets</option>
				</select>
		
				<label htmlFor="id">id</label>
				<input required name="id" value={id} onChange={e => setId(e.target.value)}/>

				<input type="submit" value="Search" onClick={e => submit(e,type,id)}/>
			</form>
			{ isSubmitted && (
				!isLoaded ? <p>Loading...</p> :
					( isDataReceived ? (
						<>
							<h2>{receivedValues[0]}</h2>
							<table>
								<tbody>
									<tr>
										<td>{receivedKeys[1]}</td>
										<td>{receivedValues[1]}</td>
									</tr>
									<tr>
										<td>{receivedKeys[2]}</td>
										<td>{receivedValues[2]}</td>
									</tr>
									<tr>
										<td>{receivedKeys[3]}</td>
										<td>{receivedValues[3]}</td>
									</tr>
									<tr>
										<td>{receivedKeys[4]}</td>
										<td>{receivedValues[4]}</td>
									</tr>
								</tbody>
							</table>
						</>
					) : (
						<>
							<h1>EZTOZ NO ZON LOZ DRONEZ QUE BUZCAIZ!</h1>
							<img src="https://yt3.ggpht.com/a/AATXAJz3ghUQZY6qnuywkGH2YojtR6nmU0sPOM1dMg=s900-c-k-c0xffffffff-no-rj-mo" alt="sexy obiwankenobi"></img>
						</>
					)))}
    </main>
  );
}

export default Main;
