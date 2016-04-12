import profanity   from './profanity.js';
import spam        from './spam.js';
import logger      from './logger.js';

module.exports = class {
  constructor(options=null) {
    //Initialization
    this.env       = typeof process === 'undefined' ? 'browser' : 'server';

    this.profanity = new profanity(this.env);
    this.spam      = new spam(this.env);

    //Update Options with options provided in initialization.
    if(options !== null) {
      let keys = Object.keys(options);

      for (let key of keys) {
        if(key == 'profanity' || key == 'spam') {
          this[key] = Object.assign(this[key], options[key]);
        } else {
          this[key] = options[key];
        }
      }
    } else { /* logger('No options provided in initialization, not a problem tho.'); */ }
  }

  proceed(str) {
    str = this.spam.enable      ? this.spam.proceed(str)      : str;
    str = this.profanity.enable ? this.profanity.proceed(str) : str;
    return str;
  }
};
