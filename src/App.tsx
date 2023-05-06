import {
    Button,
    Card,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextareaAutosize,
    TextField,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { ChangeEvent, useRef, useState } from 'react'

function App() {
    const [tower, setTower] = useState('')
    const [level, setLevel] = useState('')
    const [room, setRoom] = useState('')
    const [comment, setComment] = useState('')
    // const commentRef = useRef<HTMLTextAreaElement>(null)

    const handleTowerChange = (event: SelectChangeEvent) => {
        setTower(event.target.value)
    }

    const handleLevelChange = (event: SelectChangeEvent) => {
        setLevel(event.target.value)
    }

    const handleRoomChange = (event: SelectChangeEvent) => {
        setRoom(event.target.value)
    }

    const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value)
    }

    function handleSubmit(e: React.MouseEvent) {
        // e.preventDefault()
        const json = JSON.stringify({
            tower,
            level,
            room,
            comment,
            // comment: commentRef.current!.value,
        })
        console.log('🚀 json:', json)
    }

    function handleReset() {
        console.log('handle-Reset')
        // TODO validate
        setTower('')
        setLevel('')
        setRoom('')

        setComment('')
        // commentRef.current!.value = '' // TODO переделать под стэйт
    }

    const levelItems = []
    for (let index = 3; index <= 27; index++) {
        levelItems.push(
            <MenuItem key={index} value={index}>
                Этаж {index}
            </MenuItem>
        )
    }

    const roomItems = []
    for (let index = 1; index <= 10; index++) {
        roomItems.push(
            <MenuItem key={index} value={index}>
                Комната {index}
            </MenuItem>
        )
    }

    return (
        <div className='App'>
            <Typography
                variant='h4'
                component='h1'
                align='center'
                mb={2}
                maxWidth={600}
                mx='auto'
            >
                Бронирование переговорной комнаты B2B
            </Typography>

            <Card
                component='form'
                sx={{
                    maxWidth: 500,
                    py: 5,
                    px: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    margin: '0 auto',
                    boxShadow: 2
                }}
                onSubmit={(e)=>{
                    e.preventDefault();
                }}
            >
                <Typography variant="h5">Выбор переговорной комнаты</Typography>

                <FormControl fullWidth>
                    <InputLabel id='tower-select-label'>Выберите башню</InputLabel>
                    <Select
                        labelId='tower-select-label'
                        id='tower-select'
                        label='Выберите башню'
                        required
                        value={tower}
                        onChange={handleTowerChange}
                    >
                        <MenuItem value={'A'}>Башня А</MenuItem>
                        <MenuItem value={'B'}>Башня Б</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id='level-select-label'>Выберите нужный этаж'</InputLabel>
                    <Select
                        labelId='level-select-label'
                        id='level-select'
                        label='Выберите нужный этаж'
                        required
                        value={level}
                        onChange={handleLevelChange}
                        MenuProps={{ PaperProps: { sx: { maxHeight: 350 } } }}
                    >
                        {levelItems}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id='room-select-label'>Выберите комнату'</InputLabel>
                    <Select
                        labelId='room-select-label'
                        id='room-select'
                        label='Выберите комнату'
                        required
                        value={room}
                        onChange={handleRoomChange}
                    >
                        {roomItems}
                    </Select>
                </FormControl>

                {/* выбор даты и интервала времени (в произвольном виде, например выпадающие списки, data-picker) */}
DATE
                <TextField
                    label='Дополнительная информация'
                    variant='outlined'
                    multiline
                    minRows={2}
                    maxRows={4}
                    fullWidth
                    value={comment}
                    // onChange={(e) => {
                    //     return e.target.value
                    // }}
                    onChange={handleCommentChange}
                    // inputRef={commentRef}
                    // InputLabelProps={{ shrink: commentRef.current.value }}
                />

                <Button variant='contained' type='submit' onClick={handleSubmit}>
                    Отправить
                </Button>

                <Button variant='outlined' type='reset' onClick={handleReset}>
                    Очистить
                </Button>
            </Card>
        </div>
    )
}

export default App
