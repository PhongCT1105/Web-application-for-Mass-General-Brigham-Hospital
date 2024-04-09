export interface CardInfo {
  image: string; // path to image
  name: string; // e.i. rose, tulip
  cost: number;
  discountAmt: number;
}

export const flowerCards: CardInfo[] = [
  {
    image: "src/assets/flower-request-imgs/bouquets/orangetulips.webp",
    name: "Orange Tulips",
    cost: 18.99,
    discountAmt: 30,
  },
  {
    image: "src/assets/flower-request-imgs/bouquets/pink-roses.webp",
    name: "Gift of Love",
    cost: 39.99,
    discountAmt: 0,
  },
  {
    image:
      "src/assets/flower-request-imgs/bouquets/pink-sugar-flower-combo.webp",
    name: "Sugar Flower Combo",
    cost: 34.99,
    discountAmt: 0,
  },
  {
    image: "src/assets/flower-request-imgs/bouquets/pink-tulips.png",
    name: "Pink Tulips",
    cost: 28.79,
    discountAmt: 30,
  },
  {
    image: "src/assets/flower-request-imgs/bouquets/rainbow-rose-combo.png",
    name: "Rainbow Roses",
    cost: 42.99,
    discountAmt: 30,
  },
  {
    image: "src/assets/flower-request-imgs/bouquets/roses.webp",
    name: "Roses",
    cost: 39.99,
    discountAmt: 20,
  },
  {
    image: "src/assets/flower-request-imgs/bouquets/silk-rose.webp",
    name: "Silk Rose",
    cost: 59.99,
    discountAmt: 0,
  },
  {
    image: "src/assets/flower-request-imgs/bouquets/sixredyellowroses.png",
    name: "Rose Combo",
    cost: 39.99,
    discountAmt: 50,
  },
  {
    image: "src/assets/flower-request-imgs/bouquets/Tulips.webp",
    name: "Tulips",
    cost: 27.99,
    discountAmt: 0,
  },
  {
    image: "src/assets/flower-request-imgs/bouquets/flower.png",
    name: "Pink Delight",
    cost: 26.99,
    discountAmt: 0,
  },
  {
    image: "src/assets/flower-request-imgs/bouquets/flower-combo.png",
    name: "Flower Combo",
    cost: 28.79,
    discountAmt: 20,
  },
  {
    image: "src/assets/flower-request-imgs/bouquets/GloriosaSuperba.webp",
    name: "Gloriosa Superba",
    cost: 28.79,
    discountAmt: 0,
  },
  {
    image: "src/assets/flower-request-imgs/bouquets/JapaneseRoses.png",
    name: "Japanese Roses",
    cost: 55.29,
    discountAmt: 20,
  },
];
export const addOnCards: CardInfo[] = [
  {
    image: "src/assets/flower-request-imgs/add-ons/box-of-choc.png",
    name: "Chocolate Truffles",
    cost: 22.99,
    discountAmt: 0,
  },
  {
    image: "src/assets/flower-request-imgs/add-ons/BoxChocolates.webp",
    name: "Box of Chocolates",
    cost: 16.99,
    discountAmt: 0,
  },
  {
    image: "src/assets/flower-request-imgs/add-ons/Balloons.png",
    name: "Balloons",
    cost: 8.99,
    discountAmt: 0,
  },
  {
    image: "src/assets/flower-request-imgs/add-ons/muffinbasket.png",
    name: "Muffin Basket",
    cost: 29.75,
    discountAmt: 20,
  },
  {
    image: "src/assets/flower-request-imgs/add-ons/puzzle.webp",
    name: "Puzzle",
    cost: 13.99,
    discountAmt: 10,
  },
  {
    image: "src/assets/flower-request-imgs/add-ons/TeddyBear.webp",
    name: "Teddy Bear",
    cost: 999.99,
    discountAmt: 50,
  },
];
