"use client"
import React, { useEffect, useState, useRef } from 'react';

import Backdrop from '@mui/material/Backdrop';
import styled from '@emotion/styled';

import { green } from '@mui/material/colors';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper, { PaperProps } from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Carousel from 'react-material-ui-carousel';
import { ModalAlert, RefProps as  ModalAlertRefProps } from '@/components/organism/ModalAlert';

const styleModalTodoList = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 624,
  p: 4,
  backgroundColor: '#18181B',
  borderRadius: '16px'
};

const styleModalTodoSave = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 170,
  p: 4,
  backgroundColor: '#18181B',
  borderRadius: '16px'
};

const CssItemTodoSave = styled(TextField)({
  '& label': {
    color: '#A0AAB4',
  },
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& input': {
      color: '#fff',
    },
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});

const checkboxCheckedColor = {
  color: '#fff',
  '&.Mui-checked': {
    color: green[300],
  },
}

const buttonWhiteColor = {
  color: '#fff',
  borderColor: '#f9f9f9',
  transition: 'all 200ms ease-in-out',
  '&:hover': {
    borderColor: '#c3c3c3'
  }
}

/* const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}; */

type TodoItemProps = {
  id: number;
  name: string;
  render: () => JSX.Element;
}

type CarouselItemProps = PaperProps & {
  name: string;
  description: string;
}

let countItems = 0;

export default function Home() {
  const [openTodoList, setOpenTodoList] = useState(false);
  const [openTodoSave, setOpenTodoSave] = useState(false);
  const [name, setName] = useState('');
  const [items, setItems] = useState([] as TodoItemProps[]);

  const modalAlertSuccessRef = useRef<ModalAlertRefProps>({} as ModalAlertRefProps);
  const modalAlertWarningRef = useRef<ModalAlertRefProps>({} as ModalAlertRefProps);
 
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const carouselItems = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!"
    },
    {
      name: "Random Name #2",
      description: "Hello World!"
    },
    {
      name: "Random Name #3",
      description: "ASDASDASDASD"
    },
    {
      name: "Random Name #4",
      description: "random name 4"
    }
  ];

  function handleOpenTodoList() {
    setOpenTodoList(true);
  }

  function handleCloseTodoList() {
    setOpenTodoList(false);
  }

  function handleOpenTodoSave() {
    setOpenTodoSave(true);
  }

  function handleCloseTodoSave() {
    setOpenTodoSave(false);
  }
  
  function handleRemoveItem(id: number) {
    console.log('> Remove Item')
    setItems(items.filter(item => item.id !== id));
  }

  function handleAddNewItem() {
    if (!name) {
      modalAlertWarningRef.current.openModal();
      setTimeout(() => { modalAlertWarningRef.current.closeModal() }, 1000);
      return;
    }
    const id = countItems++;

    setItems([
      ...items, 
      {
        id,
        name,
        render: () => (
          <Box key={id.toString()} className="flex flex-row justify-between w-full items-center overflow-x-hidden pr-[12px]">
            <FormControlLabel className="w-full" control={<Checkbox {...label} sx={checkboxCheckedColor} />} label={name} />
            <Button className="cursor-pointer min-w-0 p-0" onClick={() => handleRemoveItem(id)}>
              <DeleteIcon sx={{ color: '#fff' }} />
            </Button>
          </Box>
        )
      }
    ]);

    setName('');
    modalAlertSuccessRef.current.openModal();
    setTimeout(() => { modalAlertSuccessRef.current.closeModal() }, 1000);
  }

  const CarouselItem = ({ name, description }: CarouselItemProps) => {
    return (
      <Paper className="px-[50px] py-[20px] h-full">
          <Typography variant="h5" fontWeight="bold" component="h2">{name}</Typography>
          <Typography variant="h6" component="p">{description}</Typography>

          <Button className="CheckButton">
              Check it out!
          </Button>
      </Paper>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-between">
    
        <Button variant="outlined" onClick={handleOpenTodoList} sx={buttonWhiteColor}>Open List</Button>
        <Modal
          open={openTodoList}
          onClose={handleCloseTodoList}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openTodoList}>
            <Box sx={styleModalTodoList}>
              <Typography id="modal-modal-title" variant="h4" fontWeight="bold" component="h2">
                Todo
              </Typography>
              <Typography id="modal-modal-description" className="max-w-xs" sx={{ mt: 2 }}>
                My purchases to do at the supermarket
              </Typography>

              <Box className="flex flex-col items-start mt-8 overflow-y-scroll max-h-[380px] modal-scrollbar">
                {items.map(item => (
                  <Box key={item.id} className="flex flex-row justify-between w-full items-center overflow-x-hidden pr-[12px]">
                    <FormControlLabel className="w-full" control={<Checkbox {...label} sx={checkboxCheckedColor} />} label={item.name} />
                    <Button className="cursor-pointer min-w-0 p-0" onClick={() => handleRemoveItem(item.id)}>
                      <DeleteIcon sx={{ color: '#fff' }} />
                    </Button>
                  </Box>
                ))}
              </Box>

              <Box className="flex flex-row w-full justify-end mt-6">
                <Button className="bg-green-700 p-[8px] min-w-0 rounded-full" variant="contained" color="success" onClick={handleOpenTodoSave}>
                  <AddIcon />
                </Button>
              </Box>
              <Modal
                open={openTodoSave}
                onClose={handleCloseTodoSave}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={openTodoSave}>
                  <Box sx={styleModalTodoSave} className="flex flex-col gap-[10px]">
                    <CssItemTodoSave fullWidth id="outlined-basic" label="Name" variant="outlined" value={name} onChange={e => setName(e.target.value)} />

                    <Box className="flex flex-row w-full justify-end mt-3">
                      <Button className="bg-green-700 p-[8px] w-full capitalize" variant="contained" color="success" onClick={handleAddNewItem}>
                        Save
                      </Button>
                    </Box>
                  </Box>
                </Fade>
              </Modal>
            </Box>
          </Fade>
        </Modal>
      </div>

      <Carousel 
        className="flex flex-col w-full max-w-[400px]" 
        autoPlay={false} 
        height={200}
        navButtonsAlwaysVisible={true} 
        indicators={true}
        animation="fade"
      >
        {carouselItems.map((item, i) => <CarouselItem key={i} name={item.name} description={item.description} />)}
      </Carousel>

      <ModalAlert ref={modalAlertSuccessRef} severity="success" title="Item saved" />
      <ModalAlert ref={modalAlertWarningRef} severity="warning" title="Name is blank" />
    </main>
  )
}


