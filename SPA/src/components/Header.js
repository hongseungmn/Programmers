export default function Header({$target}) {
  const $header = document.createElement('div');
  this.$target = $target;
  $header.innerHTML = '';


  this.createElement = ({ divClass, id, text, url }) => {
    const div = document.createElement('div')
    div.setAttribute('class', divClass)

    const span = document.createElement('span')
    span.setAttribute('class', 'menu_name')
    span.setAttribute('id', id)
    span.appendChild(document.createTextNode(text))

    span.addEventListener('click', () => {
      window.history.pushState('', '', url)
      const urlChange = new CustomEvent('urlChange', { detail: { url } })
      document.dispatchEvent(urlChange);
    })

    div.appendChild(span)

    return div
  }

  this.render = () => {
    const header = document.createElement('header');
    const home_menu = this.createElement({ divClass: 'header header_left', id: 'menu_home', text: 'HOME', url: '/web' });
    const signup_menu = this.createElement({ divClass: 'header header_right', id: 'menu_signup', text: 'SIGNUP', url: '/web/signup' });
    header.appendChild(home_menu);
    header.appendChild(signup_menu);
    this.$target.appendChild(header);
  }
}