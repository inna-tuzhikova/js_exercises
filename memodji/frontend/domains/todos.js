import { lens, simpleCrud } from './../util';

const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Nulla vitae risus non nulla egestas malesuada congue non neque.
    Pellentesque eget urna vel odio porta elementum non vitae turpis.
    Donec pellentesque odio in magna tempus vulputate.
    Pellentesque finibus massa at sem commodo, vel molestie quam euismod.
    Fusce volutpat quam et lorem cursus, quis auctor velit consectetur.
    Aenean mollis tellus sit amet ultricies bibendum.
    Donec lacinia libero sed libero congue faucibus.
    Fusce ac dolor non est sagittis venenatis a at ipsum.
    Praesent ut nisi vitae libero suscipit sollicitudin eget in urna.
    Aenean volutpat orci at commodo commodo.
    Nunc ornare felis in urna volutpat, at condimentum nunc convallis.
    Vivamus quis erat sit amet dolor sagittis commodo.
    Suspendisse faucibus erat lobortis congue euismod.
    Donec quis nulla vel orci accumsan congue.
    Sed suscipit arcu sed nibh mattis aliquet.`;

const initialState = lipsum.split('\n').map((text, id) => ({text, id}));

const extraUpdaters = {
    toggleTodo: ({id, isChecked}) => ({id, isChecked: !isChecked}),
};

const {
    manageTodos,
    loadTodos, addTodo, updateTodo, deleteTodo, toggleTodo,
    getTodo
} = simpleCrud('todo', {initialState, extraUpdaters});

// If we didn't use extraUpdaters, we could write it like this:
//const toggleTodo = updateTodo.decorated((next) => ({id, isChecked}) => next({id, isChecked: !isChecked}));

const getAllTodos = lens(manageTodos);

export {
    manageTodos as default,
    loadTodos, addTodo, updateTodo, deleteTodo, toggleTodo,
    getTodo, getAllTodos
};
