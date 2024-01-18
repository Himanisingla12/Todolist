import "./List.css";
import { useState, useEffect, useRef } from "react";

const List = () => {
  const [val, handletext] = useState('');
  const [tasks, handletasks] = useState([]);
  const checkboxRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // You can initialize textRef.current here or in the render
    textRef.current = document.getElementById('text');
  }, []);

  const addtask = () => {
    if (!val) {
      alert("please write task");
    } else {
      const obj = {
        id: new Date().getTime().toString(),
        name: val,
      };
      handletasks([...tasks, obj]);
      handletext('');
      fetch("http://localhost:3000",{
        method:'POST',
        body:JSON.stringify({tasks:[...tasks,obj]}),
        headers:{'content-Type':'application/json'}
      }).then((resp)=>resp.json())
      .then((data)=>console.log(data))
    }
  };

  const handlecheck = (taskId) => {
    // Update the specific task's textDecoration style
    const textRef = document.getElementById(`text-${taskId}`);
    const checkboxRef = document.getElementById(`checkbox-${taskId}`);
  
    // Check if both refs are not null before accessing properties
    if (checkboxRef && textRef) {
      if (checkboxRef.checked) {
        textRef.style.textDecoration = 'line-through';
      } else {
        textRef.style.textDecoration = 'none';
      }
    }
  };
  

  const removetask = (i) => {
    const removed = tasks.filter((ele) => ele.id !== i);
    handletasks(removed);
  };

  return (
    <div className="list-box">
      <div className='box'>
        <h2>📝To-do List</h2>
        <div className='inp'>
          <input
            type='text'
            placeholder="Enter task ✍"
            id='text'
            value={val}
            onChange={(e) => handletext(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-success py-2 mb-1"
            onClick={addtask}
          >
            Add Tasks
          </button>
        </div>
        <div className='items'>
          {tasks.map((tsk) => (
            <div key={tsk.id} className="adtsk">
              <div className="form-check mx-2 my-1">
                <input
                  className="form-check-input "
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onChange={handlecheck(tsk.id)}
                  ref={checkboxRef}
                />
              </div>
              <p ref={textRef}>{tsk.name}</p>
              <i
                className="fa fa-trash mt-2 mx-2"
                aria-hidden="true"
                onClick={() => removetask(tsk.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
