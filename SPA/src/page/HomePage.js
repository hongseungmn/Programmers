import ContentTitle from "../components/ContentTitle.js";
import CardPage from "./CardPage.js";

export default function HomePage({ $target}) {
  const $page = document.createElement('div');
  $page.className = 'HomePage';

  this.render = () => {
    $target.appendChild($page);
    const title = new ContentTitle({$target:$target, $contentTitle : "Great PeoPle"});
    title.render();
    const cardPage = new CardPage({$target});
    cardPage.render();
  }


  this.setState = (nextState) => {
    this.state = nextState;
  }
  
}