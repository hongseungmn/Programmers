import SignupView from "../components/SignUpView.js";
import ContentTitle from "../components/ContentTitle.js";

export default function SignupPage({ $target}) {
  const $page = document.createElement('div');
  $page.className = 'SignupPage';


  this.render = () => {
    const title = new ContentTitle({$target:$target, $contentTitle : "Sign Up, Great PeoPle"});
    title.render();
    $target.appendChild($page);
    const signupView = new SignupView({$target: $page});
    signupView.render();
  }
  this.setState = (nextState) => {
    this.state = nextState;
  }
  
}