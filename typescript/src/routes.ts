import {Response, Request} from 'express';
import  createUser  from './services/CreateUser';

export function helloWorld(request:Request, response:Response) {
    
    const user = createUser({
         email: 'faro.anderson@gmail.com',
         password: '1234567',
         techs: [
             'Node js',
             'Node js',
             'Node js'
         ]   
    })
    return response.json({message: 'Hello World'})

}