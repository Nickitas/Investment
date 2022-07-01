import React from 'react'
import classes from './Footer.module.scss'

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className='container'>
                    <div className={classes.footer_row}>
                        <div className={classes.copywrite}>
                            <strong>© ДГТУ Кафедра "ВСиИБ".</strong> Разработано в 2022 - {new Date().toJSON().slice(0,4)}. Все права защищены
                        </div>
                        <div className={classes.authors}>
                            Сreated by:
                            <div className={classes.names}>
                                <p>
                                    <a href='https://vk.com/id180302602'> KODATSKY Nickita</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        </footer>
    )
}
export default Footer