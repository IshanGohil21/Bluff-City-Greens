let today = new Date();
var weekNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
let week = weekNames[(today.getDate() -2 )]+ ' '+today.getDate() +' '+today.getFullYear();
let week1 = weekNames[(today.getDate() -1 )]+ ' '+today.getDate() +' '+today.getFullYear();
let week2 = weekNames[(today.getDate()  )]+ ' '+today.getDate() +' '+today.getFullYear();
let week3 = weekNames[(today.getDate()  +1)]+ ' '+today.getDate() +' '+today.getFullYear();

let data = [
    {title: 'Order Placed', description: week},
    {title: 'Packed', description: week1},
    {title: 'Shipped', description: week2},
    {title: 'Delivery', description: week3},
]
export default data;