import {
  CartStyled,
  CloseButton,
  Title,
  ListStyled,
  Total,
  CartFooter,
} from "./index.styled";
import { BsCartFill } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import activateMenuButton from "../../utils/functions/activateMenuButton";
import { useMenu } from "../../providers/MenuProvider";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import ButtonStyled from "../../styles/Button.styled";
import ProductCard from "./components/ProductCard";
import { useCart } from "../../providers/CartProvider";
import { calculateTotalPrice } from "../../utils/functions/calculateTotalPrice";

const CartPage = () => {
  const navigate = useNavigate();
  const { localCart, setLocalCart } = useCart();
  const { statusButton, setStatusButton } = useMenu();
  const handleCloseButtonClick = () => {
    setStatusButton(activateMenuButton("home"));
    navigate("/");
  };
  return (
    <>
      <CartStyled active={statusButton.cart}>
        {statusButton.cart && (
          <>
            {" "}
            <Title>
              <BsCartFill /> <span>Meu carrinho</span>{" "}
              <CloseButton onClick={() => handleCloseButtonClick()}>
                <RiCloseLine />
              </CloseButton>
            </Title>
            <ListStyled isLoading={!localCart.length}>
              {localCart.length ? (
                localCart.map(({ product, quantity }) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    quantity={quantity}
                  />
                ))
              ) : (
                <p>Carrinho vazio :(</p>
              )}
            </ListStyled>
            <CartFooter>
              {localCart.length ? (
                <>
                  <Total>
                    <span>Total</span>
                    <span>R$ {calculateTotalPrice(localCart)}</span>
                  </Total>
                  <ButtonStyled
                    width={"100%"}
                    height="2.8rem"
                    fontSize={"1.5rem"}
                  >
                    <Link to="/checkout">Finalizar compra</Link>
                  </ButtonStyled>
                </>
              ) : (
                ""
              )}
            </CartFooter>
          </>
        )}
      </CartStyled>
      <Footer />
    </>
  );
};

export default CartPage;
