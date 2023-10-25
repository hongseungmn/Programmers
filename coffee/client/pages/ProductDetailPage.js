import { request } from "../api.js";
import ProductDetail from "../components/ProductDetail.js";

export default function ProductDetailPage({$target, productId}) {
  this.state = {
    productId,
    product: null
  }
  //상태 갱신
  this.setState = (nextState) =>{
    this.state = nextState;
    this.render();
  }

  const $page = document.createElement('div');
  $page.className = 'ProductDetailPage';
  $page.innerHTML = '<h1>상품 정보</h1>';
  this.render = () => {
    if(!this.state.product) {
      $target.innerHTML = 'Loading...';
    }
    else {
      $target.innerHTML = '';
      $target.appendChild($page);
      //ProductDetail 렌더링하기 -> 상태 변경
      console.log('ProductDetail 렌더링하기 : ',this.state);
      new ProductDetail({
        $target : $page,
        initialState : {
          product : this.state.product,
          selectedOptions : []
        }
      });
    }
  }
  this.fetchProduct = async () => {
    const {productId} = this.state;
    const product = await request(`/products/${productId}`);
    //구조분해 후 값 갱신
    this.setState({
      ...this.state,
      product
    });
  }
  this.fetchProduct();
}