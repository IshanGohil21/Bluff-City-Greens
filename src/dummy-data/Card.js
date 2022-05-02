import { Images } from '../CommonConfig/CommonConfig';
 
let Card = [
    {
        id:0,
        number: ' 1234 1234 1234 9011',
        name: 'Katie Richards',
        valid: '02/22',
        email: 'katie.richards@gmail.com',
        CVV: '880',
        brand: 'Visa',
        image: Images.visa,
    },

    {
        id:1,
        number: '1234 5678 1234 9011',
        name: 'Katie Richards',
        email: 'Katie.richards@gmail.com',
        valid: '02/22',
        CVV: '880',
        brand: 'American Express',
        image: Images.UsaExpress,
    },
     
    {
        id: 3,
        number : '1234 5678 1234 2445',
        name: 'John Deo',
        email: 'john.deo@email.com',
        CVV: '880',
        valid: '02/2022',
        brand: 'Discover',
        image: Images.mastercard

    }
]
export default Card;