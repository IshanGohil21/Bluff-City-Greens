import { Images } from '../CommonConfig/CommonConfig'

let PastOrder = [
    {
        id: 1, 
        weight: ['1 Kg', '2 Kg', '3 Kg'],
        fruitimages: [
            Images.lychee1,
            Images.lychee2, 
            Images.lychee3,
            
        ],
        price: 4.83,
        discountedPrice: 4.40,
        name: 'Lychee',
        details: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        isFavorite: true,
        bgColor: '#CA85C3'
    },

    {
        id: 2, 
        weight: ['1 Kg', '2 Kg', '3 Kg'],
        fruitimages: [
        Images.orange1,
        Images.orange2, 
        Images.orange3
        ],
        price: 4.83,
        discountedPrice: 3.40,
        name: 'Oranges',
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        isFavorite: true,
        bgColor: '#78af32'
    }
]

export default PastOrder;