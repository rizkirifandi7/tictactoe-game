// src/components/Square.js
import React from "react";

function Square({ value, onClick }) {
	const colorClass = value === "X" ? "text-blue-500" : "text-red-500";

	return (
		<button className={`square focus:outline-none ${colorClass} shadow-md border-player`} onClick={onClick}>
			<div className="flex items-center justify-center h-full">
				{value}
			</div>
		</button>
	);
}

export default Square;
