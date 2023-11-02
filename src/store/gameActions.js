export const selectSquare = (newSquares) => ({
	type: "SELECT_SQUARE",
	payload: newSquares,
});

export const restartGame = () => ({
	type: "RESTART_GAME",
});

export const updateWins = (player) => ({
	type: "UPDATE_WINS",
	payload: { player },
});
