window.addEventListener('load', function () {
    function updateOnlineStatus(event) {
        if (isOnline()) {
            readOfflineNews();
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

function isOnline() {
    return window.navigator.onLine;
}

function readOfflineNews() {
        len = localStorage.length + 1;
        for (var k = 1; k < len; k++) {
            news = JSON.parse(localStorage.getItem('n' + k));
            var img = localStorage.getItem('i' + k);
            var parentElem = document.getElementById('news-list');
            var out = document.createElement('div');
            out.id = 'news';
            out.innerHTML =
                "<div class=" + "col-md-4 news"+"><img src='" +
                img + "' width='100%'>" +
                "<h2>" + news[0].name + "</h2>" +
                "<p>" + news[0].text + "</p><a class=" + "btn btn-primary" + "href=" + "#" + "role=" + "button"+ ">" + "View details &raquo;</a></div>";
            parentElem.appendChild(out);
            localStorage.removeItem('n' + k);
            localStorage.removeItem('i' + k);
        }
    }
