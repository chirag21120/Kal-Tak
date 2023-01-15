console.log("news");

//Grab the news container
let newsAccordion = document.getElementById("newsaccordion");
let apiKey = "f7a2b00e79c84745a994fef6c043c177";
let source = "bbc-news";

//create aajax  get request
const xhr = new XMLHttpRequest();

// Create a date object from a date string
let date = new Date();

// Get year, month, and day part from the date
let today = date.toLocaleString("default", { year: "numeric" })+"-"+ date.toLocaleString("default", { month: "2-digit" })+"-"+date.toLocaleString("default", { day: "2-digit" });
console.log(today); 
function yesterday () {  
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate()-1)
    return yesterday;
  }
  let date2 = yesterday();
  let yesterday2 = date2.toLocaleString("default", { year: "numeric" })+"-"+ date2.toLocaleString("default", { month: "2-digit" })+"-"+date2.toLocaleString("default", { day: "2-digit" });
  console.log(yesterday2);

xhr.open(
    "GET",
    `https://newsapi.org/v2/everything?q=movies&from=${yesterday2}to=${today}&sortBy=publishedAt&apiKey=${apiKey}`,true
  );
xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles;
    console.log(articles);
    let newsHtml = "";
    articles.forEach(function (element) {
      let news ="";
      if (element.urlToImage) {
        news = ` <div class="col" >
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
