
import React,{lazy, Suspense, useState, useEffect} from 'react'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import { defaultValue } from './math'

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'))
const Calc = lazy(()=>import('./components/Calc/Calc'))

const App = () => {
    const [state, setState] = useState("")
    const [obj, setObj] = useState(defaultValue)
    return (
        <main>
            <Nav setState={setState}  setObj={setObj} state={state}/>
            {state.length==0&&<Suspense fallback={<div className='loading_animation'></div>}>
                <Dashboard setState={setState} setObj={setObj}/>
            </Suspense>}
            {state.length>0&&<Suspense fallback={<div className='loading_animation'></div>}>
                <Calc obj={obj} setObj={setObj}/>
            </Suspense>}
            <Footer/>
        </main>
    )
}
export default App