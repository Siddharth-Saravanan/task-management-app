import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import TaskCard from './TaskCard';
import './KanbanBoard.css';
import { initialColumns } from './KanbanData';

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState('');

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
    } else {
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObj = { id: uuidv4(), content: newTask };
    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        items: [...columns.todo.items, newTaskObj],
      },
    });
    setNewTask('');
  };

  // Function to delete a task
  const deleteTask = (columnId, taskId) => {
    const column = columns[columnId];
    const updatedItems = column.items.filter((item) => item.id !== taskId);

    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems,
      },
    });
  };

  return (
    <div className="kanban-board">
      <h1>ProManage Task Manager</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {Object.entries(columns).map(([columnId, column]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  className="column"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2>{column.name}</h2>
                  {column.items.map((item, index) => (
                    <TaskCard
                      key={item.id}
                      item={item}
                      index={index}
                      columnId={columnId}
                      deleteTask={deleteTask} // Pass deleteTask function as a prop
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;


