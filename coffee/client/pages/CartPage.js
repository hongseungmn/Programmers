import { request } from "../api.js";
import Cart from "../components/Cart.js";
import { routeChange } from "../router.js";
import { getItem } from "../utils/storage.js";

export default function CartPage({$target}) {
  const $page = document.createElement('div');
  $page.className = 'CartPage';
  $page.innerHTML = '<h1>장바구니</h1>';
  const cartData = getItem("products_cart",[]);
  this.state = {
    products: null
  };
  let cartComponent = null;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    if(cartData.length === 0) {
      alert("장바구니가 비었습니다");
      routeChange("/");
    }
    else {
      $target.appendChild($page);
      if(this.state.products && !cartComponent) {
        cartComponent = new Cart({
          $target : $page,
          initialState : this.state.products
        });
      }
    }
  };

  this.fetchProducts = async () => {
    /*
    cartData 배열의 각 항목에 대한 비동기 작업을 수행합니다. 
    map 함수를 사용하여 cartData 배열을 순회하며 각 항목에 대한 작업을 정의합니다.
    async 함수를 사용하여 비동기 작업을 정의합니다. 
    이 함수는 await 키워드를 사용하여 다른 비동기 작업을 호출하거나 실행합니다.
    Promise.all 메서드는 비동기 작업을 병렬로 실행하고, 모든 작업이 완료될 때까지 대기합니다.
    모든 비동기 작업이 완료되면, Promise.all은 각 작업의 결과를 배열로 반환합니다. 이 결과 배열은 product 변수에 저장됩니다.
    */
    const products = await Promise.all(cartData.map(async (cartItem) => {
      const product = await request(`/products/${cartItem.productId}`);
      const selectedOption = product.productOptions.find(option => option.id === cartItem.optionId);
      return {
        imageUrl : product.imageUrl,
        productName : product.name,
        quantity : cartItem.quantity,
        productPrice : product.price,
        optionName : selectedOption.name,
        optionPrice : selectedOption.price
      }
    }));
    this.setState({products});
    console.log("product : ",products);
  }
  this.fetchProducts();
}