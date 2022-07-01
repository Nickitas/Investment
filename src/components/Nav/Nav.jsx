import React from 'react'
import logo from '../../favicon.svg'
import classes from './Nav.module.scss'
import { defaultValue } from '../../math'

const Nav = ({setState,setObj, state}) => {
    return (
        <nav className={classes.nav}>
            <div className='container'>
                <div className={classes.nav_row}>
                    <div onClick={()=>{
                        setObj({...defaultValue})
                        setState("")
                    }} className={classes.logo}>
                        <div href='/'>
                            <img className={classes.logo_img} src={logo} />
                        </div>
                    </div>
                    {state.length==0? <div className={classes.btn} onClick={()=>{
                        setState("start")
                    }}>Начать</div>
                    :
                    <div className={classes.btn} onClick={()=>{
                        const block = document.createElement("input")
                        block.type ="file"
                        block.accept="application/JSON"
                        block.onchange=()=>{
                            setState("start")
                            if(block.files.length==0) return
                            const file = block.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.readAsText(file, "UTF-8");
                                reader.onload =  (evt)=> {
                                    setObj(JSON.parse(evt.target.result))
                                }
                            }
                        }
                        block.click()
                    }}>Открыть</div>}
                </div>
            </div>
        </nav>
    )
}
export default Nav