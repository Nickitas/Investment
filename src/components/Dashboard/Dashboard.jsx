
import icon1 from '../../img/icon1.svg'
import icon2 from '../../img/icon2.svg'
import classes from './Dashboard.module.scss'

const block1 = "Выберите сохранённый файл в формате JSON."
const block2 = "Экономическая эффективность инвестиций – это относительная величина, характеризующаяся отношением полезного результата (экономического эффекта) к инвестиционным затратам, обусловившим его получение."


const Dashboard = ({setState,setObj}) => {
    return (
        <section className={classes.Dashboard}>
             <div className='container'>
                 <div className={classes.cards_wrapper}>
                    <div className={classes.card} onClick={()=>{
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
                            }}>
                        <div className={classes.front}>
                            <div className={classes.icon}>
                                <img src={icon2} />
                            </div>
                            <div className={classes.text} >Открыть</div>
                        </div>
                        <div className={classes.back}>
                            {block1}
                        </div>
                    </div>
                    <div className={classes.card} onClick={()=>{
                                setState("start")
                            }}>
                        <div className={classes.front}>
                            <div className={classes.icon}>
                                <img src={icon1} />
                            </div>
                            <div className={classes.text} >Начать</div>
                        </div>
                        <div className={classes.back} >
                            {block2}
                        </div>
                    </div>
                 </div>
             </div>
        </section>
    )
}
export default Dashboard