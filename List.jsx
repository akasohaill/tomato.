import React, { useEffect, useState } from 'react'
import './List.css'
import {toast} from 'react-toastify'
import axios from 'axios'

const List = ({url}) => {

 
  const [list,setList]=useState([])

  const fetchList=async ()=>{
    const response=await axios.get(`${url}/api/food/list`);
    console.log(response.data)
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error(error)
    }
  }

  const removeItem=async (foodId)=>{
    const response=await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error('Error')
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Food Lists</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeItem(item._id)} className='cross'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
