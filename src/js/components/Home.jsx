import React, { useState } from "react";
import { useEffect } from 'react';

//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState("")
	const [tareas, setTareas] = useState([])
	
	useEffect(() => {
		fetch("https://playground.4geeks.com/todo/users/joselujr")
			.then(respuesta => {
				console.log(respuesta.ok);
				console.log(respuesta.status);
				return respuesta.json();
			})
			.then(datos => {
				console.log(datos);
				setTareas(datos.todos)

			})

			.catch(error => {
				console.log(error);

			})

	}, [])

	const borrarTarea = (indexEliminar) => {
		const nuevasTareas = tareas.filter((tarea, index) => index !== indexEliminar);
		setTareas(nuevasTareas);
	};


	return (
		<div className=" container-master text-center">
			<h1 className="titulo-tareas">TAREAS</h1>

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

			{tareas.length === 0 && <p>No hay tareas, añadir tareas</p>}
			<ul className="lista">
				{
					tareas.map((tarea, index) => {
						return (
							<li key={index}> {tarea} <span onClick={() => borrarTarea(index)}> ❌</span> </li>
						)
					})
				}

			</ul>
			<p>{tareas.length} tareas pendientes</p>

		</div>
	);
};

export default Home;



/*fetch("https://playground.4geeks.com/todo/users/joselujr", {
	method: "POST"
})

	.then(respuesta => {
		console.log(respuesta.ok);
		console.log(respuesta.status);
		return respuesta.json();
	})

	.then(datos => {
		console.log(datos);

	})

	.catch(error => {
		console.log(error);

	})
*/
