import {
    Button,
    Card,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import 'dayjs/locale/ru'
import { Dayjs } from 'dayjs'

function App() {
    const [tower, setTower] = useState('')
    const [level, setLevel] = useState('')
    const [room, setRoom] = useState('')
    const [startTime, setStartTime] = useState<Dayjs | null>(null)
    const [endTime, setEndTime] = useState<Dayjs | null>(null)
    const [comment, setComment] = useState('')

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
        const obj = {
            tower,
            level,
            room,
            startTime,
            endTime,
            comment,
        }
        console.log('🚀JSON:', JSON.stringify(obj))
        document.querySelector('pre')!.textContent = JSON.stringify(obj, null, 2)
    }

    function handleReset() {
        console.log('handle-Reset')
        setTower('')
        setLevel('')
        setRoom('')
        setStartTime(null)
        setEndTime(null)
        setComment('')
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
                gutterBottom
                maxWidth={600}
                mx='auto'
            >
                Бронирование переговорной комнаты B2B
            </Typography>

            <Card
                component='form'
                sx={{
                    maxWidth: 550,
                    py: { xs: 2, sm: 4 },
                    px: { xs: 2, sm: 5 },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.4,
                    margin: '0 auto',
                    boxShadow: 2,
                }}
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <Typography variant='h5' gutterBottom>Выбор переговорной комнаты</Typography>

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
                    <InputLabel id='level-select-label'>
                        Выберите нужный этаж *
                    </InputLabel>
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
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <DateTimePicker
                                label='Время начала'
                                ampm={false}
                                disablePast={true}
                                value={startTime}
                                onChange={(newValue) => setStartTime(newValue)}
                                sx={{ width: '100%' }}
                                slotProps={{
                                    textField: {
                                        required: true,
                                    },
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

                <TextField
                    label='Дополнительная информация'
                    variant='outlined'
                    multiline
                    minRows={2}
                    maxRows={4}
                    fullWidth
                    value={comment}
                    onChange={handleCommentChange}
                />

                <Typography variant='body2' align='right' color='text.secondary'>* отмеченные поля обязательны для заполнения</Typography>

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
