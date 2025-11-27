let products = [
    { name: "Laptop", category: "electronics", price: 50000 },
    { name: "Watch", category: "fashion", price: 2000 },
    { name: "Mobile", category: "electronics", price: 15000 },
    { name: "Shirt", category: "fashion", price: 800 }
];

function displayProducts(list) {
    let container = document.getElementById("productContainer");
    container.innerHTML = "";

    list.forEach(p => {
        container.innerHTML += `
            <div class="product">
                <h3>${p.name}</h3>
                <p>Category: ${p.category}</p>
                <p>₹${p.price}</p>
            </div>
        `;
    });
}

function filterProducts() {
    let category = document.getElementById("categoryFilter").value;

    if (category === "all") displayProducts(products);
    else displayProducts(products.filter(p => p.category === category));
}

function sortProducts() {
    let option = document.getElementById("sortOption").value;

    let sorted = [...products];

    if (option === "asc") sorted.sort((a, b) => a.price - b.price);
    if (option === "desc") sorted.sort((a, b) => b.price - a.price);

    displayProducts(sorted);
}

window.onload = () => displayProducts(products);