(function () {
  // avoid browser caches data.js by inserting an unique identifier
  document.getElementById('datajs').src = 'js/data.js' + '?v=' + Date.now();
  const jsonData = JSON.parse(data);
  const dataList = jsonData["data"];
  var parent = document.querySelector('.card-list');
  const MAX_SIZE = 8;
  let start = 0;
  start = appendImgs(parent, start, start + MAX_SIZE, dataList);

  function appendImg(pic, parent) {
    var link = "https://movie.douban.com/subject/" + pic["id"];
    var path = "./img/" + pic["filename"];
    var li = document.createElement('li');
    li.setAttribute("class", "card");

    var a1 = document.createElement('a');
    a1.setAttribute("class", "card-image is-loaded");
    a1.setAttribute("href", link);
    a1.setAttribute("target", "_blank");
    a1.style.backgroundImage = 'url(' + path + ')';

    var img1 = document.createElement('img');
    img1.setAttribute("src", path);
    img1.setAttribute("alt", "Psychopomp");

    var a2 = document.createElement('a');
    a2.setAttribute("class", "card-description");
    a2.setAttribute("href", link);
    a2.setAttribute("target", "_blank");

    var h2 = document.createElement('h2');
    h2.innerText = pic["title"];
    var p = document.createElement('p');
    p.innerText = pic["matched_date"];

    a1.appendChild(img1);
    a2.appendChild(h2);
    a2.appendChild(p);
    li.appendChild(a1);
    li.appendChild(a2);
    parent.appendChild(li);
  }

  function appendImgs(parent, start, end, dl) {
    let e = Math.min(end, dl.length);
    for (let i = start; i < e; i++) {
      appendImg(dl[i], parent);
    }
    return e;
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight) {
      if (start < dataList.length) {
        start = appendImgs(parent, start, start + MAX_SIZE, dataList);
      }
    }
  })

}).call(this);