import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div class="container text-light">
            <div className='row'>
                <div className='col-lg-3'>
                    <div class="card text-bg-primary mb-3">
                        <div class="card-header">Header</div>
                        <div class="card-body">
                            <h5 class="card-title">Primary card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div class="card text-bg-warning mb-3">
                        <div class="card-header">Header</div>
                        <div class="card-body">
                            <h5 class="card-title">Primary card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;