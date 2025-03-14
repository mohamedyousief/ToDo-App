import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import ToDo from './ToDo';
import './style.css'
import Pagination from '@mui/material/Pagination';

export default function ToDoList() {
    const [counter, setCounter] = useState(2);
    const [todos, setTodos] = useState([
        {id:1, name: "اول مهمة", status: false },
    ]);
    const [inp, setInp] = useState('');
    const [alignment, setAlignment] = useState('left');
    const [changeBtns, setChangeBtns] = useState('not finish');
    const [editClick, setEditClick] = useState('')
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const handelAddClick = () => {
        if (editClick) {
            setTodos(todos.map(todo => 
                todo.id === editClick ? { ...todo, name: inp } : todo
            ))
            setEditClick('')
        }
        else {
            setTodos([...todos, { id: counter + 1, name: inp, status: false }])
            setCounter(counter + 1)
        }
        setInp("")
    };

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleStatus = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, status: !todo.status } : todo
        ));
        
    };

    const handelEditClick = (idx) => {
        setEditClick(idx)
        let val = todos.find(todo => todo.id === idx)
        setInp(val.name)
    }

    const handelDeleteClick = (idx) => {
        setTodos(todos.filter(todo =>
            todo.id!==idx
        ))
    }

    const data = todos.filter((d) => {
        if (changeBtns == "all") {
            return d;
        }
        else if (changeBtns == "finish") {
            return d.status==true
        }
        else {
            return d.status==false
        }
    })

    useEffect(() => {
        setCurrentPage(1)
    }, [changeBtns]);

    const pageCount = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Container maxWidth="sm" className="container">
            <Card className="card">
                <div className="logo">
                    <h1>مهامى</h1>
                    <hr />
                </div>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="Platform"
                    className="toggle-group"
                >
                    <ToggleButton value="all" onClick={() => { setChangeBtns("all")}}>الكل</ToggleButton>
                    <ToggleButton value="finish" onClick={() => { setChangeBtns("finish")}}>منجز</ToggleButton>
                    <ToggleButton value="not finish" onClick={() => { setChangeBtns("not finish")}}>غير منجز</ToggleButton>
                </ToggleButtonGroup>

                <div className="toDos">
                    {paginatedData.map((d) => {
                        return <ToDo
                            key={d.id}
                            titel={d.name}
                            finish={d.status}
                            idx={d.id}
                            onChangeStat={handleStatus}
                            onEdit={handelEditClick}
                            onEditClick={editClick}
                            onDelete={handelDeleteClick}
                        />
                    })}
                    
                </div>

                {pageCount > 1 && (
                    <Pagination 
                        count={pageCount} 
                        variant="outlined" 
                        color="primary" 
                        page={currentPage} 
                        onChange={(event, value) => setCurrentPage(value)}
                        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
                    />
                )}

                <div className="addTodo">
                    <Button onClick={handelAddClick} variant="contained" size="large" style={
                        {
                            width: "25%",
                            height: "50px"
                        }
                    }>إضافة</Button>
                    <TextField value={inp} onChange={(event) => {
                        setInp(event.target.value)
                    }} id="outlined-basic" label="عنوان المهمة" variant="outlined" style={{
                        width: "73%",
                        height: "30px"
                    }} />
                </div>
            </Card>
        </Container>
    );
}
