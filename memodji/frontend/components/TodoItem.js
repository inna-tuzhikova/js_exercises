import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ListItem } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CheckedIcon from '@material-ui/icons/CheckBox';
import UncheckedIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import todoItemStyle from '../assets/styles/todoItemStyle';

import { useStyles, clsx } from './../util';
 
import { updateTodo, deleteTodo, toggleTodo } from '../domains/todos.js';
import TodoModal from './modals/Todo.js';

const TodoItem = ({todo}) => {
	const classes = useStyles(todoItemStyle);
	const modalParams = {isUpdate:true, todo};
	const Icon = todo.isChecked ? CheckedIcon : UncheckedIcon;
	const buttonClass = clsx(classes.todoItemButton, todo.isChecked && classes.checked);
	return <ListItem>
		<IconButton onClick={() => toggleTodo(todo)}><Icon/></IconButton>
		<Button className={buttonClass} onClick={() => TodoModal.open(todo)}>
			<Typography noWrap={true} >{todo.text}</Typography>
		</Button>
		<TodoModal {...modalParams} onData={updateTodo}/>
		<IconButton onClick={() => deleteTodo(todo)}><ClearIcon/></IconButton>
	</ListItem>;

};

export default TodoItem; 
