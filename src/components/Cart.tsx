import {useState} from "react";
import {
  Drawer,
  Typography,
  Stack,
  IconButton,
  List,
  ListItem,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import {
  incrementItem,
  decrementItem,
  toggleCart,
  removeFromCart,
  resetCart
} from "../redux/cartSlice";
import "../styles/cart.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

export const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.cartItem);
  const dispatch = useDispatch<AppDispatch>();
  const isCartOpen = useSelector((state: RootState) => state.cart.cartOpen);

  const [errorMsg, setErrorMsg] = useState(false)
  const [infoMsg, setInfoMsg] = useState(false)

  const cartTotal = cart
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0)
    .toFixed(2);

  return (
    <Drawer
    id="cart-drawer"
      PaperProps={{ sx: { width: "60vw", p: 5 } }}
      anchor="right"
      open={isCartOpen}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Cart</Typography>
        <IconButton
          onClick={() => dispatch(toggleCart(false))}
          className="closecart"
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <List>
        {cart.length <= 0 && (
          <Typography sx={{ color: "red" }} variant="h5">
            Cart is Empty!
          </Typography>
        )}
        {cart.map((item) => (
          <ListItem key={item.id}>
            <Stack id="cartitemwrapper" direction="row" spacing={5} alignItems='center'>
              <img className="cartimg" src={item.image} alt={item.title} />
              <Stack spacing={3}>
                <Typography sx={{ fontWeight: "bold" }} variant="body2" >
                  {item.title}
                </Typography>
                <Typography variant="body2">
                  Price: ${(item.price * item.quantity).toFixed(2)}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconButton
                    onClick={() => dispatch(incrementItem(item.id))}
                    className="quantitybtn"
                  >
                    <AddIcon />
                  </IconButton>
                  <Typography variant="body2">{item.quantity}</Typography>
                  <IconButton
                    onClick={() => dispatch(decrementItem(item.id))}
                    className="quantitybtn"
                  >
                    <RemoveIcon />
                  </IconButton>
                </Stack>
              </Stack>
              <IconButton className="deletebtn" onClick={()=>{dispatch(removeFromCart(item.id));setErrorMsg(true)}} >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </ListItem>
        ))}
      </List>
      {cart.length >= 1 && (
        <Stack
        className="checkout"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Total: ${cartTotal}
          </Typography>
          <Button onClick={()=>{dispatch(resetCart());setInfoMsg(true)}} size="small" variant="contained" color="success">
            Check Out!
          </Button>
        </Stack>
      )}
      <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}}  open={errorMsg} onClose={()=>setErrorMsg(false)} autoHideDuration={800} >
        <Alert variant="filled" severity="error" >Product removed successfully!</Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}}  open={infoMsg} onClose={()=>setInfoMsg(false)} autoHideDuration={1000} >
        <Alert variant="filled" severity="info" >Purchase completed successfully!</Alert>
      </Snackbar>
    </Drawer>
  );
};
