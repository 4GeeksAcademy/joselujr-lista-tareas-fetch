import React, { useState, useEffect } from "react";

const Home = () => {

	const [inputValue, setInputValue] = useState("")
	const [tareas, setTareas] = useState([])


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
		const response = await fetch("https://playground.4geeks.com/todo/users/joselujr",)
		if (!response.ok) {
			crearUsuario()
			return
		}
		const data = await response.json()
		console.log(data.todos);

		setTareas(data.todos)
	}

	const eliminarTarea = async (id) => {
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		})
		if (response.ok) {
			traerTarea()
		}
		console.log(response.ok);
		console.log(response.status);
		console.log(id);
	}

	const borrarTodo = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/joselujr", {
			method: "DELETE"
		})
		if (response.ok) {
			await crearUsuario()
			setTareas([])
		}
	}

	useEffect(() => { traerTarea() }, [])

	return (
		<div className=" container-master text-center">
			<h1 className="titulo-tareas">TAREAS</h1>

			<input type="text"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onKeyDown={e => {
					if (e.key === "Enter" && inputValue.trim().length > 0) {
						crearTarea()
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
							<li key={index}> {tarea.label} {" "} <span onClick={() => eliminarTarea(tarea.id)}> ❌</span> </li>
						)
					})
				}

			</ul>
			<p>{tareas.length} tareas pendientes</p>

			<button id="boton" onClick={borrarTodo}> <strong>Borrar Toda Lista</strong></button>

		</div>
	);

};

export default Home;

