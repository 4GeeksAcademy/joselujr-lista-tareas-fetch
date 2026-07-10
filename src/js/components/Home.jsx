import React, { useState } from "react";

//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState("")
	const [tareas, setTareas] = useState([])



	return (
		<div className="text-center">

			<input type="text"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onKeyDown={e => {
					if (e.key === "Enter" && inputValue.trim().length > 0) {
						setTareas([...tareas, inputValue])
						setInputValue("")
					}
				}
				}
			/>

			<ul>
				{
					tareas.map((tarea, index) => {
						return (
							<li key={index}> {tarea} </li>
						)
					})
				}

			</ul>

		</div>
	);
};

export default Home;