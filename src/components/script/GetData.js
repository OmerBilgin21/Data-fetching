import React, { useState, useEffect } from 'react';
import '../css/data.css';
const GetData = () => {
    const [data, setData] = useState([]);
    const getData = () => {
        fetch('Megaventory.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setData(myJson.mvPurchaseOrders)
            });
    }
    useEffect(() => {
        getData()
    }, [])


    return (
        data && data.map(purchase =>
            <div key={purchase.mvPurchaseOrders}>

                <ul className='my-list'>
                    <li>
                        <p>
                            {purchase.PurchaseOrderTypeAbbreviation}- {purchase.PurchaseOrderNo}</p>
                        <div className='inside-card'>
                            <p>
                                Address: {purchase.PurchaseOrderAddress}
                            </p>
                            <p>
                                Contact person: {purchase.PurchaseOrderContactPerson}
                            </p>
                            <p>
                                Status: {purchase.PurchaseOrderStatus}
                            </p>
                            
                            <div className='details'>
                                <p>
                                    SKU: {purchase.PurchaseOrderDetails[0].PurchaseOrderRowProductSKU}
                                </p>
                                <p>
                                    Quantity: {purchase.PurchaseOrderDetails[0].PurchaseOrderRowQuantity}
                                </p>
                                <p>
                                    Unit Price Without Tax or Discount: {purchase.PurchaseOrderDetails[0].PurchaseOrderRowUnitPriceWithoutTaxOrDiscount}
                                </p>
                                <p>
                                    Total amount: {purchase.PurchaseOrderDetails[0].PurchaseOrderRowTotalAmount}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>)
            
    );
}

export default GetData;
