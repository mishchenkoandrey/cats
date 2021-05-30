$(function () {
  $(window).scroll(function() {
    if($(this).scrollTop() != 0) {
      $('.go-to-top-wrap').fadeIn();
    } else {
      $('.go-to-top-wrap').fadeOut();
    }
  });
  $('.go-to-top').click(function() {
    $('body,html').animate({
      scrollTop:0
    }, 800);
  });
  const cats = [{
    id: 'cat_1',
    img: "images/img_1.jpg",
    name: "Котобус",
    color: "Коричневый",
    age: 2,
    pawsCount: 12,
    price: 30000,
    isActive: true,
    discount: 40
  }, {
    id: 'cat_2',
    img: "images/img_2.jpg",
    name: "Кот полосатый",
    color: "Коричневый",
    age: 1,
    pawsCount: 4,
    price: 40000,
    isActive: false,
    isSale: false
  }, {
    id: 'cat_3',
    img: "images/img_3.jpg",
    name: "Кот полосатый",
    color: "Коричневый",
    age: 2,
    pawsCount: 4,
    price: 20000,
    isActive: true
  }, {
    id: 'cat_4',
    img: "images/img_1.jpg",
    name: "Кот полосатый",
    color: "Коричневый",
    age: 3,
    pawsCount: 4,
    price: 25000,
    isActive: true
  }, {
    id: 'cat_5',
    img: "images/img_3.jpg",
    name: "Кот полосатый",
    color: "Коричневый",
    age: 4,
    pawsCount: 4,
    price: 30000,
    isActive: true,
    discount: 40
  }, {
    id: 'cat_6',
    img: "images/img_2.jpg",
    name: "Кот полосатый",
    color: "Коричневый",
    age: 6,
    pawsCount: 4,
    price: 10000,
    isActive: false
  }];
  const mappedCats = [...cats];
  const render = (state) => {
    const { name, value } = state;
    const resultElement = document.querySelector('.cats');
    const sort = (a, b) => {
      if (a[name] > b[name]) {
        return value === '🠗'
          ? 1
          : -1;
      }
      if (a[name] < b[name]) {
        return value === '🠕'
          ? 1
          : -1;
      }
      return 0;
    };
    mappedCats.sort(sort);
    const html = `<div class='d-flex gap-1-25 ta-left justify-content-center cats'>${mappedCats.map((cat) => {
      const { id, img, name, color, age, pawsCount, price, isActive, discount, isLike } = cat;
      const buyButton = isActive
        ? '<a class="bg-secondary bold btn border-bottom-radius" href="">Купить</a>'
        : '<div class="disabled bg-primary bold btn border-bottom-radius">Продан</div>';
      const discountHtml = discount
        ? `<div class="absolute discount bg-info color-light">-${discount}%</div>`
        : '';
      const checked = isLike
        ? 'checked'
        : '';
      const catHtml = `<div class="d-flex fd-column align-items-stretch relative flex-grow-1 hidden cat">
        ${discountHtml}
        <img src="${img}" alt="Кот полосатый">
        <button class="absolute like ${checked}" type="button" id="${id}"></button>
        <div class="absolute bg-secondary width-full ta-center pt-0-4 pb-0-4">
          <div class="add">${name} добавлен в <a href="" class="d-inline-block link">Избранное</a></div>
          <div class="remove">Вы разлюбили кота :(</div>
        </div>
        <div class="d-flex fd-column align-items-stretch mb-1-875 p-1-875">
          <h2>${name}</h2>
          <div class="d-flex mb-1">
            <div class="fs-0-75 pseudo-border">${color}<span class="d-block">окрас</span></div>
            <div>
              <div class="bold">${age}<span> мес.</span></div>
              <div class="fs-0-75">Возраст</div>
            </div>
            <div>
              <div class="bold">${pawsCount}</div>
              <div class="fs-0-75">Кол-во лап</div>
            </div>
          </div>
          <div class="bold fs-1-5">${price.toLocaleString('ru-RU')}<span> руб.</span></div>
        </div>
        ${buyButton}
      </div>`
      return catHtml;
    }).join('')}</div>`;
    resultElement.innerHTML = html;
    const likeButtons = document.querySelectorAll('.like');
    likeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const { id } = button;
        const currentCat = mappedCats
          .filter((cat) => cat.id === id)[0];
        const currentCatIndex = mappedCats.indexOf(currentCat);
        mappedCats[currentCatIndex].isLike = !mappedCats[currentCatIndex].isLike;
        button.classList.toggle('checked');
      });
    });
  };
  const state = {
    name: null,
    value: null,
  };
  const items = [
    { name: 'price' },
    { name: 'age' },
  ];
  render(state);
  items.forEach(({ name }) => {
    const element = document.querySelector(`[name="${name}"]`);
    element.addEventListener('change', ({ target }) => {
      const { name, value } = target;
      state.name = name;
      state.value = value;
      render(state);
    });
  });
  const form = document.getElementById("form");
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    isEmail();
  });
  const isEmail = () => {
    const str = document.getElementById("email").value;
    const status = document.getElementById("status");
    const re = /.+@.+\..+/i;
    if (re.test(str)) {
      status.classList.remove('color-info');
      status.classList.add('color-secondary');
      status.innerHTML = "Сообщение отправлено";
    } else {
      status.classList.remove('color-secondary');
      status.classList.add('color-info');
      status.innerHTML = "Адрес неверный";
    }
  }
});
