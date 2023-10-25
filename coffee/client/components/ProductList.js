import { routeChange } from "../router.js";

//ProductList.js
export default function ProductList({$target, initialState}) {
  const $productList = document.createElement('ul');
  $target.appendChild($productList);
  //초기 아무것도 없는 상태로 초기화
  this.state = initialState;
  //부모에서 state를 변경하면 수행
  this.setState = (nextState) => {
    console.log('productList.js의 setState호출 : ',nextState);
    this.state = nextState;
    this.render();
  }
  //state가 비어있는 초기상태인 경우 return
  this.render = () => {
    if(!this.state) {
      return;
    }
    $productList.innerHTML = `
      ${this.state.map(product =>
        `
          <li class="Product" data-product-id="${product.id}">
            <img src = "${product.imageUrl}">
            <div class="product__info">
              <div>${product.name}</div>
              <div>${product.price}</div>
            </div>
          </li>
        `
        ).join('')
      }
    `
  }
  this.render();
  $productList.addEventListener('click',(e) => {
    const $li = e.target.closest('li');
    const {productId} = $li.dataset;

    if(productId) {
      routeChange(`/products/${productId}`);
    }
  });
}