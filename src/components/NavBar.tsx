import { AppBar, Toolbar, Badge, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import "../styles/navbar.css";
import { toggleCart } from "../redux/cartSlice";

export const NavBar = () => {
  const cartSize = useSelector(
    (state: RootState) => state.cart.cartItem.length
  );

  const dispatch = useDispatch<AppDispatch>()



  return (
    <AppBar className="navbar">
      <Toolbar>
        <Typography variant="h6" sx={{ color: "black" }}>
          Redux-Toolkit TS Cart
        </Typography>
        <Badge
            onClick={()=>dispatch(toggleCart(true))}
          className="gotocart"
          component="button"
          badgeContent={cartSize}
          color="success"
          sx={{ marginLeft: "auto" }}
        >
          <ShoppingCartIcon sx={{ color: "black" }} />
        </Badge>
      </Toolbar>
    </AppBar>
  );
};
