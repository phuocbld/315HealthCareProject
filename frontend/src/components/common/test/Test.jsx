import React, { useState } from 'react'
import {Button} from 'antd' 
import axios from "axios";
const Test = () => {
    const [file1,setFile1] = useState(null)
    const URL= ''
    
    const handleInput_1 = (e) => {
        const file = e.target.files[0]
        console.log(file);
        setFile1(file)
    }
    const handleInput_2 = (e) => {
        const file = e.target.files[0]
        let render = new FileReader();
        render.readAsDataURL(file);
        render.onload = (e) => {
            setFile1( e.target.result);
            console.log(e.target.result);
          };
    }
    const handleInput_3 = (e) => {
        const file = e.target.files[0]
        let formData = new FormData();
        formData.append('file', file);
        setFile1(formData)
        console.log(formData);
    }
const handleSubmit =(e) =>{
    e.preventDefault();
    axios.post(URL,file1)
}
  return (
    <div className='flex flex-col w-full h-500 items-center justify-between'>
        <div className='h-20'>   
            <h2>test 1</h2>
        <Button className="my-2 p-0 bg-blue-500 text-white">
        <label className="cursor-pointer px-4 py-1" for="file-upload">
          Chọn file danh sách
        </label>
        <input id="file-upload" type="file"  onChange={handleInput_1}  />
      </Button>
        </div>
        <div>   
            <h2>test 2</h2>
        <Button className="my-2 p-0 bg-blue-500 text-white">
        <label className="cursor-pointer px-4 py-1" for="file-upload-1">
          Chọn file danh sách
        </label>
        <input id="file-upload-1" type="file"  onChange={handleInput_2}  />
      </Button>
        </div>
        <div>   
            <h2>test 3</h2>
        <Button className="my-2 p-0 bg-blue-500 text-white">
        <label className="cursor-pointer px-4 py-1" for="file-upload-2">
          Chọn file danh sách
        </label>
        <input id="file-upload-2" type="file"  onChange={handleInput_3}  />
      </Button>
        </div>
        
        <button className='border' onClick={()=>{handleSubmit()}}>Nộp file</button>
    </div>
  )
}

export default Test