import { Images } from '../CommonConfig/CommonConfig'

let RecommendedProducts = [
    {
        id: 0, 
        weight: ['1 Kg', '2 Kg', '3 Kg'],
        fruitimages: [
        Images.carrot1,
        Images.carrot2, 
        Images.carrot3
        ],
        price: '$3.83',
        discountedPrice: '$2.40',
        name: 'Carrot',
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        isFavorite: true
    },

    {
        id: 1, 
        weight: ['1 Kg', '2 Kg', '3 Kg'],
        fruitimages: [
        Images.lettuce1,
        Images.lettuce2, 
        Images.lettuce3
        ],
        price: '$2.83',
        discountedPrice: '$1.40',
        name: 'Lettuce',
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        isFavorite: true
    }
]

export default RecommendedProducts;