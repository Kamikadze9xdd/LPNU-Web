
function addComment(){
  if($('#username').val()==="" || $('#text').val()===""){
    alert('Заповніть поля');
    return false;
  }else{
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
    var year = date.getFullYear();
    var author = document.getElementById('username').value;
    var text = document.getElementById('text').value;
    var parentElem = document.getElementById('comment-list');
    var out = document.createElement('div');
    out.id = 'comment';
    out.innerHTML =
      "<div><h2>" + author + " " + day + '.' + month + '.' + year
      + "</h2><p>"
      + text + "</p></div>";
    parentElem.appendChild(out);
    document.getElementById('form').reset();
  }
}
