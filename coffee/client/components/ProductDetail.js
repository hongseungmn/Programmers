import SelectedOptions from "./SelectedOptions.js";

export default function ProductDetail({$target, initialState}) {
  const $productDetail = document.createElement('div');
  $productDetail.className = 'ProductDetail';

  $target.appendChild($productDetail);
  //state 값 초기화
  this.state = initialState;
  let selectedOptions = null;

  //setState 함수로 값 설정
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();

    if(selectedOptions) {
      selectedOptions.setState({
        ...this.state,
        selectedOptions : this.state.selectedOptions
      });
    }
  }

  this.render = () => {
    if(!this.state.product) {
      return;
    }
    else {
      const {product} = this.state;
      console.log('productDetail this.state : %o',this.state);
      $productDetail.innerHTML = `
      <img src="${product.imageUrl}">
      <div class="ProductDetail__info">
        <h2>${product.name}</h2>
        <div class="ProductDetail__price">${product.price}원~</div>
        <select>
          <option>선택하세요.</option>
          ${product.productOptions.map(option =>
            `
              <option value="${option.id}" ${option.stock === 0 ? 'disabled' : ''}>
                ${option.stock === 0 ? '(품절) ' : ''}${product.name} ${option.name} ${option.price > 0 ? `(+${option.price}원)` : ''}
              </option>
            `).join('')}
        </select>
        <div class='ProductDetail__selectedOptions'></div>
      </div>
        `;
      console.log('ProductDetail.js state : %o',this.state);
      selectedOptions = new SelectedOptions({
        $target : $productDetail.querySelector('.ProductDetail__selectedOptions'),
        initialState : {
          product : this.state.product,
          selectedOptions : this.state.selectedOptions
        }
      })
    }  
  }
  this.render();
  
  //옵션 변경시 이벤트 바인딩
  $productDetail.addEventListener('change', (e) => {
    if(e.target.tagName === 'SELECT') {
      const selectedOptionId = parseInt(e.target.value);
      const {product,selectedOptions} = this.state;
      const option = product.productOptions.find(option => option.id === selectedOptionId);
      const selectedOption = selectedOptions.find(selectedOption => selectedOption.optionId === selectedOptionId);
      console.log('selectedOption : ',selectedOption);
      if(option && !selectedOption) {
        const nextSelectedOptions = [
          ...selectedOptions,
          {
            productId : product.id,
            optionId : option.id,
            optionName: option.name,
            optionPrice: option.price,
            quantity: 1
          }
        ]
        this.setState({
          ...this.state,
          selectedOptions:nextSelectedOptions
        });
      }
    }
  })
}