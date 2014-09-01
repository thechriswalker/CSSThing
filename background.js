chrome.extension.onMessage.addListener(function(m){
  //message is object:
  /*[
      {
        "link": css file url,
        "selector": .class,
        "found": int
      }
    ]
  */
  //create or find object.
  //increment
  //save.
  var keys = ['stats'];
  m.forEach(function(i){
    keys.push(i.link+"|"+i.selector);
  });
  chrome.storage.local.get(keys, function(o){
    var unused = stats.unused || 0, used = stats.used || 0, total = stats.total || 0;


  });
});