export default function ContentTitle({$target, $contentTitle}) {
  this.render = () => {
    const div = document.createElement("div");
    div.setAttribute("class","content_title");

    const h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode($contentTitle));

    div.appendChild(h1);
    $target.appendChild(div);
  }
}