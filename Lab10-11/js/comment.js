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

    function addReview() {
        if ($('#name').val() === "" || $('#text').val() === "") {
            alert('Заповніть всі поля');
            return false;
        }
        if (isOnline()) {
            var date = new Date;
            var year = date.getFullYear();
            if(date.getDay() < 10){
              var day = '0' + date.getDay()
            }else{
              var day = date.getDay();
            }
            var month = date.getMonth() + 1;
            var author = document.getElementById('name').value;
            var text = document.getElementById('text').value;
            var parentElem = document.getElementById('reviews-list');
            var time = day + "." + month + "." + year;
            var out = document.createElement('div');
            out.id = 'review';
            out.innerHTML =
                "<div>" +
                "<h2>" + author + " " + time + "</h2>"+
                "<p>" + text + "</p></div>";
            parentElem.appendChild(out);
            document.getElementById('form').reset();
        } else {
             if (useLocalStorage) {
                var date = new Date;
                var year = date.getFullYear();
                if(date.getDay() < 10){
                  var day = '0' + date.getDay()
                }else{
                  var day = date.getDay();
                }
                var month = date.getMonth() + 1;
                var time = day + "." + month + "." + year;
                var author = document.getElementById('name').value;
                var text = document.getElementById('text').value;
                i++;
                var list = [];
                list.push({"name": author, "text": text, "date": time});
                localStorage.setItem('r' + i, JSON.stringify(list));
            } else {
                var date = new Date;
                var year = date.getFullYear();
                if(date.getDay() < 10){
                  var day = '0' + date.getDay()
                }else{
                  var day = date.getDay();
                }
                  var month = date.getMonth() + 1;
                var time = day + "." + month + "." + year;
                var transaction = db.transaction(["reviews"], "readwrite");
                var store = transaction.objectStore("reviews");
                var review = {
                    message: document.getElementById('text').value,
                    author: document.getElementById('name').value,
                    time: time
                };
                store.add(review);
                console.log("save in db")
            }
            document.getElementById('form').reset();
        }
    }

    function readOfflineReview() {
        if (useLocalStorage) {
            len = localStorage.length + 1;
            for (var k = 1; k < len; k++) {
                review = JSON.parse(localStorage.getItem('r' + k));
                var parentElem = document.getElementById('reviews-list');
                var out = document.createElement('div');
                out.id = 'review';
                out.innerHTML =
                "<div>" +
                "<h2>" + review[0].name + " "+ review[0].date + "</h2>"+
                "<p>" + review[0].text + "</p></div>";
                parentElem.appendChild(out);
                localStorage.removeItem(k);
            }
        } else {
            var transaction = db.transaction(["reviews"], "readonly");
            var store = transaction.objectStore("reviews");

            store.openCursor().onsuccess = function (e) {
                var cursor = e.target.result;
                if (cursor) {
                    cursor.continue();
                    var parentElem = document.getElementById('reviews-list');
                    var out = document.createElement('div');
                    out.id = 'review';
                    out.innerHTML =
                    "<div>" +
                    "<h2>" + cursor.value.author + " "+ cursor.value.time + "</h2>"+
                    "<p>" + cursor.value.message + "</p></div>";
                    parentElem.appendChild(out);
                }
            }
        }
    }
