import Header from '../component/include/header';
import Footer from '../component/include/footer';
import Banner1 from '../component/assets/img-2.jpg';
import product1 from '../component/assets/img-3.jpg';
import product2 from '../component/assets/img-4.jpg';
import product3 from '../component/assets/img-5.jpg';
import product4 from '../component/assets/img-6.jpg';
import product5 from '../component/assets/img-7.jpg';
import product6 from '../component/assets/img-8.jpg';
import product7 from '../component/assets/img-9.jpg';
import product8 from '../component/assets/img-10.jpg';

function Home(){
    return(
        <div>
            <Header />
            {/*Banner*/} 
            <div className="container-fluid" style={{backgroundImage: `url(${Banner1})`, backgroundSize: 'cover', height: '100vh', backgroundPosition: 'center', textAlign:'center', display: 'table'}}>
                <h1 style={{display: 'table-cell', verticalAlign: 'middle', fontSize: '90px'}}>Hello Summer</h1>
            </div>

            {/*About Us*/}
            <div className='container-fluid' style={{backgroundColor: '#fdfdfd'}}>
                <div className="container">
                    <div className="about">
                        <div className="inner-section">
                            <h2>About Us</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed quam non sapien varius laoreet. Sed pretium bibendum eleifend. Sed porta sapien est, non pulvinar leo blandit sit amet. Vivamus bibendum ligula in iaculis ullamcorper. Donec venenatis orci quam</p>
                            <div className="about-btn">
                                <button type="button" className="btn btn-dark">Read More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Our Products*/}
            <div className='container-fluid' style={{background: "linear-gradient(to right, #2c5364, #0f2027)", height:'100vh', display: 'flex', alignItems:'center', justifyContent:'center', overflow: 'hidden', flexDirection: 'column'}}>
            <div style={{paddingBottom: '90px', marginTop: '-50px'}}>
                <h1 className="text-center" style={{color: '#fff'}}>Our Products</h1>
            </div>
            <div className="slider">
                <span className='i1-1'><img src={product1} alt="" /></span>
                <span className='i1-2'><img src={product2} alt="" /></span>
                <span className='i1-3'><img src={product3} alt="" /></span>
                <span className='i1-4'><img src={product4} alt="" /></span>
                <span className='i1-5'><img src={product5} alt="" /></span>
                <span className='i1-6'><img src={product6} alt="" /></span>
                <span className='i1-7'><img src={product7} alt="" /></span>
                <span className='i1-8'><img src={product8} alt="" /></span>
            </div>    
            </div>

            {/*Contact Us*/}
            <div className='container-fluid' id='contact' style={{backgroundColor: '#fdfdfd', padding: '80px 0'}}>
                <div className='container'>
                    <div className='row'>
                        <div className='column' style={{width: '50%', paddingRight: '50px'}}>
                            <h1 style={{color: '#000', textAlign: 'left'}}>Leave Us A Message!</h1>
                            <form>
                                <input type="text" id="fname" name="fname" placeholder="Your Name*" required />

                                <input type="email" id="email" name="email" placeholder="Email*" required />

                                <textarea id="comment" name="comment" placeholder="Leave Your Comment*"  rows="5" required></textarea>

                                <input type="submit" value="Submit" className="btn btn-dark" />
                            </form>
                        </div>
                        <div className='column' style={{width: '50%', paddingLeft: '50px'}}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.546536300116!2d100.304419714264!3d5.333182737334683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac0f6419ddf33%3A0xfad4d772f2c85345!2sQueensbay%20Mall!5e0!3m2!1sen!2smy!4v1646401224027!5m2!1sen!2smy" style={{border:0, width: '100%', height: '450px'}} allowFullScreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Home;

