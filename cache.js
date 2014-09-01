var SelectorCache = function(selectors){
  var Storage = chrome.storage.local;
  var sel = selectors;
  var unused;
  var self = this;
  var onReady = function(){};
  this.each = function(fn){ sel.forEach(fn); };
  this.setUsed = function(s, used){ if(used > 0 && !!~unused.indexOf(s)){ unused.splice(unused.indexOf(s), 1); } };
  this.save = function(){ Storage.set({'selectorCache': {all: sel.length, unused: unused.slice() }}); };
  this.ready = function(fn){ onReady = fn.bind(self); };
  //create results object or retrieve from cache.
  Storage.get('selectorCache', function(o){
    if(!!o.selectorCache && !!o.selectorCache.unused){
      unused = o.selectorCache.unused.slice();
      console.log(o.selectorCache);
    }else{
      console.log('empty cache!');
      unused = sel.slice();
    }
    setTimeout(onReady, 0);
  });
};