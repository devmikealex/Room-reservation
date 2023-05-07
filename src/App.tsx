import {
    Button,
    Card,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
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

import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { ruRU } from '@mui/x-date-pickers/locales'
import 'dayjs/locale/ru'

function App() {
    const [tower, setTower] = useState('')
    const [level, setLevel] = useState('')
    const [room, setRoom] = useState('')
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
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
            startTime,
            endTime,
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

        setStartTime(null)
        setEndTime(null)

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
                    maxWidth: 550,
                    py: { xs: 2, sm: 5 },
                    px: { xs: 2, sm: 6 },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    margin: '0 auto',
                    boxShadow: 2,
                }}
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <Typography variant='h5'>Выбор переговорной комнаты</Typography>
                <FormControl fullWidth>
                    <InputLabel id='tower-select-label'>Выберите башню *</InputLabel>
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
                    <InputLabel id='level-select-label'>Выберите нужный этаж *</InputLabel>
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
                    <InputLabel id='room-select-label'>Выберите комнату *</InputLabel>
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

                <Typography variant='subtitle1'>Забронировать дату и время</Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <DateTimePicker
                                label='Время начала'
                                ampm={false}
                                disablePast={true}
                                value={startTime}
                                onChange={(newValue) => setStartTime(newValue)}
                                sx={{ width: '100%' }}
                                // openTo='year'
                                slotProps={{
                                    textField: {
                                        required: true,
                                    },
                                    // tabs: {
                                    //     hidden: false,
                                    // },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DateTimePicker
                                label='Время окончания'
                                ampm={false}
                                disablePast={true}
                                value={endTime}
                                onChange={(newValue) => setEndTime(newValue)}
                                sx={{ width: '100%' }}
                                slotProps={{
                                    textField: {
                                        required: true,
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </LocalizationProvider>
                {/* <Divider /> */}

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

                {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <DateTimePicker sx={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DateTimePicker sx={{ width: '100%' }} />
                        </Grid>
                    </Grid>
                </LocalizationProvider> */}
            </Card>
        </div>
    )
}

export default App
