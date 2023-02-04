import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Person from './components/Person';

function App() {
  return (
    <div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element=<Main /> />
					<Route path="/:id" element=<Person /> />
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
