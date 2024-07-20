import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const TOKEN = '7431102409:AAHnbtYwEtfO6jG9L9c8jdqap9wDpV1zSt8';
  const CHAT_ID = '797379797';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', 'night');
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToBasket = (product) => {
    sendMessage(`Product added to basket:
      Product: ${product.title}
      Price: ${product.price}
      Image: ${product.thumbnail}
    `);
  };

  const sendMessage = async (message) => {
    try {
      const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });
      const data = await response.json();
      console.log("Message sent successfully", data);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <>
      <div>
        {loading ? (
          <div className='h-screen justify-center items-center flex'>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className='flex flex-wrap gap-x-[3%] gap-y-10'>
            {products.map((product, id) => (
              <div key={id} className='bg-base-300 flex-1 min-w-[22%] w-full rounded-lg shadow-lg shadow-primary'>
                <img src={product.thumbnail} className='w-full' alt={product.title} />
                <div className='p-3'>
                  <p className='text-primary'>{product.title}</p>
                  <p className='text-primary'>${product.price}</p>
                  <button className='btn btn-accent w-full' onClick={() => addToBasket(product)}>Buy</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
