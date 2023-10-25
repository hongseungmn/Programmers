import Header from "./components/Header.js";
import { setPersonalInfo } from "./components/Storage.js";
import HomePage from "./page/HomePage.js";
import SignupPage from "./page/SignupPage.js";
import {init} from "./router.js";

export default function App({ $target}) {
  const $main = document.createElement('main');
  
  this.route = () => {
    const {pathname} = location;
    $main.setAttribute('id','page_content');
    
    if (pathname === '/web') {
      new Header({ $target}).render();
      const urlChange = new CustomEvent('urlChange', { detail: { url:'/web' } })
      document.dispatchEvent(urlChange);
    } 
    $target.appendChild($main);
  }
  document.addEventListener('urlChange',({ detail: { url } }) => {
    console.log('url 변화 감지됨',url);
    $main.innerHTML = '';
    if(url === '/web') {
      //홈페이지 렌더링
      new HomePage({$target : $main}).render();
    }
    else if(url === '/web/signup') {
      //로그인 페이지 렌더링
      new SignupPage({$target : $main}).render();
    }
  });
  //ROUTE_CHANGE 이벤트 발생 시마다 App의 this.route 함수가 호출되게 하는 효과
  init(this.route);
  this.route();

  // 뒤로가기, 앞으로가기 발생 시 popstate 이벤트가 발생합니다.
  window.addEventListener('popstate', this.route);
  //데이터를 불러오는 함수
  this.render = async () => {
    await setPersonalInfo();
  }
  this.render();
}