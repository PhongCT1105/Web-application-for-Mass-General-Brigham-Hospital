import orangeTulips from "@/assets/flower-request-imgs/bouquets/orangetulips.webp";
import pinkRoses from "@/assets/flower-request-imgs/bouquets/pink-roses.webp";
import pinkSugarFlowerCombo from "@/assets/flower-request-imgs/bouquets/pink-sugar-flower-combo.webp";
import pinkTulips from "@/assets/flower-request-imgs/bouquets/pink-tulips.png";
import rainbowRoseCombo from "@/assets/flower-request-imgs/bouquets/rainbow-rose-combo.png";
import roses from "@/assets/flower-request-imgs/bouquets/roses.webp";
import silkRose from "@/assets/flower-request-imgs/bouquets/silk-rose.webp";
import roseCombo from "@/assets/flower-request-imgs/bouquets/sixredyellowroses.png";
import tulips from "@/assets/flower-request-imgs/bouquets/Tulips.webp";
import pinkDelight from "@/assets/flower-request-imgs/bouquets/flower.png";
import flowerCombo from "@/assets/flower-request-imgs/bouquets/flower-combo.png";
import gloriosaSuperba from "@/assets/flower-request-imgs/bouquets/GloriosaSuperba.webp";
import japaneseRoses from "@/assets/flower-request-imgs/bouquets/JapaneseRoses.png";

import boxOfChoc from "@/assets/flower-request-imgs/add-ons/box-of-choc.png";
import boxChocolates from "@/assets/flower-request-imgs/add-ons/BoxChocolates.webp";
import balloons from "@/assets/flower-request-imgs/add-ons/Balloons.png";
import muffinBasket from "@/assets/flower-request-imgs/add-ons/muffinbasket.png";
import puzzle from "@/assets/flower-request-imgs/add-ons/puzzle.webp";
import teddyBear from "@/assets/flower-request-imgs/add-ons/TeddyBear.webp";

export interface CardInfo {
  image: string; // path to image
  name: string; // e.i. rose, tulip
  cost: number;
  discountAmt: number;
}

export const flowerCards: CardInfo[] = [
  {
    image: orangeTulips,
    name: "Orange Tulips",
    cost: 18.99,
    discountAmt: 30,
  },
  {
    image: pinkRoses,
    name: "Gift of Love",
    cost: 39.99,
    discountAmt: 0,
  },
  {
    image: pinkSugarFlowerCombo,
    name: "Sugar Flower Combo",
    cost: 34.99,
    discountAmt: 0,
  },
  {
    image: pinkTulips,
    name: "Pink Tulips",
    cost: 28.79,
    discountAmt: 30,
  },
  {
    image: rainbowRoseCombo,
    name: "Rainbow Roses",
    cost: 42.99,
    discountAmt: 30,
  },
  {
    image: roses,
    name: "Roses",
    cost: 39.99,
    discountAmt: 20,
  },
  {
    image: silkRose,
    name: "Silk Rose",
    cost: 59.99,
    discountAmt: 0,
  },
  {
    image: roseCombo,
    name: "Rose Combo",
    cost: 39.99,
    discountAmt: 50,
  },
  {
    image: tulips,
    name: "Tulips",
    cost: 27.99,
    discountAmt: 0,
  },
  {
    image: pinkDelight,
    name: "Pink Delight",
    cost: 26.99,
    discountAmt: 0,
  },
  {
    image: flowerCombo,
    name: "Flower Combo",
    cost: 28.79,
    discountAmt: 20,
  },
  {
    image: gloriosaSuperba,
    name: "Gloriosa Superba",
    cost: 28.79,
    discountAmt: 0,
  },
  {
    image: japaneseRoses,
    name: "Japanese Roses",
    cost: 55.29,
    discountAmt: 20,
  },
];
export const addOnCards: CardInfo[] = [
  {
    image: boxOfChoc,
    name: "Chocolate Truffles",
    cost: 22.99,
    discountAmt: 0,
  },
  {
    image: boxChocolates,
    name: "Box of Chocolates",
    cost: 16.99,
    discountAmt: 0,
  },
  {
    image: balloons,
    name: "Balloons",
    cost: 8.99,
    discountAmt: 0,
  },
  {
    image: muffinBasket,
    name: "Muffin Basket",
    cost: 29.75,
    discountAmt: 20,
  },
  {
    image: puzzle,
    name: "Puzzle",
    cost: 13.99,
    discountAmt: 10,
  },
  {
    image: teddyBear,
    name: "Teddy Bear",
    cost: 999.99,
    discountAmt: 50,
  },
];
