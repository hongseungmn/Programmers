import { updateFlippedPerson } from "./Storage.js";

export const cardDiv = (index) => {
  const card_div = document.createElement('div');
  card_div.setAttribute('idx',index);
  card_div.setAttribute('class','card');  
  //선택될 때. 로컬 스토리지에 값 저장
  card_div.addEventListener('click',(e)=> {
    card_div.classList.toggle("is-flipped");
    // 클릭된 요소의 부모 요소 가져오기
    const parentElement = e.target.parentNode;
    updateFlippedPerson(parentElement.getAttribute('idx'));
  });
  return card_div;
}

export const cardPlane = (side,data) => {
  const cardPlane_div = document.createElement('div');
  cardPlane_div.setAttribute('class','card_plane card_plane--'+side);
  cardPlane_div.appendChild(document.createTextNode(data));
  return cardPlane_div;
}