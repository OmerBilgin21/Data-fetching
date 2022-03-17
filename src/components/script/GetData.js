import React, { useState, useEffect } from 'react';
import '../css/data.css';
const GetData = () => {

    // data is the state variable which contains the contents and data is the variable we can use to manipulate the data's inside of the JSON file. setData is the variable we will use to change the state (content) of the data variable. at the end, I am assigning the content of the data variable to an empty array.
    
    const [data, setData] = useState([]);
    const getData = () => {

        // normally this place should contain an address but the defaul is the public folder so in this spesific example we don't need it

        fetch('Megaventory.json'
            , {
                // for clarification
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )

            // taking the response of the json file
            // response is the JSON file's response to a fetch call it is not contents but more of the object title's and informations

            .then(function (response) {
                console.log(response);
                console.log(typeof response.url.mvPurchaseOrders);
                return response.json();
            })
            
            
            
            // what I did do could roughly look like this if I didn't have any explanations or 'unnecessary' (control) steps.

            // simply just fetch(./Megaventory.JSON)
            // .then function(response){
            //     return response.json()
            // }

            // .then function(info){
            //     setData(data)
            // }
            // we can add a catch too

            // .catch(
            //     function(err){
            //         console.log(err) 
            //     }
            // )



            // taking the json file's index as thisJson

            .then(function (thisJson) {

                // at this stage the thisJson 'var' still an object but contains datas I want to fetch

                console.log(thisJson);

                // changing state ( setting ) of my data from an empty array to the JSON file

                setData(thisJson.mvPurchaseOrders) 

                // the line below can be written as .then(response.data)

            });
    }
    useEffect(() => {

        // runs useEffect only when the app mounts (works for the first time)
        // and because I dont expect any changes on the json file 
        // I just left the this array empty

        getData()
    }, [])


    return (

        // at the 2 lines below basically searching/looping over the JSON file's contents to get the data I want.

        data && data.map(purchase =>

            //I set up a key to reach to the content of the JSON file easily and to map.

            <div key={purchase.mvPurchaseOrders}>

                <ul className='my-list'>
                    <li >
                        <p>
                            
                            {/* these are not an index of any array so I just call them directly by mvPurchaseOrders's item  it's technically an array but has one index so it's not a problem for this example */}

                            {purchase.PurchaseOrderTypeAbbreviation}- {purchase.PurchaseOrderNo}
                        </p>
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

                            {/* from here the items are an index of the PurchaseOrderDetails array. The PurchaseOrderDetails array has 3 indexes which some of them has it's own indexes.*/}

                            <div className='details'>
                                <p>

                                    {/* I am still inside of the PurchaseOrderDetails so I have to use the [0] information everytime I try to reach the data */}
                                    
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
