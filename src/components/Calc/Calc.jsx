import React, {useState, useEffect} from 'react'
import Input from '@mui/material/Input'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import classes from './Calc.module.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {DP,getInflation, DDP} from "../../math"
import Chart from 'react-apexcharts'

const download=(data, filename, type)=> {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

  
  const Calc = ({setObj,obj}) => {
    const [count, setCount] = useState(obj.items.length)
    useEffect(()=>{
        if(count<0){
            return setCount(0)
        }
        if(count>100){
            return setCount(100)
        }
        if (obj.items.length>=count){
            obj.items = obj.items.filter((e,i)=>i<count)
            setObj({...obj})
        }
        else{
            const  n = obj.items.length
            for (let i = n; i<count;i++){
                obj.items.push({
                    r:0,
                    z:0,
                    g:""
                })
            }
            setObj({...obj})
        }
    },[count])
    const _items = obj.items.map((e,i)=>DDP(e.r,e.z,obj.i/100, i))
    const ccd = _items.reduce((a,b)=>a+b,0)
    
    const id = _items.filter(e=>e>0).reduce((a,b)=>a+b,0)/(Math.abs(_items.filter(e=>e<0).reduce((a,b)=>a+b,0))||1)
    const data =[]
    for (let i =0;i <_items.length;i++){
        data.push(
            _items.filter((e,ii)=>ii<=i).reduce((a,b)=>a+b,0).toFixed(4)
        )
    }
    const state = {
          
        series: [{
            name: "Desktops",
            data
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'График окупаемости инвистиций в проект',
            align: 'left'
          },
          grid: {
            row: {
              opacity: 0.5
            },
          },
          xaxis: {
            categories: obj.items.map(e=>e.g),
          }
        },
      
      
      };
    let a =0
    let c = 0
    let x = -1
    for(let i =0;i<data.length-1;i++){
        if(data[i]<0 & data[i+1]>=0){
            c = data[i]
            a=(data[i+1]-c)
            x = -c/a+i+1
            break
        }
    }
    
    return (
        <section className={classes.Calc}>
            <div className='container'>
                <h2 className='subtitle'>Заполните входные параметры</h2>
                <div className={classes.form}>
                    <div className={classes.row}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <OutlinedInput
                            type="text"
                            value={obj.name}
                            onChange={(e)=>{
                                obj.name = e.target.value
                                setObj({...obj})
                            }}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                            'aria-label': 'weight',
                            }}
                        />
                            <FormHelperText id="outlined-weight-helper-text">Название файла</FormHelperText>
                        </FormControl>
                    </div>
                    <div className={classes.row}>
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                            <OutlinedInput
                            type="number"
                            value={count}
                            onChange={(e)=>{
                                if(e.target.value>100)return
                                setCount(parseInt(e.target.value))
                            }}
                            min={0}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                            'aria-label': 'weight',
                            }}
                        />
                            <FormHelperText id="outlined-weight-helper-text">Время реализации проекта, год/месяц</FormHelperText>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                            <OutlinedInput
                            type="number"
                            value={obj.i}
                            onChange={(e)=>{
                                obj.i = e.target.value
                            
                                setObj({...obj})
                            }}
                            min={0}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                            'aria-label': 'weight',
                            }}
                        />
                            <FormHelperText id="outlined-weight-helper-text">Инфляция, %</FormHelperText>
                        </FormControl> 
                        <Button onClick={()=>{
                            download(JSON.stringify(obj),`data_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}.json`,"json")
                        }} variant="contained" color="success" style={{transform:'translateY(-20%)', height:56, marginLeft:10}}>
                            Сохранить
                        </Button> 
                    </div>
                </div>

                <div className={classes.graph}>
                <Chart options={state.options} series={state.series} type="line" height={350} />
                            
                </div>

                <div className={classes.table_wrapper}>
                    <h3 className='disc'>Таблица расчета эффективности инвестиций проекта</h3>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Год/Месяц</TableCell>
                                    <TableCell align="left">Шаг расчёта</TableCell>
                                    <TableCell align="left">Результат</TableCell>
                                    <TableCell align="left">Затраты</TableCell>
                                    <TableCell align="left">Эффект инвестиций (ДП)</TableCell>
                                    <TableCell align="left">Инфляция (Кд)</TableCell>
                                    <TableCell align="left">ДДП</TableCell>
                                    <TableCell align="left">Действие</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                        {obj.items.map((e,i) => (
                            <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell >
                                <TextField value={e.g} onChange={ee=>{
                                    e.g = ee.target.value
                                    setObj({...obj})
                                }}  label="" variant="outlined"/>  
                            </TableCell>
                            <TableCell align="left">{i}</TableCell>
                            <TableCell align="left">
                                <TextField value={e.r} onChange={ee=>{
                                    e.r = ee.target.value
                                    setObj({...obj})
                                }}  label="" variant="outlined"/>  
                            </TableCell>
                            <TableCell align="left">
                                <TextField value={e.z} onChange={ee=>{
                                    e.z = ee.target.value
                                    setObj({...obj})
                                }}  label="" variant="outlined"/>  

                            </TableCell>
                            <TableCell align="left">{DP(e.r,e.z)}</TableCell>
                            <TableCell align="left">{getInflation(obj.i/100, i).toFixed(4)}</TableCell>
                            <TableCell align="left">{DDP(e.r,e.z,obj.i/100, i).toFixed(4)}</TableCell>
                            <TableCell align="left"><Button onClick={()=>{
                                obj.items.splice(i,1)
                                setObj({...obj})
                                setCount(ee=>obj.length)
                            }} color="error">Удалить</Button></TableCell>
                            </TableRow>
                        ))}
                        <TableRow style={{background:'#f1f1f1'}}>
                            <TableCell  align="right"><Button onClick={()=>{
                                obj.items.push({
                                    r:0,
                                    z:0,
                                    g:""
                                })
                                setObj({...obj})
                                setCount(e=>obj.length)
                            }} >Добавить стороку</Button></TableCell>
                            <TableCell  align="right"></TableCell>
                            <TableCell  align="right"></TableCell>
                            <TableCell  align="right"></TableCell>
                            <TableCell  align="right"></TableCell>
                            <TableCell  align="right"></TableCell>
                            <TableCell  align="left">Итог ЧДД: <b>{ccd.toFixed(4)}</b></TableCell>
                            <TableCell  align="left">ИД = <b>{id.toFixed(4)}</b></TableCell>
                        </TableRow>
                        </TableBody>
                        </Table>
                    </TableContainer>
                </div>


                <div className={classes.results}>
                    <p><b>Вывод:</b> поскольку ЧДД = {ccd.toFixed(4)} {ccd>0?">":"<"} 0 и ИД = {id.toFixed(4)}  {id>=1?">":"<"} 1, то проект можно считать {ccd>0?"":"не"} эффективным и {ccd>0?"":"не"} следует рекомендовать к утверждению.</p>
                    {x>-1&&<p>Срок окупаемости составляет {x.toFixed(2)}.</p>}
                </div>        
                
            </div>
        </section>
    )
}
export default Calc