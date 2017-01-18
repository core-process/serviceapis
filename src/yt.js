import deepExtend from 'deep-extend';

const API_URL = '//www.youtube.com/iframe_api';

export async function load() {
  // load script
  if(!document.querySelector(`script[src$="${API_URL}"]`)) {
    const script = document.createElement('script');
    script.async = 1;
    script.type = 'text/javascript';
    script.src = API_URL;
    document.querySelector('head').appendChild(script);
  }
  // wait for availability
  await availability();
}

export async function availability() {
  // wait for variables to show up
  while(!isAvailable()) {
    await new Promise((resolve, reject) => setTimeout(resolve, 10));
  }
}

export function isAvailable() {
  // check for youtube variables
  return (
       typeof YT !== 'undefined'
    && typeof YT.Player !== 'undefined'
    && YT.loaded
  );
}

export async function createPlayer(id, options) {
  // load and await availability
  await load();
  // create player object and wait for it beeing available
  let player = null;
  await new Promise((resolve, reject) => {
    // prepare options
    options = deepExtend(
      { }, options || { },
      { events: {
          onReady: () => { resolve(); }
        }
      }
    );
    // create object
    player = new YT.Player(id, options);
  });
  // done
  return player;
}
