import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './TaskCard.css';

const TaskCard = ({ item, index, deleteTask, columnId }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-card-content">
            {item.content}
          </div>
          <button className="delete-button" onClick={() => deleteTask(columnId, item.id)}>Delete</button>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
