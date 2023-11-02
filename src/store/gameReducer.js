const initialState = {
	squares: Array(9).fill(null),
	winner: null,
	nextValue: "X",
	xWins: 0,
	oWins: 0,
};

const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SELECT_SQUARE":
			return {
				...state,
				squares: action.payload,
				winner: checkWinner(action.payload),
				nextValue: state.nextValue === "X" ? "O" : "X",
			};
		case "RESTART_GAME":
			return {
				...initialState,
				xWins: state.xWins,
				oWins: state.oWins,
			};
		case "UPDATE_WINS":
			return {
				...state,
				xWins: action.payload.player === "X" ? state.xWins + 1 : state.xWins,
				oWins: action.payload.player === "O" ? state.oWins + 1 : state.oWins,
			};
		default:
			return state;
	}
};

function checkWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}

	return null;
}

export default gameReducer;
