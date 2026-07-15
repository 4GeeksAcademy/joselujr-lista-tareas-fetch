import React, { useState } from "react";
import { useEffect } from 'react';

//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState("")
	const [tareas, setTareas] = useState([])
	const borrarTarea = (indexEliminar) => {
		const nuevasTareas = tareas.filter((tarea, index) => index !== indexEliminar);
		setTareas(nuevasTareas);
	};

	const crearUsuario = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/joselujr", {
			method: "POST"
		})
		const data = await response.json();
		console.log(data);
	}

	const crearTarea = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/todos/joselujr", {
			method: "POST",
			body: JSON.stringify({
				"label": inputValue,
				"is_done": false
			}),
			headers: {
				"content-Type": "application/json"
			}
		})
		const data = await response.json();
		if (response.ok) {
			traerTarea()
		}
	}

	const traerTarea = async () => {
		const response = await fetch ("https://playground.4geeks.com/todo/users/joselujr",)
			if(!response.ok) {
				crearUsuario()
				return
			}
			const data = await response.json()
			setTareas(data.todos)
	}
//este fue el ultimo paso, terminar de crear las const restantes
	const eliminarTarea = async () => {

	}



	useEffect(() => { }, [])


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

/*fetch("https://playground.4geeks.com/todo/users/joselujr", {
	method: "DELETE"
})
.then(respuesta => {
	console.log(respuesta.ok);
	console.log(respuesta.status);
})
.catch(error => {
	console.log(error);
});
*/
