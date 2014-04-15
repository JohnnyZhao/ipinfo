chrome.contextMenus.create({
    'type':'normal',
    'title':'查询IP信息',
    'contexts':['selection'],
    'id':'cn',
    'onclick':lookForIP
});

function lookForIP(info, tab){
    chrome.runtime.sendMessage({greeting: "hello", data: info.selectionText});
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message && message.greeting == undefined){
        chrome.contextMenus.update('cn',{
            'title':'查询IP“'+message+'”'
        });
    }
});
