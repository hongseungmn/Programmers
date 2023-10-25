import { cardDiv, cardPlane } from "./Card.js";

export default function CardView({$target}) {

  this.render = () => {
    const containerDiv = document.createElement('div');
    containerDiv.setAttribute('id','cards_container');
    $target.appendChild(containerDiv);

    const personalInfo =JSON.parse(localStorage.getItem("personalInfo"));
    for(var i=0;i<personalInfo.length;i++) {
      const card = cardDiv(i);
      //로컬 스토리지의 값을 가져와 만약 뒤집힌 상태라면 클래스 변경
      if(localStorage.getItem('flippedIdx')){
        const data = JSON.parse(localStorage.getItem('flippedIdx'));
        if(data.includes(String(i))) {
          card.classList.add('is-flipped');
        }
      }
      card.appendChild(cardPlane('front',personalInfo[i].nickname));
      card.appendChild(cardPlane('back',personalInfo[i].mbti));
      containerDiv.appendChild(card);
    }
    this.infiniteScroll(containerDiv, personalInfo);
  }
  //무한 스크롤 구현하기
  this.infiniteScroll = (containerDiv,personalInfo) => {
    const target = containerDiv.lastChild;
    const io = new IntersectionObserver((entry, observer)=> {
      if(entry[0].isIntersecting) {
        console.log("이벤트 발생");
        for(var i=0;i<personalInfo.length;i++) {
          const card = cardDiv(i);
          //로컬 스토리지의 값을 가져와 만약 뒤집힌 상태라면 클래스 변경
          if(localStorage.getItem('flippedIdx')){
            const data = JSON.parse(localStorage.getItem('flippedIdx'));
            if(data.includes(String(i))) {
              card.classList.add('is-flipped');
            }
          }
          card.appendChild(cardPlane('front',personalInfo[i].nickname));
          card.appendChild(cardPlane('back',personalInfo[i].mbti));
          containerDiv.appendChild(card);
        }
      }
      }, {
          threshold: 0.7
    });
    io.observe(target);
  };
}