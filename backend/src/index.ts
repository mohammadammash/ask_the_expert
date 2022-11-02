import express, {Express, Request, Response} from "express";
const app: Express = express();

app.get('/',(req: Request, res: Response)=>{
    res.send('Typescript runs well');
})

app.listen(4321, ()=>{
    console.log('Running on 4321');
});