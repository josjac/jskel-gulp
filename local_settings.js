
module.exports = function(original) {
  var project = {};

  if (!original.yargs.prod) {
    project.host = '192.168.1.125';

    project.port = ':8000';

    project.livereload_url = [
      'http://', project.host, ':35729/livereload.js?ext=Chrome&extver=2.1.0'
    ].join('');

    project.static_path = [
      'http://', project.host, project.port, '/static/'
    ].join('');
  }
  
  return project;
}
