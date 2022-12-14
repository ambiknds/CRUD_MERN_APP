import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([])
  const [newFoodName, setNewFoodName] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((response) => {
      setFoodList(response.data)
    } )
  },[])

  const addToList = (id) => {
    Axios.post('http://localhost:3001/insert', {foodName: foodName, days: days})
  }

  const updateFood = (id) => {
    Axios.put('http://localhost:3001/update', 
    {id: id, newFoodName: newFoodName})
  }

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }

  const addFoodName = (event) => {
    setFoodName(event.target.value);
  }

  const addAteDays = (event) => {
    setDays(event.target.value)
  }

  const updateFoodName = (event) => {
    setNewFoodName(event.target.value);
  }

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <div className="form">
        <label>Food Name</label>
        <input type="text" onChange={addFoodName}/>
        <label>Days Since You Ate</label>
        <input type="number" onChange={addAteDays}/>
        <button onClick={addToList}>Add To List</button>
      </div>

      <h1>Food List</h1>
      {foodList.map((val,key) => {
        return (
          <div className='list'>
            <div key={key}  className='foodList'>
              <h2>{val.foodName}</h2>
              <h2>{val.daysSinceIAte}</h2>
              <input type="text" placeholder='New Food Name' onChange={updateFoodName}/>
              <button onClick={()=> updateFood(val._id)}>Update</button>
              <button onClick={()=> deleteFood(val._id)}>Delete</button>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
