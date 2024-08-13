import React from 'react';
import Banner from './Banner';
import About from './About';
import Services from './Services';

const HomePage = () => {
    return (
        <div className=''>
            <Banner></Banner>
            {/* <About/> */}
            <Services></Services>
        </div>
    );
};

export default HomePage;