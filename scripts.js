
var MenuItem = document.querySelectorAll('.item-menu')

function selectLink() {
    MenuItem.forEach((item) =>
        item.classList.remove('ativo')
    )
    this.classList.add('ativo')
}

MenuItem.forEach((item) =>
    item.addEventListener('click', selectLink)
)

//Expandir Menu

var btnExp = document.querySelector('btn-exp')
var menuSide = document.querySelector('.menu-lateral')

btnExp.addEventListener('click', function () {
    menuSide.classList.toggle('abrir')
})