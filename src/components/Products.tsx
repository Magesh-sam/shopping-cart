import {useState} from 'react'
import {useDispatch, useSelector} from'react-redux';
import type {RootState, AppDispatch} from '../redux/store'
import { addToCart } from '../redux/cartSlice';
import { products } from '../products';
import '../styles/products.css'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";



import { Card, CardMedia, CardContent, Button,Typography, Stack, Container, Rating, Snackbar, Alert, Box} from '@mui/material';


export const Products = () => {

  const dispatch = useDispatch<AppDispatch>()
  const [addMsg, setAddMsg] = useState(false)


  return (
   <Box sx={{width:'1200px'}} className='products' component='section'  >
      {products.map(product =>(
        <Card key={product.id} className='productcard' raised >
            <CardMedia className='productimg' component='img' image={product.image} alt={product.title}  />
            <CardContent className='productdesc'>
                <Typography title={product.title} noWrap variant='h6' sx={{fontWeight:'bold'}} >{product.title}</Typography>
                <Stack direction='row' spacing={2}>  <Typography variant='h6' >${product.price}</Typography> <Rating readOnly value={product.rating.rate} /> </Stack>
                <Button onClick={()=>{dispatch(addToCart(product));setAddMsg(true)}} className='cartbtn' variant='contained' endIcon={<ShoppingCartIcon/>} >Add to Cart</Button>
            </CardContent>
        </Card>
      ))}
        <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={addMsg} autoHideDuration={500} onClose={()=>setAddMsg(false)} >
          <Alert variant='filled' severity='success' >Added to cart!</Alert>
        </Snackbar>
   </Box>
  )
}
