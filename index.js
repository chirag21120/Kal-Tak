console.log("news");

//Grab the news container
let newsAccordion = document.getElementById("newsaccordion");
let apiKey = "f7a2b00e79c84745a994fef6c043c177";
let source = "bbc-news";

//create aajax  get request
const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`,true
);

xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles;
    console.table(articles);
    let newsHtml = "";
    articles.forEach(function (element, index) {
      let news;
      if (element.urlToImage) {
        news = ` <div class="col">
        <a href= ${element.url} target="_blank">
        <div class="card hoverCard" >
          <img src="${element.urlToImage}" class="card-img-top" alt="Image" />
          <div class="card-body">
            <h5 class="card-text">
              ${element.title}
            </h5>
            <p>
            ${element.description}
            </p>
          </div>
        </div>
        </a>
      </div>`;
      } else {
        news = "";
      }
      newsHtml += news;
    });
    newsAccordion.innerHTML += newsHtml;
  } else {
    console.log("Some error occured");
  }
};

xhr.send();
