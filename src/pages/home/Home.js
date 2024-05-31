import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div class="container text-light">
            <div className='row'>

                <div className='col-lg-3'>
                    <div class="card text-bg-primary mb-3">
                        <div class="card-header">Total Medicine Item</div>
                        <div class="card-body">
                            <h5 class="card-title">100</h5>
                           
                        </div>
                    </div>
                </div>

                <div className='col-lg-3'>
                    <div class="card text-bg-warning mb-3">
                        <div class="card-header">Total Brand</div>
                        <div class="card-body">
                            <h5 class="card-title">10</h5>
                        </div>
                    </div>
                </div>

                <div className='col-lg-3'>
                    <div class="card text-bg-warning mb-3">
                        <div class="card-header">Purchase Price</div>
                        <div class="card-body">
                            <h5 class="card-title">$10000</h5>
                        </div>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div class="card text-bg-warning mb-3">
                        <div class="card-header">Selling Price</div>
                        <div class="card-body">
                            <h5 class="card-title">$5000</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;