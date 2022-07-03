(function () {
  // avoid browser caches data.js by inserting an unique identifier
  document.getElementById('datajs').src = 'js/data.js' + '?v=' + Date.now();
  const jsonData = JSON.parse(data);
  const dataList = jsonData["data"];
  var parent = document.querySelector('.gallery');
  const MAX_SIZE = 6;
  let start = 0;
  start = appendImgs(parent, start, start + MAX_SIZE, dataList);

  function appendImg(pic, parent) {
    var ma = document.createElement('a');
    ma.setAttribute("class", "gallery-link");
    ma.setAttribute("href", "./img/" + pic["filename"]);
    var figure = document.createElement('figure');
    figure.setAttribute("class", "gallery-image");
    var img = document.createElement('img');
    img.src = "./img/" + pic["filename"];
    img.setAttribute("height", "1400");
    img.setAttribute("width", "1000");
    var fig = document.createElement('figcaption');
    fig.innerText = pic["matched_date"];
    fig.title = "《" + pic["title"] + "》";
    fig.setAttribute("url", "https://movie.douban.com/subject/" + pic["id"]);
    figure.appendChild(img);
    figure.appendChild(fig);
    ma.appendChild(figure);
    parent.appendChild(ma);
  }

  function appendImgs(parent, start, end, dl) {
    let e = Math.min(end, dl.length);
    for (let i = start; i < e; i++) {
      appendImg(dl[i], parent);
    }
    return e;
  }

  $('.gallery-link').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    image: {
      verticalFit: true,
      titleSrc: function (item) {
        var text = item.el.find('figcaption').attr('title') || item.el.attr('title');
        var url = item.el.find('figcaption').attr('url');
        return `<a href="${url}" target="_blank">${text}</a>`;
      }
    },
    zoom: {
      enabled: true
    },
    // duration: 300
    gallery: {
      enabled: true,
      navigateByImgClick: false,
      tCounter: ''
    },
    disableOn: function () {
      return $(window).width() > 640;
    }
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight) {
      if (start < dataList.length) {
        start = appendImgs(parent, start, start + MAX_SIZE, dataList);
      }
    }
  })

}).call(this);