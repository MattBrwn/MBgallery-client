import React, { Component } from 'react';
import axios from "axios";
import config from '../config';


 class MyPurchase extends Component {
    
    state = {
        purchases: [],
        images: []
    }


    componentDidMount() {
        // axios call here
        // will get purchases from backend
        // it will save purchases in purchases state
        axios.get(`${config.API_URL}/api/purchase`, {withCredentials: true})
        
        .then((response) => {
            console.log("response from API", response.data)
            this.setState({purchases: response.data})
        })
        .catch(() => {
          console.log('Detail fetch failed')
        })
    }
       
    
    render() {
        const {purchases} = this.state
        const {images} = this.state
        return (
            <div>
                <h1>My purchases</h1>
                {purchases.map(eachPurchase => {
                    return (
                        <h4>price= {eachPurchase.totalprice} €</h4>
                    )
                })}
            </div>
        )
    }
    }
 export default MyPurchase;
