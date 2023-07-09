const { destroyLineItem } = require("./adapters/lineItems");

const users = [
  {
    username: "Angels",
    password: "angels",
    email: "angels@gmail.com",
    is_admin: "true",
  },
  {
    username: "user1",
    password: "password1",
    email: "user1@gmail.com",
    is_admin: "false",
  },
  {
    username: "user2",
    password: "password2",
    email: "user2@gmail.com",
    is_admin: "false",
  },
  {
    username: "user3",
    password: "password3",
    email: "user3@gmail.com",
    is_admin: "false",
  },
];
// I'm not sure how to get to the direct image?
// maybe like 'https://google.com/frog_figurine1.jpeg'
// anyone know?
const products = [
  {
    name: "Hungry Frog Statue",
    description: "A cute frog rubbing its belly",
    price: 10.99,
    image: "https://h2.commercev3.net/cdn.brecks.com/images/800/76630.jpg",
    inventory: 10,
    category: "Figurines",
  },
  {
    name: "Frog Figurine",
    description: "A small terrifying frog/blobfish figurine",
    price: 8.99,
    image:
      "https://i.etsystatic.com/21853380/r/il/eb7b74/3713629024/il_1588xN.3713629024_qyvv.jpg",
    inventory: 5,
    category: "Figurines",
  },
  {
    name: "Sitting Frog Figurine",
    description: "A large frog sitting frog style",
    price: 15.99,
    image: "https://marquiswatergardens.com/products/campania-frankie-frog",
    inventory: 5,
    category: "Figurines",
  },
  {
    name: "Ballet Frog",
    description: "A small ballerina frog",
    price: 12.99,
    image: "https://m.media-amazon.com/images/I/51i8UHaajML._AC_SL1500_.jpg",
    inventory: 5,
    category: "Figurines",
  },
  {
    name: "Frog Art",
    description: "An artistic frog painting",
    price: 29.99,
    image: "https://i.icanvas.com/DCR61?d=3&sh=s&s=xl&p=1&bg=g&t=1660233717",
    inventory: 3,
    category: "Artwork",
  },
  {
    name: "Bayou Frog",
    description: "A frog painting down by the bayou",
    price: 39.99,
    image: "https://pixels.com/featured/frog-art-ian-mitchell.html",
    inventory: 2,
    category: "Artwork",
  },
  {
    name: "Colorful Frog Painting",
    description: "Psychedelic frog art",
    price: 27.99,
    image:
      "https://render.fineartamerica.com/images/rendered/default/acrylic-print/8/8/hangingwire/break/images/artworkimages/medium/2/psychedelic-frog-dean-russo-exclusive.jpg",
    inventory: 2,
    category: "Artwork",
  },
  {
    name: "Froggy No Sun Burny",
    description: "A wrinkled frog with a hat",
    price: 22.99,
    image:
      "https://i.etsystatic.com/20373455/r/il/b28b3c/2838797327/il_1588xN.2838797327_2yxn.jpg",
    inventory: 2,
    category: "Artwork",
  },
  {
    name: "FRog Rides a Mushroom Painting",
    description: "A canvas print of a colorful frog on a mushroom",
    price: 44.95,
    image:
      "https://images.squarespace-cdn.com/content/v1/53c471aee4b0cdf4d64c4941/1564516048423-PDMEMG3MYVPLSEGHME5L/final+web.jpg?format=1500w",
    inventory: 2,
    category: "Artwork",
  },
  {
    name: "The Frog Warrior Painting",
    description: "Artwork featuring a frog with a robe",
    price: 17.99,
    image: "https://i.icanvas.com/DGZ20?d=3&sh=v&s=xl&p=1&bg=g&t=1650556091",
    inventory: 2,
    category: "Artwork",
  },
  {
    name: "Frog Suit",
    description: "Green frog-themed costume",
    price: 39.99,
    image: "https://m.media-amazon.com/images/I/51YEUxP7W2L._AC_UX679_.jpg",
    inventory: 10,
    category: "Clothing",
  },
  {
    name: "Frog Dress",
    description: "Stylish frog-patterned dress",
    price: 29.99,
    image: "frog_dress.jpeg",
    inventory: 6,
    category: "Clothing",
  },
  {
    name: "Kermit Frog Dress",
    description: "kermit the frog-themed gown",
    price: 49.99,
    image:
      "https://ih1.redbubble.net/image.4602814981.9680/aldr,x1440,front-c,168,326,600,600-bg,f8f8f8.jpg",
    inventory: 3,
    category: "Clothing",
  },
  {
    name: "Frog Jacket",
    description: "Warm frog-printed jacket",
    price: 79.99,
    image: "frog_jacket.jpeg",
    inventory: 5,
    category: "Clothing",
  },
  {
    name: "Frog Hoodie",
    description: "Cozy frog-themed hoodie",
    price: 59.99,
    image: "https://m.media-amazon.com/images/I/71Es1F4M5hL._AC_UX679_.jpg",
    inventory: 7,
    category: "Clothing",
  },
  {
    name: "Forg Shirt",
    description: "FORG shirt",
    price: 19.99,
    image:
      "https://images.lookhuman.com/render/standard/yQsURDL8d9E2noOtRsiEsR8bnpG0Tphg/2007-white-z1-t-forg.jpg",
    inventory: 12,
    category: "Clothing",
  },
  {
    name: "Moody Frog Shirt",
    description: "If I am moody give me foody t-shirt",
    price: 14.99,
    image:
      "https://images.lookhuman.com/render/standard/uxqcS5aFu0Riv06rye7XgUj8dzwkhwNa/2007-white-z1-t-if-i-m-moody-give-me-foody.jpg",
    inventory: 8,
    category: "Clothing",
  },
  {
    name: "Just a Froggy Girl Shirt",
    description: "Frog lover's tshirt",
    price: 17.99,
    image:
      "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C91NIcabuwdL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UX679_.png",
    inventory: 9,
    category: "Clothing",
  },
  {
    name: "No Thoughts, Just Frog Shirt",
    description: "only frogs shirt",
    price: 16.99,
    image:
      "https://images.lookhuman.com/render/standard/Kej4Xi7crNN1Vw1p5PooArbxBRhQovhd/3600-red-z1-t-no-thoughts-just-frog.jpg",
    inventory: 6,
    category: "Clothing",
  },
  {
    name: "Frog Hat",
    description: "Stylish frog-themed hat",
    price: 9.99,
    image: "https://m.media-amazon.com/images/I/712K727LwqL._AC_UX679_.jpg",
    inventory: 15,
    category: "Accessories",
  },
  {
    name: "Frog Bucket Hat",
    description: "Crocheted frog cap",
    price: 12.99,
    image:
      "https://i.etsystatic.com/27520890/r/il/9d2371/3736408245/il_1588xN.3736408245_dszw.jpg",
    inventory: 11,
    category: "Accessories",
  },
  {
    name: "Froggy Hat",
    description: "Frog Hat with arms and legs",
    price: 11.99,
    image:
      "https://static.platform.michaels.com/2c-prd/546375517457568.jpeg?fit=inside|540:540",
    inventory: 13,
    category: "Accessories",
  },
  {
    name: "Frog Hooded Hat",
    description: "Frog hood-like hat with eyes",
    price: 14.99,
    image:
      "https://i5.walmartimages.com/asr/31e486c5-02f0-4c79-99ef-cf9c679aa49b.e07eead1bcd27360a04e3439409b03d5.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    inventory: 9,
    category: "Accessories",
  },
  {
    name: "Frog Plate",
    description: "Frog-shaped decorative plate",
    price: 750.99,
    image:
      "https://cdn0.rubylane.com/_podl/item/992373/TB-2328/Weller-Art-Pottery-Coppertone-Frog-Bowl-pic-1A-720x2%3a10.10-db618029-f.webp",
    inventory: 5,
    category: "Home Goods",
  },
  {
    name: "Toddler Frog Plate",
    description: "Sectioned frog plate for toddler",
    price: 19.99,
    image:
      "https://assets.maisonette.com/spree/images/attachments/000/667/036/product_large/mfunfqn232itk2vp6ksu.jpg?1648479787=&width=1140&format=webp&crop=1%3A1",
    inventory: 8,
    category: "Home Goods",
  },
  {
    name: "Ceramic Frog Bowl",
    description: "Ceramic frog dish",
    price: 14.99,
    image:
      "fhttps://www.fubiz.net2015/10/08/animal-handmade-ceramic-bowls-and-plates/handmadeplatesbowls1/",
    inventory: 10,
    category: "Home Goods",
  },
  {
    name: "Frog Plate For Babies",
    description: "Frog-themed babay plate",
    price: 29.99,
    image:
      "https://m.media-amazon.com/images/I/51WeKDTfThL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    inventory: 6,
    category: "Home Goods",
  },
  {
    name: "Upside Down Frog Mug",
    description: "Cute frog-shaped mug",
    price: 12.99,
    image: "https://m.media-amazon.com/images/I/61zPZTyp2hL._AC_SX679_.jpg",
    inventory: 12,
    category: "Home Goods",
  },
  {
    name: "Frog Cup With Frog Spoon",
    description: "Colorful frog-printed cup",
    price: 9.99,
    image: "https://m.media-amazon.com/images/I/41nu+uaZMBL._AC_.jpg",
    inventory: 15,
    category: "Home Goods",
  },
  {
    name: "Frog Coffee Cup",
    description: "Frog-themed coffee cup",
    price: 11.99,
    image:
      "https://cdn.shopify.com/s/files/1/0302/1504/5252/products/1559864432_1024x1024.jpg?v=1651769362",
    inventory: 13,
    category: "Home Goods",
  },
  {
    name: "Smiling Frog Cup with Saucer",
    description: "Whimsical frog-patterned mug",
    price: 14.99,
    image:
      "https://m.media-amazon.com/images/I/41o-d31gqlL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
    inventory: 9,
    category: "Home Goods",
  },
  {
    name: "Fleece Dancing Frog Blanket",
    description:
      "Super soft and cozy fleece blanket with frogs dancing on lily pads",
    price: 34.99,
    image:
      "https://c3.staticsfly.com/asset/fetch/cs/BLNKT_FLEECE03-D12329921_FRONT/thumbnail.preview/v1",
    inventory: 11,
    category: "Home Goods",
  },
  {
    name: "Smiling Frog Blanket",
    description: "Flannelette blanket with cartoon cmiling frog print",
    price: 15.99,
    image:
      "https://img.ltwebstatic.com/images3_pi/2023/05/02/16830059049305ce6f02b2cbbfefdb2c3841a846fa_thumbnail_600x.jpg",
    inventory: 15,
    category: "Home Goods",
  },
  {
    name: "Frogs At Battle Blanket",
    description: "Soft fleece blanket depicting frogs at war",
    price: 29.99,
    image:
      "https://i.etsystatic.com/24944523/r/il/fc6694/2737082026/il_1588xN.2737082026_s49j.jpg",
    inventory: 20,
    category: "Home Goods",
  },
  {
    name: "Cute Frog Cardigan",
    description: "Woven green frog and mushroom cardigan",
    price: 13.99,
    image:
      "https://img.ltwebstatic.com/images3_pi/2022/09/09/1662705913385289f3ca649013e39c31103f8f65ad_thumbnail_600x.jpg",
    inventory: 25,
    category: "Clothing",
  },
  {
    name: "Frog Tights",
    description:
      "Frog tights that have a sweet frog sitting on top of your knees",
    price: 12.99,
    image:
      "https://cdn.media.amplience.net/s/hottopic/20292366_hi?$productMainDesktopRetina$",
    inventory: 5,
    category: "Clothing",
  },
  {
    name: "Frog and Mushroom Jeans",
    description: "Worn in jeans with embroidered frogs sitting on mushrooms",
    price: 54.99,
    image:
      "https://cdn.media.amplience.net/s/hottopic/20435423_hi?$productMainDesktopRetina$",
    inventory: 6,
    category: "Clothing",
  },
  {
    name: "Bright Tree Frog Leggings",
    description: "Spandex tree frog leggings. Shiny material",
    price: 20.99,
    image:
      "https://www.dhresource.com/webp/m/0x0/f2/albu/g7/M00/4A/B7/rBVaSVvelB2Ad2IJAAG3VMLRLdA332.jpg",
    inventory: 30,
    category: "Clothing",
  },
  {
    name: "Frog Bed Set",
    description: "Frog bed set for twin size mattress",
    price: 55.99,
    image: "https://m.media-amazon.com/images/I/71Tb2iuOYML._AC_SX679_.jpg",
    inventory: 5,
    category: "Home Goods",
  },
  {
    name: "Frog Ring",
    description: "Green and white gemstones in 24k gold ring",
    price: 200.99,
    image:
      "https://img.ltwebstatic.com/images3_pi/2021/09/14/163158123585b3e7b6a51912443d7a4b625006db5e_thumbnail_600x.jpg",
    inventory: 20,
    category: "Jewelry",
  },
  {
    name: "Frog Umbrella",
    description: "Green frog umbrella with raised eyeballs",
    price: 25.99,
    image:
      "https://img.buzzfeed.com/buzzfeed-static/static/2015-12/17/16/enhanced/webdr06/original-21117-1450386307-4.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto",
    inventory: 12,
    category: "Accessories",
  },
  {
    name: "Frog Sponge Holder",
    description: "Ceraminc frog that holds your dish sponge",
    price: 12.99,
    image:
      "http://www.amazon.com/gp/product/B000I1UR7M/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B000I1UR7M&linkCode=as2&tag=luvfrogs-20",
    inventory: 23,
    category: "Home Goods",
  },
  {
    name: "Frog Earrings",
    description: "Grumpy frog earrings",
    price: 12.99,
    image:
      "https://i.etsystatic.com/13069243/r/il/df1b23/1695788653/il_1588xN.1695788653_2jv3.jpg",
    inventory: 27,
    category: "Jewelry",
  },
  {
    name: "Silver Frog Earrings",
    description: "Sterling silver frog earrings",
    price: 50.99,
    image:
      "https://i.etsystatic.com/27765646/r/il/90e39c/3555509194/il_1588xN.3555509194_k0cz.jpg",
    inventory: 50,
    category: "Jewelry",
  },
  {
    name: "Gold Frog Earrings",
    description: "24k gold frog earrings",
    price: 80.99,
    image:
      "https://i.etsystatic.com/43775618/r/il/ece0de/5066500897/il_1588xN.5066500897_9edr.jpg",
    inventory: 25,
    category: "Jewelry",
  },
  {
    name: "Glass Frog Earrings",
    description: "Green and red glass frog earrings",
    price: 20.99,
    image:
      "https://i.etsystatic.com/27796374/r/il/73456f/4368953267/il_1588xN.4368953267_afyk.jpg",
    inventory: 19,
    category: "Jewelry",
  },
  {
    name: "Frog Slippers",
    description: "Frog slippers that look like you have webbed froggy feet",
    price: 12.99,
    image:
      "https://i.etsystatic.com/5524342/r/il/bde5fd/1738332372/il_1588xN.1738332372_jqal.jpg",
    inventory: 70,
    category: "Accessories",
  },
  {
    name: "Frog Tote",
    description: "Canvas frog tote with two frogs riding a bike",
    price: 10.99,
    image:
      "https://i.etsystatic.com/35225642/r/il/fc67dc/4698365545/il_1588xN.4698365545_rdog.jpg",
    inventory: 50,
    category: "Accessories",
  },
  {
    name: "Comfy Frog Slippers",
    description: "Super cushioned frog slippers",
    price: 9.99,
    image:
      "https://i.etsystatic.com/44241450/r/il/a54e54/4976716890/il_1588xN.4976716890_mc7e.jpg",
    inventory: 45,
    category: "Accessories",
  },
  {
    name: "Crystal Frogs",
    description: "Frogs sculpted from crystal",
    price: 30.99,
    image:
      "https://i.etsystatic.com/32162086/r/il/1340c2/3770861860/il_1588xN.3770861860_lieh.jpg",
    inventory: 12,
    category: "Figurines",
  },
  {
    name: "Cowboy Frog Neon Sign",
    description: "Sherrif frog neon sign",
    price: 168.99,
    image:
      "https://i.etsystatic.com/37863245/r/il/3e3873/4632448694/il_1588xN.4632448694_qlul.jpg",
    inventory: 12,
    category: "Artwork",
  },
  {
    name: "Tiger's Eye Frog Figurines",
    description: "Pack of 8 small frog figurines sculpted from tiger's eye",
    price: 5.99,
    image:
      "https://i.etsystatic.com/22604435/r/il/dd4981/3979177841/il_1588xN.3979177841_l7ry.jpg",
    inventory: 28,
    category: "Figurines",
  },
  {
    name: "Frog Bracelet",
    description: "Braided hemp bracelet with silver frog charm",
    price: 16.99,
    image:
      "https://i.etsystatic.com/10651880/r/il/260b70/4061726824/il_1588xN.4061726824_jyht.jpg",
    inventory: 26,
    category: "Jewelry",
  },
  {
    name: "Frog Headband",
    description: "Headband with foliage and a frog",
    price: 25.99,
    image:
      "https://i.etsystatic.com/7528079/r/il/720c29/4889695976/il_1588xN.4889695976_ct59.jpg",
    inventory: 15,
    category: "Accessories",
  },
  {
    name: "Interesting Frog Sculpture",
    description: "Small ceramic frog sculpture",
    price: 200.99,
    image:
      "https://i.etsystatic.com/21853380/r/il/55ffcd/3551622838/il_1588xN.3551622838_n9kx.jpg",
    inventory: 500,
    category: "Figurines",
  },
  {
    name: "Friendly Frog Statue",
    description: "Happy and friendly frog statue",
    price: 14.99,
    image:
      "https://i.etsystatic.com/18226783/r/il/122e17/3069489090/il_1588xN.3069489090_msal.jpg",
    inventory: 60,
    category: "Home Goods",
  },
  {
    name: "Bird Watcher Frog Statue",
    description: "Copper handmade sculpture",
    price: 550.99,
    image:
      "https://i.etsystatic.com/9107857/r/il/8ffb34/1738434317/il_1588xN.1738434317_3twg.jpg",
    inventory: 20,
    category: "Home Goods",
  },
  {
    name: "Starbucks Frog Tumbler",
    description: "Plastic tumbler with straw",
    price: 2.99,
    image:
      "https://i.etsystatic.com/25266613/r/il/48c2b0/3692127588/il_1588xN.3692127588_1w9j.jpg",
    inventory: 60,
    category: "Home Goods",
  },
  {
    name: "Frog Charm Necklace",
    description: "Silver frog necklace with gemstone charm",
    price: 28.99,
    image:
      "https://i.etsystatic.com/5402200/r/il/0a34e8/1387646243/il_1588xN.1387646243_ccod.jpg",
    inventory: 27,
    category: "Jewelry",
  },
  {
    name: "Crystal Frog Necklaces",
    description: "Pack of 7 gemstone frog necklaces",
    price: 99.99,
    image:
      "https://i.etsystatic.com/35475736/r/il/4c2b00/4286015275/il_1588xN.4286015275_m66m.jpg",
    inventory: 28,
    category: "Jewelry",
  },
  {
    name: "Frog Coasters",
    description: "Obsidian frog coasters",
    price: 20.99,
    image:
      "https://i.etsystatic.com/23172650/r/il/ef205b/4423911665/il_1588xN.4423911665_tljh.jpg",
    inventory: 50,
    category: "Home Goods",
  },
  {
    name: "Frog Paper Weight",
    description: "Resin copper and glitter paper weight",
    price: 20.99,
    image:
      "https://i.etsystatic.com/10600361/r/il/f53820/4529749306/il_1588xN.4529749306_kdom.jpg",
    inventory: 80,
    category: "Home Goods",
  },
  {
    name: "Yoga Frog Neon Sign",
    description: "Frog sitting Padmasana meditating",
    price: 300.99,
    image:
      "https://i.etsystatic.com/38066862/r/il/95ed04/4847443035/il_1588xN.4847443035_6wga.jpg",
    inventory: 60,
    category: "Home Goods",
  },
  {
    name: "Frog Socks",
    description: "Black ankle socks with happy frogs",
    price: 5.99,
    image:
      "https://i.etsystatic.com/25932896/r/il/e476c0/3465800708/il_1588xN.3465800708_7xl1.jpg",
    inventory: 50,
    category: "Accessories",
  },
  {
    name: "Jade Frog Ring",
    description: "Jade frog ring with carnelian and a gold band",
    price: 200.99,
    image:
      "https://i.etsystatic.com/32862566/r/il/cc4e9a/4262429849/il_1588xN.4262429849_38y0.jpg",
    inventory: 52,
    category: "Jewelry",
  },
  {
    name: "Opal and Silver Frog Necklace",
    description: "Climbing frog neckalce made from opal and sterling silver",
    price: 60.99,
    image:
      "https://i.etsystatic.com/19608917/r/il/62ea0a/2117206643/il_1588xN.2117206643_7bww.jpg",
    inventory: 75,
    category: "Jewelry",
  },
  {
    name: "Ceramic Frogs Riding 2 Wheels",
    description: "Collectable frog figurines riding a scooter and a bicycle",
    price: 25.99,
    image:
      "https://i.etsystatic.com/40284746/r/il/6e1dfd/4994073149/il_1588xN.4994073149_5jr0.jpg",
    inventory: 28,
    category: "Figurines",
  },
  {
    name: "Frog Door Stopper",
    description: "Crocheted frog door stopper",
    price: 7.99,
    image:
      "https://i.etsystatic.com/10219056/r/il/c8024d/4983246796/il_1588xN.4983246796_r6px.jpg",
    inventory: 80,
    category: "Home Goods",
  },
  {
    name: "Regal Frog Painting",
    description: "Oval painting of a gentlman frog",
    price: 40.99,
    image:
      "https://i.etsystatic.com/16633833/r/il/bbadce/5074112875/il_1588xN.5074112875_cdow.jpg",
    inventory: 60,
    category: "Artwork",
  },
  {
    name: "Grumpy Frog Print",
    description: "Grumpy frog just took a shower and isn't happy painting",
    price: 31.99,
    image:
      "https://i.etsystatic.com/9539065/r/il/3771fb/5015492716/il_1588xN.5015492716_f52w.jpg",
    inventory: 80,
    category: "Artwork",
  },
  {
    name: "Frog Travel Mug",
    description: "Frog playing a laud",
    price: 25.99,
    image:
      "https://i.etsystatic.com/37787019/r/il/16a30f/4408451167/il_1588xN.4408451167_8bf8.jpg",
    inventory: 8,
    category: "Home Goods",
  },
  {
    name: "Frog Purse",
    description: "Crossbody frog bags",
    price: 50.99,
    image:
      "https://i.etsystatic.com/36478979/r/il/147ad2/4100203234/il_1588xN.4100203234_lahb.jpg",
    inventory: 90,
    category: "Accessories",
  },
  {
    name: "Handmade Frog Mug",
    description: "Cermanic mug. Dishwasher and microwave safe",
    price: 43.99,
    image:
      "https://i.etsystatic.com/8043995/r/il/4b5446/2441858052/il_1588xN.2441858052_3ca6.jpg",
    inventory: 87,
    category: "Home Goods",
  },
  {
    name: "Frog Salt and Pepper Shakers",
    description: "Salt and pepper shakers includes saucer with handle",
    price: 18.99,
    image:
      "https://i.etsystatic.com/18270888/r/il/8a614c/2247082595/il_1588xN.2247082595_ts4t.jpg'",
    inventory: 82,
    category: "Home Goods",
  },
  {
    name: "Frog and Mushroom Salt and Pepper Shakers",
    description: "Smiling frog holing a mushroom",
    price: 11.99,
    image:
      "https://i.etsystatic.com/25493808/r/il/334d99/4869993443/il_1588xN.4869993443_ljvt.jpg",
    inventory: 50,
    category: "Home Goods",
  },
  {
    name: "Relaxed Frog Salt and Pepper Shakers",
    description:
      "Laid back frogd salt and pepper shakers are ceramic and handmade",
    price: 16.99,
    image:
      "https://i.etsystatic.com/5148329/r/il/62cb9e/4990188021/il_1588xN.4990188021_nzbx.jpg",
    inventory: 70,
    category: "Home Goods",
  },
  {
    name: "Flower Frogs Salt and Pepper Shakers",
    description:
      "Cute Frog shaker with yellow flower hats are ceramic and handmade",
    price: 22.99,
    image:
      "https://i.etsystatic.com/27714082/r/il/b823a3/3682809819/il_1588xN.3682809819_ko1h.jpg",
    inventory: 52,
    category: "Home Goods",
  },
  {
    name: "Frog T-shirt",
    description: "Green shirt with a cartoon style frog on it",
    price: 18.99,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/81tlTtJyHGL._AC_UL1500_.jpg",
    inventory: 27,
    category: "Clothing",
  },
  {
    name: "Frog moon shirt",
    description: "Shirt with a frog on a tree branch in front of the moon",
    price: 24.99,
    image: "https://www.animalshirts.net/frogshirts/frogmoon.jpg",
    inventory: 35,
    category: "Clothing",
  },
  {
    name: "Frog skirt",
    description: "Skirt with green and pink frog pattern",
    price: 21.99,
    image:
      "https://i.pinimg.com/originals/7a/59/98/7a599846ce97c77bb3d46a1b8f8e7210.png",
    inventory: 52,
    category: "Clothing",
  },
  {
    name: "Vintage frog skirt",
    description: "Long vintage frog skirt with pockets",
    price: 30.99,
    image:
      "https://i.etsystatic.com/9241325/r/il/b30dd0/756427274/il_fullxfull.756427274_fpb8.jpg",
    inventory: 27,
    category: "Clothing",
  },
  {
    name: "Bikini Frog",
    description: "Statue of a frog in a bikini",
    price: 35.0,
    image:
      "https://img1.etsystatic.com/000/0/5132951/il_fullxfull.27120109.jpg",
    inventory: 100,
    category: "Figurines",
  },
  {
    name: "Frog bucket hat",
    description: "Frog themed bucket hat",
    price: 18.99,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71p0UT3hD+L._AC_UL1500_.jpg",
    inventory: 25,
    category: "Accessorys",
  },
  {
    name: "Skateboard frog hoodie",
    description: "Hoodie with a cartoon frog riding a skateboad on it",
    price: 44.99,
    image: "https://m.media-amazon.com/images/I/61M1f5gD25L._AC_UL1500_.jpg",
    inventory: 47,
    category: "Clothing",
  },
  {
    name: "Birdwatching frog",
    description: "Statue of a frog watching for birds",
    price: 33.99,
    image:
      "https://i.pinimg.com/736x/53/cf/87/53cf87416551bb5e3a294262b12b2a31--outdoor-statues-garden-statues.jpg",
    inventory: 21,
    category: "Figurines",
  },
  {
    name: "Frog teapot",
    description: "Green frog teapot",
    price: 44.99,
    image:
      "https://www.pussnpoochgallery.com.au/WebRoot/ecshared01/Shops/pussnpooch/5893/B94E/9084/EAFF/6CE3/AC10/003F/AD82/OG2013.jpg",
    inventory: 36,
    category: "Home Goods",
  },
  {
    name: "Frog T-shirt 2",
    description: "Frogs climbing a tree peace sign shirt",
    price: 25.99,
    image: "https://www.animalshirt.net/wp-content/uploads/2013/09/10-2289.jpg",
    inventory: 53,
    category: "Clothing",
  },

  // please help!  :)  we need hundreds, I started with the ones we have images for
];

const orders = [
  { user_id: 1, is_cart: true },
  { user_id: 2, is_cart: false },
  // can add more
];

const lineItems = [
  { order_id: 1, product_id: 1, quantity: 2 },
  { order_id: 1, product_id: 2, quantity: 1 },
  { order_id: 2, product_id: 2, quantity: 3 },
  // we can adjust as we want of course
];

module.exports = { users, products, orders, lineItems };
