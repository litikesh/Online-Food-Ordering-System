import veg from "../../img/cat/veg.jpg";
import Nonveg from "../../img/cat/non-veg.webp";
import pizza from "../../img/cat/pizza.jpg";
import drinks from "../../img/cat/drinks.jpg";

export const categories = [
  "Veg",
  "Non-Veg Pizza",
  "Pizza Mania",
  "Sides Orders",
  "Beverages",
  "Choice Of Crusts",
  "Burger Pizza",
  "Veg Biryani",
];

export const Mincategories = [
  "veg",
  "non-veg",
  "Pizza Mania",
  "Sides Orders",
  "Beverages",
  "Choice Of Crusts",
  "Burger Pizza",
  "Veg Biryani",
];

export const foodImg = [
  { id: 1 },
  { id: 2, src: Nonveg },
  { id: 3, src: pizza },
  { id: 4, src: drinks },
];

export const FoodCategories = [
  {
    id: 1,
    src: veg,
    link: "VegFoods",
    cat: "veg",
    name: "Veg Foods",
    desc: "A delight for veggie lovers! Choose from our wide range of delicious vegetarian Foods, it's softer and tastier.",
  },
  {
    id: 2,
    src: Nonveg,
    link: "NonVeg Foods",
    name: "Non-Veg Foods",
    cat: "non-veg",
    desc: "Choose your favourite non-veg Foods from the Domino's Pizza menu. Get fresh non-veg Foods with your choice of crusts & toppings.",
  },
  {
    id: 3,
    src: pizza,
    link: "VegPizza",
    name: "Veg Pizza",
    cat: "pizza",
    desc: "Choose your favourite non-veg pizzas from the Domino's Pizza menu. Get fresh non-veg pizza with your choice of crusts & toppings.",
  },
  {
    id: 4,
    src: drinks,
    link: "Drinks",
    name: "Soft Drinks",
    desc: "Choose your favourite non-veg pizzas from the Domino's Pizza menu. Get fresh non-veg pizza with your choice of crusts & toppings.",
  },
];
