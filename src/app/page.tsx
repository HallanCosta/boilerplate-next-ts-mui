"use client"
import React, { useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import { useSpring, animated } from '@react-spring/web';
import styled from '@emotion/styled';

import { green } from '@mui/material/colors';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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

const styleModalMessage = {
  position: 'absolute' as 'absolute',
  top: '5%',
  right: '2%',
  transform: 'translate(0%, -50%)',
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

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

type TodoItemProps = {
  id: string;
  render: () => JSX.Element;
}

export default function Home() {
  const [openTodoList, setOpenTodoList] = useState(false);
  const [openTodoSave, setOpenTodoSave] = useState(false);
  const [openMessageSaveItem, setOpenMessageSaveItem] = useState(false);
  const [openMessageErrorItem, setOpenMessageErrorItem] = useState(false);
  const [name, setName] = useState('');
  const [items, setItems] = useState([] as TodoItemProps[]);

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  /* const items = [
    {
      render: () => <FormControlLabel control={<Checkbox {...label} sx={checkboxCheckedColor} />} label="Pera" />
    },
    {
      render: () => <FormControlLabel control={<Checkbox {...label} sx={checkboxCheckedColor} />} label="Maça" />
    },
    {
      render: () => <FormControlLabel control={<Checkbox {...label} sx={checkboxCheckedColor} />} label="Bolocha" />
    },
    {
      render: () => <FormControlLabel control={<Checkbox {...label} sx={checkboxCheckedColor} />} label="Biscoito" />
    },
    {
      render: () => <FormControlLabel control={<Checkbox {...label} sx={checkboxCheckedColor} />} label="Contra Filé" />
    },
    {
      render: () => <FormControlLabel control={<Checkbox {...label} sx={checkboxCheckedColor} />} label="Linguiça Toscana" />
    },
    {
      render: () => <FormControlLabel control={<Checkbox {...label} sx={checkboxCheckedColor} />} label="Arroz" />
    },
    {
      render: () => <FormControlLabel control={<Checkbox {...label} sx={checkboxCheckedColor} />} label="Feijão" />
    },
    {
      render: () => <FormControlLabel control={<Checkbox {...label} sx={checkboxCheckedColor} />} label="Laranja" />
    },
    {
      render: () => <FormControlLabel control={<Checkbox {...label} sx={checkboxCheckedColor} />} label="Coca-Cola" />
    },
    {
      render: () => <FormControlLabel control={<Checkbox {...label} sx={checkboxCheckedColor} />} label="Gelatina" />
    }
  ]; */
  
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
  
  function handleOpenMessageSaveItem() {
    setOpenMessageSaveItem(true);
  }

  function handleCloseMessageSaveItem() {
    setOpenMessageSaveItem(false);
  }

  function handleOpenMessageErrorItem() {
    setOpenMessageErrorItem(true);
  }

  function handleCloseMessageErrorItem() {
    setOpenMessageErrorItem(false);
  }

  function handleRemoveItem(id: string) {
    console.log('> Remove Item')

    console.log('id:',id);
    console.log('items before:',items);
    items.map(function(item, i) {
      console.log('item.id:',item.id);
      if (id == item.id) {
        items.slice(i, 1);

        setItems([
          ...items
        ]);
      }
    });
    console.log('items before:',items);

  }

  function handleAddNewItem() {
    if (!name) {
      handleOpenMessageErrorItem();
      setTimeout(() => { handleCloseMessageErrorItem() }, 1000);
      return;
    }

    const id = "id" + Math.random().toString(16).slice(2);
    console.log('uniqueId:', uniqueId);

    setItems([
      ...items, 
      {
        id,
        render: () => (
          <Box key={id} className="flex flex-row justify-between w-full items-center overflow-x-hidden pr-[12px]">
            <FormControlLabel className="w-full" control={<Checkbox {...label} sx={checkboxCheckedColor} />} label={name} />
            <Button className="cursor-pointer min-w-0 p-0" onClick={() => handleRemoveItem(id)}>
              <DeleteIcon />
            </Button>
          </Box>
        )
      }
    ]);

    setName('');
    handleOpenMessageSaveItem();
    setTimeout(() => { handleCloseMessageSaveItem() }, 1000);
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
              TransitionComponent: Fade,
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
                {items.map(item => item.render())}
              </Box>

              <Box className="flex flex-row w-full justify-end mt-6">
                <Button className="bg-green-700 p-[8px] min-w-0 rounded-full" variant="contained" color="success" onClick={handleOpenTodoSave}>
                  <AddIcon />
                </Button>
              </Box>
              <Modal
                open={openTodoSave}
                onClose={handleCloseTodoSave}
              >
                <Box sx={styleModalTodoSave} className="flex flex-col gap-[10px]">
                  <CssItemTodoSave fullWidth id="outlined-basic" label="Name" variant="outlined" value={name} onChange={e => setName(e.target.value)} />

                  <Box className="flex flex-row w-full justify-end mt-3">
                    <Button className="bg-green-700 p-[8px] w-full capitalize" variant="contained" color="success" onClick={handleAddNewItem}>
                      Save
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Box>
          </Fade>
        </Modal>
      </div>

      {/* Modals Messages*/}
      <Modal
          open={openMessageSaveItem}
          onClose={handleCloseMessageSaveItem}
        >
          <Box sx={styleModalMessage}>
            <Alert severity="success">Item saved</Alert>
          </Box>
        </Modal>

        <Modal
          open={openMessageErrorItem}
          onClose={handleCloseTodoList}
        >
          <Box sx={styleModalMessage}>
            <Alert severity="warning">Name is blank</Alert>
          </Box>
        </Modal>
    </main>
  )
}


