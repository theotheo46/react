import React from 'react';
import './Form.pcss'
import Input, { InputProps } from '../../components/Input'
import Button from '../Button';
import { NavLink } from 'react-router-dom';
interface FormProps {
    title: string;
    className:string;
    inputs: InputProps[];
    buttonLabel: string;
    onSubmit:(e:React.FormEvent)=>void;
}

const Form :React.FC<FormProps>=({title,className,inputs,buttonLabel,onSubmit})=>{
    const navLink = title==='Регистрация'?{
        path:'/signin',
        title: 'Уже зарегистрированы? Войти'
    }:title==='Войти в профиль'?{
        path:'/signup',
        title: 'Ещё нет аккаунта? Зарегистрируйтесь'
    }:null
    
    return(
        <form onSubmit={onSubmit} className={`form ${className}`} >
            <h1 className='form-title'>{title}</h1>
            {inputs.map((input, key)=>(
            <Input key={key} {...input}/>
            ))}
            {navLink&&<NavLink to={navLink.path}>
              {navLink.title}
            </NavLink>}
            <Button type='submit' width='100%' height='48px'>{buttonLabel}</Button>
        </form>
    )
}

export default Form