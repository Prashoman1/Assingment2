import express, { Application, Errback, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { productRouter } from './app/modules/product/product.route'
import { OrderRoute } from './app/modules/order/order.route'
const app:Application = express()

app.use(cors())
app.use(express.json())

// handle syntax error in json middleware
app.use((err:SyntaxError | any, req:Request, res:Response, next:NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ 
      success: false,
      error: 'Invalid JSON' 
    });
  }
  next();
});

// product Route here
app.use('/api/', productRouter);
// order route here
app.use('/api/', OrderRoute);


// home route
app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Assingment API'
  
  });
})



// handle route not found middleware
app.use((req:Request, res:Response, next:NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

export default app