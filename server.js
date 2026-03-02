 const express = require("express");
const app = express();
const PORT = 3000;

/* 1) Be Polite, Greet the User
   /greetings/:username
*/
app.get("/greetings/:username", (req, res) => {
  const { username } = req.params;
  res.send(`Hello there, ${username}!`);
  // You can also use: res.send(`What a delight it is to see you once more, ${username}.`);
});

/* 2) Rolling the Dice
   /roll/:number
   - if not a number => "You must specify a number."
   - else random whole number between 0 and given number
*/
app.get("/roll/:number", (req, res) => {
  const num = Number(req.params.number);

  if (Number.isNaN(num)) {
    return res.send("You must specify a number.");
  }

  const rolled = Math.floor(Math.random() * (num + 1)); // 0 to num
  res.send(`You rolled a ${rolled}.`);
});

/* 3) I Want THAT One!
   /collectibles/:index
*/
const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
  const index = Number(req.params.index);

  if (Number.isNaN(index) || index < 0 || index >= collectibles.length) {
    return res.send("This item is not yet in stock. Check back soon!");
  }

  const item = collectibles[index];
  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});

/* 4) Filter Shoes by Query Parameters
   /shoes?min-price=...&max-price=...&type=...
   - no params => full list
*/
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
  let filtered = [...shoes];

  const minPrice = req.query["min-price"] ? Number(req.query["min-price"]) : null;
  const maxPrice = req.query["max-price"] ? Number(req.query["max-price"]) : null;
  const type = req.query.type ? String(req.query.type).toLowerCase() : null;

  if (minPrice !== null && !Number.isNaN(minPrice)) {
    filtered = filtered.filter((s) => s.price >= minPrice);
  }

  if (maxPrice !== null && !Number.isNaN(maxPrice)) {
    filtered = filtered.filter((s) => s.price <= maxPrice);
  }

  if (type) {
    filtered = filtered.filter((s) => s.type.toLowerCase() === type);
  }

  res.json(filtered);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});