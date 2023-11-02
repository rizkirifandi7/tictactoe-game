import React, { useEffect, useState } from "react";
import Square from "./Square";
import { useSelector, useDispatch } from "react-redux";
import { selectSquare, restartGame, updateWins } from "../store/gameActions";

function Board() {
	const squares = useSelector((state) => state.squares);
	const winner = useSelector((state) => state.winner);
	const nextValue = useSelector((state) => state.nextValue);
	const xWins = useSelector((state) => state.xWins);
	const oWins = useSelector((state) => state.oWins);
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);

	const selectSquareHandler = (i) => {
		if (squares[i] || winner) return;
		const newSquares = squares.slice();
		newSquares[i] = nextValue;
		dispatch(selectSquare(newSquares));

		const newWinner = calculateStatus(winner, newSquares, nextValue);
		if (newWinner.includes("Winner")) {
			dispatch(updateWins(nextValue));
			setShowModal(true);
		} else if (newWinner === "Game Draw!!") {
			setShowModal(true);
		}
	};

	const calculateStatus = (winner, squares, nextValue) => {
		return winner ? `Winner: ${winner}` : squares.every(Boolean) ? `Game Draw!!` : `Next Player : ${nextValue}`;
	};

	const restartHandler = () => {
		dispatch(restartGame());
		setShowModal(false);
	};

	useEffect(() => {
		if (winner) {
			dispatch(updateWins(nextValue));
			setShowModal(true);
		} else if (calculateStatus(winner, squares, nextValue) === "Game Draw!!") {
			setShowModal(true);
		}
	}, [winner, nextValue, dispatch, squares]);

	return (
		<div className="flex justify-center items-center mt-10 mb-10">
			{/* Player O Box */}
			<div className="text-center me-10">
				<div className="bg-red-400 p-4 m-4 rounded-lg shadow-md border-player">
					<h2 className="text-lg font-semibold">Player O</h2>
				</div>
				<div className="rounded-lg p-2 m-4 border-player">
					<p>Wins: {xWins}</p>
				</div>
			</div>

			{/* Game Board */}
			<div className="text-center">
				<div className="mb-5">
					<h1 className="font-bold text-xl bg-[#F9D459] rounded-md p-2 border-player">
						{calculateStatus(winner, squares, nextValue)}
					</h1>
				</div>
				<div className="grid grid-cols-3">
					{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
						<Square key={index} value={squares[index]} onClick={() => selectSquareHandler(index)} />
					))}
				</div>
				<button
					className="font-bold px-10 py-2 rounded-md mt-5 bg-[#F9D459] hover:bg-white border-player"
					onClick={restartHandler}
				>
					Reset
				</button>
			</div>

			{/* Player X Box */}
			<div className="text-center ms-10">
				<div className="p-4 m-4 rounded-lg shadow-md bg-blue-400 border-player">
					<h2 className="text-lg font-semibold">Player X</h2>
				</div>
				<div className="border-player rounded-lg p-2 m-4">
					<p>Wins: {oWins}</p>
				</div>
			</div>

			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="modal-overlay absolute inset-0 bg-gray-500 opacity-50"></div>
					<div className="modal-container bg-white w-4/12 p-4 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
						<div className="modal-content text-center p-4">
							<h2 className="text-lg font-semibold">{winner ? `Player ${winner} wins!` : "It's a Draw!"}</h2>
							<button className="mt-4 bg-[#F9D459] font-bold rounded py-2 px-4 border-player" onClick={restartHandler}>
								Play Again
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Board;
