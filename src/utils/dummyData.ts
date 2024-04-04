import { CategoryModel, RestaurantModel, SubCategoryModel } from 'src/models';

export const dummyRestaurants: RestaurantModel[] = [
  {
    latitude: 10.776889,
    longitude: 106.700806,
    name: 'The Lotus Pond',
    description: 'Delicious Vietnamese cuisine in a cozy atmosphere.',
    rate: 4.5,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.777889,
    longitude: 106.701806,
    name: 'Roma Cucina',
    description: 'Authentic Italian pasta with a modern twist.',
    rate: 4.0,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.778889,
    longitude: 106.702806,
    name: 'Sakura Sushi',
    description: 'The best sushi and Japanese dishes in town.',
    rate: 4.7,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.779889,
    longitude: 106.703806,
    name: 'Le Petit Croissant',
    description: 'A delightful French bakery offering fresh pastries.',
    rate: 4.3,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.780889,
    longitude: 106.704806,
    name: 'Bean There Done That',
    description: 'Cozy café with the best coffee and homemade cakes.',
    rate: 4.8,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.781889,
    longitude: 106.705806,
    name: 'Taco Libre',
    description: 'Traditional Mexican tacos and margaritas.',
    rate: 4.2,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.782889,
    longitude: 106.706806,
    name: 'Green Sprout',
    description: 'Vegan-friendly options with a modern twist.',
    rate: 4.6,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.783889,
    longitude: 106.707806,
    name: "Ocean's Bounty",
    description: 'Exquisite seafood dishes by the waterfront.',
    rate: 4.9,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.784889,
    longitude: 106.708806,
    name: 'Skyline Eats',
    description: 'Luxury dining experience with a panoramic city view.',
    rate: 4.4,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.785889,
    longitude: 106.709806,
    name: 'Family Feast',
    description: 'Family-friendly restaurant with a play area for kids.',
    rate: 4.1,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.786889,
    longitude: 106.710806,
    name: 'Fusion Fantasia',
    description: "Award-winning chef's innovative fusion cuisine.",
    rate: 4.7,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.787889,
    longitude: 106.711806,
    name: 'Brunch & Munch',
    description: 'All-day brunch spot with organic ingredients.',
    rate: 4.0,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.788889,
    longitude: 106.712806,
    name: 'Burgers & Brews',
    description: 'Local craft beers and gourmet burgers.',
    rate: 4.5,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.789889,
    longitude: 106.713806,
    name: 'The Prime Rib',
    description: 'Steakhouse featuring prime cuts and fine wines.',
    rate: 4.8,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.790889,
    longitude: 106.714806,
    name: 'Trattoria Bella',
    description: 'Rustic Italian trattoria with a charming ambiance.',
    rate: 4.3,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.791889,
    longitude: 106.715806,
    name: 'Grill & Chill',
    description: 'Outdoor BBQ and grill with live music on weekends.',
    rate: 4.6,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.792889,
    longitude: 106.716806,
    name: 'Cocktail Corner',
    description: 'Signature cocktails and small plates in a trendy bar.',
    rate: 4.2,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.793889,
    longitude: 106.717806,
    name: 'Thai Spice',
    description: 'Authentic Thai cuisine with a modern decor.',
    rate: 4.7,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.794889,
    longitude: 106.718806,
    name: 'City View Terrace',
    description: 'Indoor and outdoor seating with panoramic views of the city.',
    rate: 4.9,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  //   {
  //     latitude: 10.795889,
  //     longitude: 106.719806,
  //     name: 'The Vineyard',
  //     description: 'Fine dining with an extensive wine selection.',
  //     rate: 4.8,
  //     openAt: '8:00 AM',
  //     closeAt: '10:00 PM',
  //   },
];

export const dummyCategories: CategoryModel[] = [
  {
    name: 'Asian Cuisine',
    description:
      "A rich tapestry of tastes and ingredients from the world's largest and most populous continent.",
    origin: 'Asia',
    image: '',
  },
  {
    name: 'European Cuisine',
    description:
      'Diverse cooking styles from the continent known for its culinary sophistication and historical depth.',
    origin: 'Europe',
    image: '',
  },
  {
    name: 'American Cuisine',
    description:
      'A melting pot of flavors influenced by the vast diversity of immigrant cultures, along with native American ingredients.',
    origin: 'Americas',
    image: '',
  },
  {
    name: 'African Cuisine',
    description:
      'Traditional dishes that are as diverse as the continent itself, often utilizing local fruits, vegetables, cereals, and meats.',
    origin: 'Africa',
    image: '',
  },
];

export const dummySubCategories: SubCategoryModel[] = [
  {
    name: 'Rice Dishes',
    description:
      'Versatile and beloved staple food across many cultures, ranging from risotto to jollof rice.',
    image: '',
  },
  {
    name: 'Noodles & Pasta',
    description:
      'Incorporates a variety of shapes, sizes, and flavors, from Italian spaghetti to Asian noodle soups.',
    image: '',
  },
  {
    name: 'Soups',
    description:
      'Comforting and nutritious, soups vary from broth-based clear soups to thick and hearty stews.',
    image: '',
  },
  {
    name: 'Salads',
    description:
      'Fresh and healthy, salads can be simple side dishes or complex main courses with a variety of ingredients.',
    image: '',
  },
  {
    name: 'Grilled & BBQ',
    description:
      'The art of grilling and BBQ brings out rich flavors in meats, vegetables, and seafood.',
    image: '',
  },
  {
    name: 'Seafood',
    description:
      'From sushi to grilled fish, seafood dishes celebrate the bounty of the oceans and rivers.',
    image: '',
  },
  {
    name: 'Vegetarian Dishes',
    description:
      'Showcasing the diversity of vegetables, grains, and legumes in delicious and hearty dishes.',
    image: '',
  },
  {
    name: 'Snacks/Street Food',
    description:
      'Quick, tasty, and often portable, these dishes are integral to the culinary experience in many cultures.',
    image: '',
  },
  {
    name: 'Meat Dishes',
    description:
      'Featuring a range of cooking techniques and seasonings, meat dishes are central to many meals.',
    image: '',
  },
  {
    name: 'Desserts',
    description:
      'Sweet treats that vary from baked goods and pastries to frozen desserts and sweets.',
    image: '',
  },
];

type DishModel = {
  name: string;
  description: string;
  category: string;
  subCategory: string;
};
export const dummyFoods: DishModel[] = [
  // Asian Cuisine & Noodles & Pasta
  {
    name: 'Ramen',
    description:
      'Japanese noodle soup with meat or fish broth and various toppings.',
    category: 'Asian Cuisine',
    subCategory: 'Noodles & Pasta',
  },
  {
    name: 'Pad Thai',
    description:
      'Stir-fried rice noodle dish from Thailand with eggs, fish sauce, tamarind juice, and red chili pepper.',
    category: 'Asian Cuisine',
    subCategory: 'Noodles & Pasta',
  },
  {
    name: 'Pho',
    description:
      'Vietnamese soup consisting of broth, rice noodles, herbs, and meat.',
    category: 'Asian Cuisine',
    subCategory: 'Noodles & Pasta',
  },
  {
    name: 'Soba',
    description:
      'Japanese noodles made from buckwheat flour, served chilled with a dipping sauce or in a hot broth.',
    category: 'Asian Cuisine',
    subCategory: 'Noodles & Pasta',
  },
  {
    name: 'Spaghetti Carbonara',
    description:
      'Italian pasta dish from Rome made with egg, hard cheese, cured pork, and black pepper.',
    category: 'European Cuisine',
    subCategory: 'Noodles & Pasta',
  },

  // European Cuisine & Salads
  {
    name: 'Greek Salad',
    description:
      'Salad made with pieces of tomatoes, sliced cucumbers, onion, feta cheese, and olives.',
    category: 'European Cuisine',
    subCategory: 'Salads',
  },
  {
    name: 'Salad Niçoise',
    description:
      'French salad from Nice, made with tomatoes, tuna, hard-boiled eggs, Niçoise olives, and anchovies.',
    category: 'European Cuisine',
    subCategory: 'Salads',
  },
  {
    name: 'Caprese Salad',
    description:
      'Simple Italian salad, made of sliced fresh mozzarella, tomatoes, and sweet basil.',
    category: 'European Cuisine',
    subCategory: 'Salads',
  },
  {
    name: 'Coleslaw',
    description:
      'Salad consisting primarily of finely-shredded raw cabbage with a salad dressing, commonly mayonnaise.',
    category: 'American Cuisine',
    subCategory: 'Salads',
  },
  {
    name: 'Tabouleh',
    description:
      'Levantine vegetarian salad made of tomatoes, finely chopped parsley, mint, bulgur, and onion.',
    category: 'Asian Cuisine',
    subCategory: 'Salads',
  },

  // American Cuisine & Snacks/Street Food
  {
    name: 'Hot Dog',
    description:
      'Grilled or steamed sausage served in the slit of a partially sliced bun.',
    category: 'American Cuisine',
    subCategory: 'Snacks/Street Food',
  },
  {
    name: 'Burger',
    description:
      'Sandwich consisting of one or more cooked patties of ground meat, placed inside a sliced bread roll or bun.',
    category: 'American Cuisine',
    subCategory: 'Snacks/Street Food',
  },
  {
    name: 'Nachos',
    description:
      'Dish from northern Mexico that consists of heated tortilla chips or totopos covered with melted cheese.',
    category: 'American Cuisine',
    subCategory: 'Snacks/Street Food',
  },
  {
    name: 'Tacos',
    description:
      'Traditional Mexican dish consisting of a corn or wheat tortilla folded or rolled around a filling.',
    category: 'American Cuisine',
    subCategory: 'Snacks/Street Food',
  },
  {
    name: 'Empanadas',
    description:
      'Baked or fried pastries stuffed with a variety of fillings, popular in Latin America.',
    category: 'American Cuisine',
    subCategory: 'Snacks/Street Food',
  },

  // African Cuisine & Desserts
  {
    name: 'Malva Pudding',
    description:
      'South African dessert with apricot jam and a spongy caramelized texture.',
    category: 'African Cuisine',
    subCategory: 'Desserts',
  },
  {
    name: 'Baklava',
    description:
      'Rich, sweet dessert pastry made of layers of filo filled with chopped nuts and sweetened with syrup or honey.',
    category: 'Asian Cuisine',
    subCategory: 'Desserts',
  },
  {
    name: 'Mochi',
    description:
      'Japanese rice cake made of mochigome, a short-grain japonica glutinous rice.',
    category: 'Asian Cuisine',
    subCategory: 'Desserts',
  },
  {
    name: 'Tiramisu',
    description:
      'Coffee-flavoured Italian dessert made of ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese.',
    category: 'European Cuisine',
    subCategory: 'Desserts',
  },
  {
    name: 'Apple Pie',
    description:
      'Pie in which the principal filling ingredient is apple, encased in pastry and baked until the apple filling is tender.',
    category: 'American Cuisine',
    subCategory: 'Desserts',
  },

  // Additional categories and subCategories can be similarly filled out.
];

type RestaurantAndFoods = {
  name: string;
  foods: string[];
};
export const dummyRestaurantFoods: RestaurantAndFoods[] = [
  {
    name: 'The Lotus Pond',
    foods: ['Pho', 'Malva Pudding', 'Salad Niçoise', 'Apple Pie', 'Soba'],
  },
  { name: 'Roma Cucina', foods: ['Pad Thai', 'Nachos', 'Baklava', 'Soba'] },
  {
    name: 'Sakura Sushi',
    foods: ['Burger', 'Ramen', 'Greek Salad', 'Apple Pie', 'Nachos'],
  },
  {
    name: 'Le Petit Croissant',
    foods: ['Mochi', 'Caprese Salad', 'Pad Thai', 'Salad Niçoise'],
  },
  {
    name: 'Bean There Done That',
    foods: ['Malva Pudding', 'Pad Thai', 'Salad Niçoise', 'Soba', 'Pho'],
  },
  {
    name: 'Taco Libre',
    foods: ['Tiramisu', 'Hot Dog', 'Greek Salad', 'Soba', 'Nachos'],
  },
  {
    name: 'Green Sprout',
    foods: ['Apple Pie', 'Malva Pudding', 'Tiramisu', 'Empanadas'],
  },
  {
    name: "Ocean's Bounty",
    foods: ['Pad Thai', 'Burger', 'Nachos', 'Greek Salad', 'Ramen'],
  },
  {
    name: 'Skyline Eats',
    foods: ['Caprese Salad', 'Mochi', 'Salad Niçoise', 'Pho'],
  },
  {
    name: 'Family Feast',
    foods: ['Soba', 'Apple Pie', 'Pho', 'Salad Niçoise', 'Baklava'],
  },
  {
    name: 'Fusion Fantasia',
    foods: ['Hot Dog', 'Ramen', 'Empanadas', 'Tiramisu', 'Burger'],
  },
  {
    name: 'Brunch & Munch',
    foods: ['Caprese Salad', 'Mochi', 'Tacos', 'Greek Salad'],
  },
  {
    name: 'Burgers & Brews',
    foods: [
      'Malva Pudding',
      'Spaghetti Carbonara',
      'Salad Niçoise',
      'Apple Pie',
    ],
  },
  {
    name: 'The Prime Rib',
    foods: ['Nachos', 'Ramen', 'Salad Niçoise', 'Mochi', 'Baklava'],
  },
  {
    name: 'Trattoria Bella',
    foods: ['Pad Thai', 'Pho', 'Caprese Salad', 'Apple Pie', 'Greek Salad'],
  },
  {
    name: 'Grill & Chill',
    foods: ['Tacos', 'Soba', 'Hot Dog', 'Empanadas', 'Spaghetti Carbonara'],
  },
  {
    name: 'Cocktail Corner',
    foods: ['Burger', 'Ramen', 'Greek Salad', 'Tiramisu', 'Malva Pudding'],
  },
  {
    name: 'Thai Spice',
    foods: ['Caprese Salad', 'Nachos', 'Tacos', 'Pho', 'Mochi'],
  },
  {
    name: 'City View Terrace',
    foods: [
      'Baklava',
      'Empanadas',
      'Spaghetti Carbonara',
      'Salad Niçoise',
      'Hot Dog',
    ],
  },
];
