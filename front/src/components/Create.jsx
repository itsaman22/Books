import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Create() {
  const [formData,setFormData]= useState({
    title : "",
    author : "",
    year : ""
  })
  const navigate = useNavigate()
  const API_URL = "https://niet-books.onrender.com/books"

  const handleSubmit= async (e)=>{
    e.preventDefault()
    await axios.post(API_URL,formData)
    navigate("/")
  }
  return (
    <div className='card p-3 shadow'>
      <h3> Add New Book </h3>
      <form onSubmit={handleSubmit}>
     Title : <input type='text'
     placeholder='Enter Title'
     value={formData.title}
     onChange={e => setFormData({...formData, title : e.target.value})}
      className='form-control mb-2'
      required /> <br/>
     Author :  <input type='text'
     placeholder='Enter Author'
      value={formData.author}
      onChange={e => setFormData({...formData, author : e.target.value})}
      className='form-control mb-2'
       required /> <br/>
     Year : <input type='number' 
     placeholder='Enter Year'
      value={formData.year}
      onChange={e => setFormData({...formData, year : e.target.value})}
     className='form-control mb-2'
      required /> <br/>
      <button className='btn btn-primary'> Add </button>
      </form>
    </div>
  )
}
