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
        if (useLocalStorage) {
            len = localStorage.length + 1;
            for (var k = 1; k < len; k++) {
                news = JSON.parse(localStorage.getItem('n' + k));
                var img = localStorage.getItem('i' + k);
                var parentElem = document.getElementById('news-list');
                var out = document.createElement('div');
                out.id = 'news';
                out.innerHTML =
                  "<div class='col-lg-offset-3 col-lg-6 news'>" +
                  "<img src='" + img + "' width='100%'>" +
                  "<h2>" + news[0].name + "</h2>" +
                  "<p>" + news[0].text + "</p>"+
                  "<p><a class='btn btn-primary' href='#' role='button'>View details &raquo;</a></p></div>";
                parentElem.appendChild(out);
                localStorage.removeItem(k);
            }
        } else {
            var transaction = db.transaction(["news"], "readonly");
            var store = transaction.objectStore("news");
            store.openCursor().onsuccess = function (e) {
                var cursor = e.target.result;
                if (cursor) {
                    cursor.continue();
                    var parentElem = document.getElementById('news-list');
                    var out = document.createElement('div');
                    out.id = 'news';
                    out.innerHTML =
                      "<div class='col-lg-offset-3 col-lg-6 news'>" +
                      "<img src='" + cursor.value.img + "' width='100%'>" +
                      "<h2>" + cursor.value.name + "</h2>" +
                      "<p>" + cursor.value.text + "</p>"+
                      "<p><a class='btn btn-primary' href='#' role='button'>View details &raquo;</a></p></div>";
                    parentElem.appendChild(out);
                }
            }
        }
    }
