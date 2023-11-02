import React from "react";
import Game from "./components/Game";
import { Provider } from "react-redux";
import store from "./store/index";

function App() {
	return (
		<Provider store={store}>
			<div>
				<h1 className="text-center text-4xl font-bold mt-10">
					Tic <span className="text-red-400">Tac</span> <span className="text-blue-400">Toe</span>
				</h1>
			</div>
			<Game />
		</Provider>
	);
}

export default App;

