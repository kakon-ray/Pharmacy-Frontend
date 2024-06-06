/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import img from '../../components/images/loading.gif'
const Loading = () => {
    return (
        <div className='mt-5 pt-5'>
             <div className='container'>
                <div className='row'>
                    <div className='col-lg-3 mx-auto text-center'>
                        <img src={img} className='img-fluid'/>
                    </div>
                </div>
             </div>
        </div>
    );
};

export default Loading;