var i = 0;

function isOnline() {
    return window.navigator.onLine;
}

function addNews() {
    if ($('#news-name').val() === "" || $('#news-text').val() === "" || $('#news-img').val() === "") {
        alert('Заповніть всі поля');
        return false;
    }
    if (isOnline()) {
        document.getElementById('news-form').reset();
        document.getElementById('news-img-form').reset();
        target.src = 'images/images.jpg';
        alert('Новина успішно надіслана.');
    } else {
        var name = document.getElementById('news-name').value;
        var text = document.getElementById('news-text').value;
        imgData = target.src;
        i++;
        var list = [];
        list.push({"name": (name), "text": (text)});
        localStorage.setItem('n' + i, JSON.stringify(list));
        localStorage.setItem('i' + i, (imgData));
        document.getElementById('news-form').reset();
        document.getElementById('news-img-form').reset();
        target.src = 'images/images.jpg';
    }
}

function showImage(src, target) {
    var fr = new FileReader();
    fr.onload = function (e) {
        target.src = this.result;
    };
    src.addEventListener("change", function () {
        fr.readAsDataURL(src.files[0]);
    });
}

var src = document.getElementById("news-img");
var target = document.getElementById("target");
showImage(src, target);
