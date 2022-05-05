(function () {
    // avoid browser caches data.js by inserting an unique identifier
    document.getElementById('datajs').src = 'js/data.js' + '?v=' + Date.now();
    const jsonData = JSON.parse(data);  
    var parent = document.querySelector('.gallery');
    for (let pic of jsonData["data"]) {
      var ma = document.createElement('a');
      ma.setAttribute("class", "gallery-link");
      ma.setAttribute("href", pic["cover"]);
      var figure = document.createElement('figure');
      figure.setAttribute("class", "gallery-image");
      var img = document.createElement('img');
      img.src = pic["cover"];
      img.setAttribute("height", "1400");
      img.setAttribute("width", "1000");
      var fig = document.createElement('figcaption');
      fig.innerText = pic["matched_date"];
      fig.title = "《" + pic["title"] + "》";
      figure.appendChild(img);
      figure.appendChild(fig);
      ma.appendChild(figure);
      parent.appendChild(ma);
    }
  
    $('.gallery-link').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      image: {
        verticalFit: true,
        titleSrc: function (item) {
          return item.el.find('figcaption').attr('title') || item.el.attr('title');
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
  
  }).call(this);