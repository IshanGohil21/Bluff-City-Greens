import { Images } from '../CommonConfig/CommonConfig';

let Fruits =
{
    id: 0,
    images: Images.fruits,
    Pname: 'Fruit & Vegetables',
    subname: [

        {
            id: 0,
            nameF: 'Fresh Vegetables',
            items: [
                {
                    id: 101,
                    nameV: 'Freso Carrot',
                    i: Images.carrot3,
                    weight: ['1kg', '2kg', '3kg'],
                    price: '$2.63',
                    priceD: '$2.10'
                },
            ],
                
                img: Images.freshV,
        },
        {
            id: 1,
            nameF: 'Herbs & Seasonings',
            img: Images.herbs,
        },
        {
            id: 2,
            nameF: 'Fresh Fruits',
            img: Images.freshF,
        },
        {
            id: 3,
            nameF: 'Exotic Fruits & Veggies',
            img: Images.exotic,
        },
        {
            id: 4,
            nameF: 'Organic Fruits & Vegetables',
            img: Images.organicV,
        },
        {
            id: 5,
            nameF: 'Seasonal',
            img: Images.seasonal,
        },
    ],
    color: '#024493'
}


export default Fruits;