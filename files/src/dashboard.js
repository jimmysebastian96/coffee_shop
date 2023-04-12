import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const Dashboard = () => {
    const { state } = useLocation();
    const {firstName : firstName,
        lastName:lastName,
    } = useState(["",""]);
    try{
    firstName = state.firstName;
    lastName = state.lastName;
    }
    catch(e){
        
    }
    const [Latte_data, setLatteData] = useState([]);
    const [Transaction_data, setTransactionData] = useState([]);
    const [rewardPoints, setRewardData] = useState(0);
    const [customer_id, setCustomerId] = useState('');
    const [items, setItems] = useState([]);
    const handleChange = event => {
        setCustomerId(event.target.value);
        console.log(customer_id)
      };

    useEffect(() => {
        fetch('http://localhost:8000/item/latte/') // Replace with the API endpoint
          .then(response => response.json())
          .then(Latte_data => setLatteData(Latte_data))
          .catch(error => console.error(error));
        setItems([...items, Latte_data]);

        fetch('http://localhost:8080/loyalty/'+{customer_id}+'/') // Replace with the API endpoint
          .then(response => response.json())
          .then(rewardPoints => setRewardData(rewardPoints))
          .catch(error => console.error(error));
          
        fetch('http://localhost:8080/transaction/'+{customer_id}+'/') // Replace with the API endpoint
          .then(response => response.json())
          .then(Transaction_data => setTransactionData(Transaction_data))
          .catch(error => console.error(error));

      }, [items, Latte_data, customer_id]);

      const buy = async (item) => {
        try {
          const response = await fetch('http://localhost:8080/checkout/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({customer_id: customer_id,
                                name: item.name,
                                price_paid: item.price})
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
      };
    return (
       <div>
        Welcome to your dashboard {firstName}! below are the available items to buy
        <div>
            <label htmlFor="customer_id">Customer ID:</label>
            <input type="text" id="customer_id" name="customer_id" value={customer_id} onChange={handleChange} />
        </div>
        <div className="container">
          <div className="product-list">
            <h1>Product List</h1>
            <ul>
              {Latte_data.map(item => (
                <li key={items.item_id}>
                  {item.name} - ${item.price}
                  <button onClick={() => buy(item)}>Add to cart</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="shopping-cart">
            <h1>Reward points</h1>
            <h2>{rewardPoints}</h2>
            <h2>Transaction history</h2>
            <table  className="transaction-table">
                <thead>
                    <tr>
                    <th>Transaction ID</th>
                    <th>Price</th>
                    <th>Item</th>
                    <th>Customer ID</th>
                    </tr>
                </thead>
                <tbody>
                    {Transaction_data.map((transaction) => (
                    <tr key={transaction.transaction_id}>
                        <td>{transaction.transaction_id}</td>
                        <td>{transaction.customer_id}</td>
                        <td>{transaction.item}</td>
                        <td>{transaction.price}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
        <button onClick={handleClick}  > Return back to Home </button>
        </div>
      )
};

export default Dashboard;