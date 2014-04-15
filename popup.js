// IP helper
// you can use this extension to look up ip address information under chrome browser
// created by JohnnyZhao<yu.zhao@shanbay.com>

function fetch_word(ip, outer){
    var url = "http://ipinfo.io/" + ip;
    var req = new XMLHttpRequest();
    req.open(
        "GET",
        url,
        true);
    req.onload = doSomething;
    req.send(null);
    function doSomething(){
        var response = req.response;
        ipinfos = $('.table-striped', response);
        if(outer){
            var network = ipinfos.find('tr').eq(1).find('td').eq(1).text();
            network += ipinfos.find('tr').eq(2).find('td').eq(1).text();
            chrome.runtime.sendMessage({greeting: "ipinfo", data: network});
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, {greeting: "ipinfo", data: network}, function(response) {
                    console.log("excuted!");
                });
            });
        }
        else{
            ipinfos.find('tr').eq(0).remove();
            ipinfos.find('tr').eq(2).remove();
            ipinfos.find('img').remove();
            ipinfos.find('a').attr('href', 'http://ipinfo.io/' + ipinfos.find('a').attr('href'));
            for(i=0; i<ipinfos.find('tr').length; i++){
                ipinfos.find('tr').eq(i).find('td').eq(0).addClass('label-td');
                ipinfos.find('tr').eq(i).find('td').eq(1).addClass('content-td');
            }
            $('.content').html(ipinfos);
        }
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request && request.greeting == "hello"){
        console.log('request data:', request.data);
        fetch_word(request.data, true);
    }
});


function query_button_clicked(){
    var ip = $('#shanbay-extension-query-ip').val();
    console.log(ip);
    fetch_word(ip, false);
}

$('#shanbay-extension-query-ip-btn').click(query_button_clicked);


$('#shanbay-extension-query-ip').keypress(function(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13){
        query_button_clicked();
    }
});
