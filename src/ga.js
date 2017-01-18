const API_URL = '//www.google-analytics.com/analytics.js';

export function load() {
  // prepare global ga function
  if(!window.ga) {
    window.ga = window.ga || function() { (ga.q = ga.q || []).push(arguments) };
    ga.l = Date.now();
  }
  // load script
  if(!document.querySelector(`script[src$="${API_URL}"]`)) {
    const script = document.createElement('script');
    script.async = 1;
    script.type = 'text/javascript';
    script.src = API_URL;
    document.querySelector('head').appendChild(script);
  }
}

export function isAvailable() {
  return !!window.ga;
}
