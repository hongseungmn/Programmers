import { routeChange } from "../router.js";
import { getItem, setItem } from "../utils/storage.js";

export default function SelectedOptions({$target,initialState}) {
  const $component = document.createElement('div');
  $target.appendChild($component);

  this.state = initialState;
  console.log("SelectedOptions 초기화시  this.render : ", this.state);
  this.setState = (nextState) => {
    this.state = nextState;
    //console.log('SelectedOptions의 this.setState -> nextState : ',nextState);
    this.render();
  }

  this.getTotalPrice = () => {
    const {product, selectedOptions} = this.state;
    const {price : productPrice} = product;
    return selectedOptions.reduce(
      (acc,option) => acc + (option.optionPrice + productPrice) * option.quantity
    ,0)
  }

  this.render = () => {
    //console.log("selectedOptions 페이지 렌더링 됨");
    //console.log("SelectedOptions this.render : ", this.state);
    const { product, selectedOptions = [] } = this.state;
    //console.log("SelectedOptions product : ",product);
    $component.innerHTML = `
    <h3>선택된 상품</h3>
    <ul>
      ${selectedOptions.map(selectedOption => `
        <li>
          ${selectedOption.optionName} ${product.price + selectedOption.optionPrice}원
          <input type="text" data-optionId="${selectedOption.optionId}" value="${selectedOption.quantity}"/>
          <div class="deleteProduct" data-optionId="${selectedOption.optionId}" style="cursor:pointer;">X</div>
        </li>
        `).join('')}
        </ul>
        <div class="ProductDetail__totalPrice">${this.getTotalPrice()}원</div>
        <button class="OrderButton">주문하기</button>
      `;
    const deleteProductElements = document.querySelectorAll(".deleteProduct");
    deleteProductElements.forEach(deleteButton=> {
      deleteButton.addEventListener("click",()=> {
        if(confirm("삭제하시겠습니까?")) {
          const optionId = parseInt(deleteButton.getAttribute('data-optionId'));
          console.log("optionId : ",optionId);
          const deleteOptionIndex = selectedOptions.findIndex(option => option.optionId === optionId);
          console.log("삭제될 옵션인덱스: ",deleteOptionIndex);
          selectedOptions.splice(deleteOptionIndex,1);
          this.render();
        }
      }); 
    });
  }
  this.render();

  $component.addEventListener("change", e=> {
    if(e.target.tagName === 'INPUT') {
      try {
        const changedInputValue = parseInt(e.target.value);
        const nextSelectedOptions = [...this.state.selectedOptions];
        console.log(typeof changedInputValue);
        if(typeof changedInputValue === 'number') {
          console.log('변경된 수량 : '+changedInputValue);
          const {product} = this.state;
          const optionId = parseInt(e.target.dataset.optionid);
          const option = product.productOptions.find(option => option.id === optionId);
          const selectedOptionIndex = nextSelectedOptions.findIndex(selectedOption=> selectedOption.optionId === optionId);
          nextSelectedOptions[selectedOptionIndex].quantity = option.stock >= changedInputValue ? changedInputValue : option.stock;
          this.setState({
            ...this.state,
            selectedOptions : nextSelectedOptions
          });
        }
        else {
          console.log("숫자를 입력해주세요");
        }
        this.setState(this.state);
      }
      catch (e){
        console.log(e);
      }
    }
  });

  $component.addEventListener("click",(e) => {
    const {selectedOptions} = this.state;
    if(e.target.className === 'OrderButton') {
      const cartData = getItem("products_cart",[]);
      setItem("products_cart",cartData.concat(selectedOptions.map(selectedOption=> ({
        productId : selectedOption.productId,
        optionId : selectedOption.optionId,
        quantity : selectedOption.quantity
      }))));
      routeChange("/cart");
    }
  });
}