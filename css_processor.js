// Content Script.
// When loaded into a page
// Find all CSS Selectors in style sheets (by XHR if link, or innerHTML if style tag)
// Once we have them all we can
// loop through them all and find the number of matching DOM elements.
// send stats for each selector back to the background process which does the collation.
// Once a selector has been tested true, we can ignore it.
function getSelectors(cb){
  var s = document.getElementById('fsCss'),
      t = document.createElement('style'),
      x = new XMLHttpRequest();
  x.open('GET', s.href, true);
  x.addEventListener('load', function(){
    t.innerHTML = x.responseText;
    t.addEventListener('load', scan);
    s.insertBefore(t);
  });
  x.send();
  function scan(){
    var selectors = [], rule, rules = t.sheet.rules, l = rules.length, i = 0;
    Array.prototype.forEach.call(rules, function(r){
      if(!!r.selectorText){
        selectors.push.apply(selectors, r.selectorText.split(','));
      }else if(r instanceof CSSMediaRule){
        //this could be a MediaQuery!
        Array.prototype.forEach.call(r.cssRules, arguments.callee);
      }
    });
    //now we are done with t
    t.parentNode.removeChild(t);
    //and finally fire the callback;
    cb(selectors);
  }
}

var sc;
//ok so on page load we get the selectors.
//then run an initial scan and a debounced DOMMutation event scan.
getSelectors(function(s){
  sc = new SelectorCache(s);
  var re = /::?(active|hover|visited|focus|target|link)/g;
  sc.ready(function(){
    var check = function(){
      sc.each(function(r){
        sc.setUsed(r, document.querySelectorAll(r.replace(re,'')).length);
      });
      sc.save();
      chrome.extension.sendMessage({});
    };
    setInterval(check, 3000);
  });
});

