window.onmouseup = function(){
    var selection = window.getSelection();
    if(selection.anchorOffset != selection.extentOffset){
        chrome.runtime.sendMessage(selection.toString());
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log('request greeting:', request.greeting);
    if(request && request.greeting == "ipinfo"){
        console.log('ipinfo:', request.data);
        var selection = window.getSelection();
        if(selection.anchorOffset != selection.extentOffset){
            $('<span style="color: green">'+request.data+'</span>').insertAfter($(selection.anchorNode.parentElement));
        }
    }
});
