import { button, input, select } from "./Form.js";

export default function SignupView({$target}) {
  this.$target = $target;

  this.render = () => {
    const containerDiv = document.createElement("div");
    containerDiv.setAttribute("id","form_container");
    this.$target.appendChild(containerDiv);
    const form = document.createElement("form");
    form.setAttribute("id","grepp_form");
    containerDiv.appendChild(form);

    input("text","name","이름",true);
    input("email","email","이메일",true);
    input("text","nickname","닉네임",true);

    const roleValList = ["","backend","frontend","fullstack"];
    const roleTxtList = ["직군을 선택해주세요","백엔드","프론트엔드","풀스택"];
    const mbtiValList = ["","ESTP", "ESTJ", "ESFP", "ESFJ", "ENFP", "ENFJ", "ENTP", "ENTJ",
                        "ISTP", "ISTJ", "ISFP", "ISFJ", "INFP", "INFJ", "INTP", "INTJ"];
    const mbtiTxtList = ["mbti를 선택해주세요","ESTP", "ESTJ", "ESFP", "ESFJ", "ENFP", "ENFJ", "ENTP", "ENTJ",
    "ISTP", "ISTJ", "ISFP", "ISFJ", "INFP", "INFJ", "INTP", "INTJ"];

    select("role",roleValList,roleTxtList,true);
    select("mbti",mbtiValList,mbtiTxtList);

    button("submit","등록");
    form.addEventListener("submit",(e) => {
      const personalInfo = JSON.parse(localStorage.getItem("personalInfo"));
      e.preventDefault();
      console.log(e);
      let nameVal = e.target.name.value;
      let emailVal = e.target.email.value;
      let nickVal = e.target.nickname.value;
      let roleVal = e.target.role.value;
      let mbtiVal = e.target.mbti.value;

      const submitInfo = {
        "name" : nameVal,
        "email" : emailVal,
        "nickname" : nickVal,
        "role" : roleVal,
        "mbti" : mbtiVal,
        "id" : personalInfo.length
      };
      var isOk = personalInfo.some(info=> {
        return info.name===submitInfo.name && info.email === submitInfo.email && info.nickname === submitInfo.nickname;
      });
      console.log(isOk);
      if(!isOk) {
        alert("성공적으로 등록되었습니다");
        personalInfo.push(submitInfo);
        localStorage.setItem("personalInfo",JSON.stringify(personalInfo));
        window.history.pushState('', '', "/web/signup");
        const urlChange = new CustomEvent("urlChange",{detail: { url: "/web/signup" }});
        document.dispatchEvent(urlChange);
      } else {
        alert("이미 등록된 사용자입니다");
        window.history.pushState('', '', "/web/signup");
        const urlChange = new CustomEvent("urlChange",{detail: { url: "/web/signup" }});
        document.dispatchEvent(urlChange);
      }
      
    });
  }

  
}