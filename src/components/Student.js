import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button } from '@mui/material';


export default function Student() {
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[students,setStudents]=useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const student={name,address}
        console.log(student)
        
        fetch("http://localhost:8080/student/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
            console.log("New Student Added")
        })
    }
    useEffect(()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result) =>{
            setStudents(result);
        })    
    },[])
  return (
      <Container>
        <h1 style={{textAlign:'center', color:'blue'}}>Add Student</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student Name" variant="outlined" 
      type='text'
      value={name}
      onChange={(e) => setName(e.target.value)}
      /><br />
      <TextField id="outlined-basic" label="Student Address" variant="outlined" 
       type='text'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </Box>
      <Button variant="contained" onClick={handleClick}>Submit</Button>
 {name}{address}

    <h1 style={{textAlign:'center', color:'Red'}}>Students List</h1>
    {students.map(student=>(
        <div key={student.id}>
            Id: {student.id}<br/>
            Name: {student.name}<br/>
            Address: {student.address}<br/><br/>
        </div>
        ))
    }
    </Container>
    
  );
}
