import React, { useState, useMemo } from 'react';
// You have been given a list of items you shopped from the grocery store
// You need to calculate the total amount of money you spent

export const Assignment3 = () => {
    const [items, setItems] = useState([
        { name: 'Chocolates', value: 50 },
        { name: 'Chips', value: 20 },
        { name: 'Onion', value: 30 },
        { name: 'Tomato', value: 30 },
        // Add more items as needed
        { name: 'Milk', value: 25},
        { name: 'Bread', value: 15},
        { name: 'Butter', value: 35},
        { name: 'Cheese', value: 45},
        { name: 'Eggs', value: 40},
        { name: 'Salt', value: 10},
    ]);

    // Your code starts here
    // const totalValue = 0;
    const totalValue = useMemo(() => {
        return items.reduce((acc, item) => acc + item.value , 0);
    }, [items]);
    // Your code ends here
    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - Price: ${item.value}</li>
                ))}
            </ul>
            <p>Total Value: {totalValue}</p>
        </div>
    );
};
