let categories;
const fetchData = async () => {
  const response = await fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  );
  const data = await response.json();
  categories = data.categories;
  console.log(categories)
  createCards();
  showProducts("", "men");
};

const showProducts = (event, category) => {
    let tabcontent = document.getElementsByClassName("content");
    let tablinks = document.getElementsByClassName("tablink");

    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    document.getElementById(category).style.display = "flex";

    if(event) {
        for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        event.currentTarget.className += " active";
    }
}

const createCards = () => {
  const menDiv = document.getElementById("men");
  const womenDiv = document.getElementById("women");
  const kidsDiv = document.getElementById("kids");

  for (let item of categories[0].category_products) {
    const card = generateCard(item)
    menDiv.appendChild(card);
  };

  for (let item of categories[1].category_products) {
    const card = generateCard(item)
    womenDiv.appendChild(card);
  };

  for (let item of categories[2].category_products) {
    const card = generateCard(item)
    kidsDiv.appendChild(card);
  };
};

const generateCard = (item) => {
    let div = document.createElement("div");
    div.classList.add("product")

    let img = document.createElement("img");
    img.classList.add("product_image")
    img.src = item.image;
    div.appendChild(img);

    if(item.badge_text) {
        let badge = document.createElement("div");
        badge.classList.add("badge")
        badge.innerHTML = item.badge_text;
        div.appendChild(badge);
    }

    let titleDiv = document.createElement("div");
    titleDiv.className = "title flex"

    let title = document.createElement("h3");
    title.innerHTML = item.title.length > 15 ? `${item.title.slice(0, 15)}..` : item.title;
    titleDiv.appendChild(title);

    let vendor = document.createElement("p");
    vendor.classList.add("vendor");
    vendor.innerHTML = item.vendor;

    titleDiv.appendChild(vendor);
    div.appendChild(titleDiv);

    let priceDiv = document.createElement("div");
    priceDiv.classList.add("flex");

    let price = document.createElement("p");
    price.innerHTML = `Rs ${Number(item.price).toFixed(2)}`;
    priceDiv.appendChild(price);

    let comparePrice = document.createElement("p");
    comparePrice.classList.add("compare_price");
    comparePrice.innerHTML = item.compare_at_price;
    priceDiv.appendChild(comparePrice);


    let offer = document.createElement("p");
    offer.classList.add("offer");
    offer.innerHTML = `${(((item.compare_at_price - item.price) / item.price) * 100).toFixed(0)}% Off`;
    priceDiv.appendChild(offer);
    div.appendChild(priceDiv);
    
    buttonDiv = document.createElement("div")
    buttonDiv.classList.add("buttonDiv");
    div.appendChild(buttonDiv);
    
    addCartButton = document.createElement("botton");
    addCartButton.textContent = "Add to Cart";
    addCartButton.classList.add("addCartButton");
    buttonDiv.appendChild(addCartButton);

    
    return div;

}
