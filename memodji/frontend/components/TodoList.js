import React from 'react';
import { List, ListItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { useLens, tr, useStyles } from './../util';

import { getAllTodos, addTodo } from '../domains/todos.js';

import todoListStyle from '../assets/styles/todoListStyle';
import TodoModal from './modals/Todo.js';
import TodoItem from './TodoItem';

const TodoList = () => {
	const todos = useLens(getAllTodos);
	const classes = useStyles(todoListStyle);
	return <>
		<List>
			{todos.map((todo) => <TodoItem key={todo.id} todo={todo}/>)}
			<ListItem key="add-todo-button">
				<Button variant="contained" className={classes.addItemButton} onClick={TodoModal.open}>
					<AddIcon/>{tr('ADD TODO')}
				</Button>
			</ListItem>
		</List>
		<TodoModal onData={addTodo}/>
	</>;
};

export default TodoList;
