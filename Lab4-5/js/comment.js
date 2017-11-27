window.addEventListener('load', function () {
    function updateOnlineStatus(event) {
        if (isOnline()) {
            readOfflineReview();
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

var i = 0;

function isOnline() {
    return window.navigator.onLine;
}

function addComment() {
    if ($('#username').val() === "" || $('#text').val() === "") {
        alert('Заповніть всі поля');
        return false;
    }
    if (isOnline()) {
        var date = new Date;
        if(date.getDate() < 10){
          var day = '0' + date.getDate();
        }else{
          var day = date.getDate();
        }
        if(date.getMonth()<10){
          var month = '0' + date.getMonth() + 1;
        }else{
          var month = date.getMonth() + 1;
        }
        var minute = date.getMinutes();
        var hours = date.getHours();
        var year = date.getFullYear();
        var fullDate = day +'.' + month + '.' + year + "  " + hours + ":" + minute;
        var author = document.getElementById('username').value;
        var text = document.getElementById('text').value;
        var parentElem = document.getElementById('comment-list');
        var out = document.createElement('div');
        out.id = 'comment';
        out.innerHTML =
          "<div><h2>" + author + " " + fullDate + "</h2><p>"
          + text + "</p></div>";
          parentElem.appendChild(out);
        document.getElementById('form').reset();
    } else {
            var date = new Date;
            if(date.getDate() < 10){
              var day = '0' + date.getDate();
            }else{
              var day = date.getDate();
            }
            if(date.getMonth()<10){
              var month = '0' + date.getMonth() + 1;
            }else{
              var month = date.getMonth() + 1;
            }
            var minute = date.getMinutes();
            var hours = date.getHours();
            var year = date.getFullYear();
            var fullDate = day +'.' + month + '.' + year + "  " + hours + ":" + minute;
            var author = document.getElementById('username').value;
            var text = document.getElementById('text').value;
            i++;
            var list = [];
            list.push({"name": author, "text": text, "date": fullDate});
            localStorage.setItem('r' + i, JSON.stringify(list));
            console.log("save comment in local storage")
        }
        document.getElementById('form').reset();
    }

function readOfflineReview() {
        len = localStorage.length + 1;
        for (var k = 1; k < len; k++) {
            review = JSON.parse(localStorage.getItem('r' + k));
            var parentElem = document.getElementById('comment-list');
            var out = document.createElement('div');
            out.id = 'comment';
            out.innerHTML =
              "<div><h2>" + review[0].name + " " + review[0].date + "</h2><p>"
              + review[0].text + "</p></div>";
            parentElem.appendChild(out);
            localStorage.removeItem('r' + k);
        }
    }
