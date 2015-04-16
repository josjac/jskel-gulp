define([
  './controller'
], function(Controller) {

  function Home() {
    this.id = 'home';
    return this;
  }

  Home.prototype = new Controller();

  Home.prototype.init = function() {
    this.title = document.createElement('h1');
    this.title.setAttribute('class', 'title');
    this.title.textContent = 'Home';

    this.page = document.createElement('div');
    this.page.setAttribute('id', 'home');
    this.page.setAttribute('class', 'page');
    this.page.appendChild(this.title);

    document.getElementById('canvas').appendChild(this.page);

    this.page.addEventListener('click', function() {
      location.hash = '#/category/1';
    });

    return this;
  };

  Home.prototype.end = function() {
  };

  return Home;
});
