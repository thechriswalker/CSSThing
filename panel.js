var refresh = function(){
  chrome.storage.local.get('selectorCache', function(o){
    try{
      document.getElementById('used').innerHTML = o.selectorCache.all - o.selectorCache.unused.length;
      document.getElementById('unused').innerHTML = o.selectorCache.unused.length;
      document.getElementById('total').innerHTML = o.selectorCache.all;
      document.getElementById('raw').value = JSON.stringify(o.selectorCache.unused, null," ");
    }catch(e){}
  });
};
refresh();
setInterval(refresh, 5000);
document.getElementById('clear').addEventListener('click', function(e){
  chrome.storage.local.clear(function(){
    refresh();
    chrome.browserAction.setBadgeText({text:""});
  });
});