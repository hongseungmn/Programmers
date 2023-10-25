// ProductListPage.js
import {request} from "../api.js"
import ProductList from "../components/ProductList.js"

export default function ProductListPage({ $target }) {
  const $page = document.createElement('div')
  $page.className = 'ProductListPage'

  $page.innerHTML = '<h1>상품 목록</h1>'
  //렌더링을 수행한다
  this.render = () => {
    $target.appendChild($page)
  }
  //state가 변경되면 갱신 작업을 수행한다
  this.setState = (nextState) => {
    this.state = nextState;
  }
  //데이터를 불러온다 -> state 변경, productList(자식 state도 변경)
  const fetchProducts = async () => {
    const products = await request('/products')
    this.setState(products);
    productList.setState(products);
  }
  //ProductList 생성
  const productList = new ProductList({
    $target: $page,
    initialState: this.state
  });
  //페이지 생성 시 API 요청해오도록 하는 처리
  fetchProducts();
}