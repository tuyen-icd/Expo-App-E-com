import {
  ICBank,
  ICCategoryBikini,
  ICCategoryDress,
  ICCategoryHighHeels,
  ICCategoryManPants,
  ICCategoryManShoes,
  ICCategoryManTShirt,
  ICCategoryManUnderWear,
  ICCategoryShirt,
  ICCategorySkirt,
  ICCategoryWomenBag,
  ICCategoryWomenPants,
  ICCategoryWomenTShirt,
  ICCategoryWorkEquipment,
  ICCreaditCard,
  ICPaypal,
} from "../assets/icons/index";
export const DataCategory = [
  { id: 1, image: <ICCategoryShirt />, title: "Shirt", man: true },
  { id: 2, image: <ICCategoryBikini />, title: "Bikini", man: false },
  { id: 3, image: <ICCategoryDress />, title: "Dress", man: false },
  { id: 4, image: <ICCategoryHighHeels />, title: "High Heels", man: false },
  { id: 5, image: <ICCategoryManPants />, title: "Man Pants", man: true },
  { id: 6, image: <ICCategoryManShoes />, title: "Man Shoes", man: true },
  { id: 7, image: <ICCategoryManTShirt />, title: "Man T Shirt", man: true },
  {
    id: 8,
    image: <ICCategoryManUnderWear />,
    title: "Man Under Wear",
    mna: true,
  },
  { id: 9, image: <ICCategorySkirt />, title: "Skirt", man: false },
  { id: 10, image: <ICCategoryWomenBag />, title: "Women Bag", man: false },
  { id: 11, image: <ICCategoryWomenPants />, title: "Women Pants", man: false },
  {
    id: 12,
    image: <ICCategoryWomenTShirt />,
    title: "Women T Shirt",
    man: false,
  },
  {
    id: 13,
    image: <ICCategoryWorkEquipment />,
    title: "Work Equipment",
    man: true,
  },
];

export const PaymentFake = [
  {id: 1, image: <ICCreaditCard/>, title: 'Credit Card Or Debit'},
  {id: 1, image: <ICPaypal/>, title: 'Paypal'},
  {id: 1, image: <ICBank/>, title: 'Bank Transfer'},
]