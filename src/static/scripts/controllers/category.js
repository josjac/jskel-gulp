define([
  './controller'
], function(Controller) {

  function Category() {
    this.id = 'category';
    return this;
  }

  Category.prototype = new Controller();

  Category.prototype.init = function() {
    this.title = document.createElement('h1');
    this.title.setAttribute('class', 'title');
    this.title.textContent = 'category';

    this.page = document.createElement('div');
    this.page.setAttribute('id', 'home');
    this.page.setAttribute('class', 'page');
    this.page.style.backgroundColor = '#99eeDD';
    this.page.appendChild(this.title);

    document.getElementById('canvas').appendChild(this.page);

    this.page.addEventListener('click', function() {
      location.hash = '#/home';
    });

    return this;
  };

  Category.prototype.end = function() {
  };

  return Category;
});

