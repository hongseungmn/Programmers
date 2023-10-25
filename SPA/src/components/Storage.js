export const setPersonalInfo = async() => {
  const response = await fetch("/data/new_data.json");
  const data = await response.json();
  if(!localStorage.getItem('personalInfo')) {
    data.forEach((item,index)=> {
      item.id = index;
    });
    console.log(data);
    localStorage.setItem('personalInfo',JSON.stringify(data));
  }
};

export const getNewPersonalInfo = async() => {
  
}

export const updateFlippedPerson = (idx) => {
  //
  if(!localStorage.getItem('flippedIdx')) {
    localStorage.setItem('flippedIdx',JSON.stringify(new Array(idx)));
  }
  else {
    const data = JSON.parse(localStorage.getItem('flippedIdx'));
    //로컬 스토리지에 저장된 경우 -> 제거(다시 뒤집힘)
    //로컬 스토리지에 저장되지 않은 경우 -> 추가(뒤집힘)
    if(!data.includes(idx)) data.push(idx);
    else {
      const index = data.indexOf(idx);
      if (index !== -1) {
        data.splice(index, 1);
      }
    }
    //data 정렬
    data.sort();
    localStorage.setItem('flippedIdx',JSON.stringify(data));
    console.log(data);
  }
}

