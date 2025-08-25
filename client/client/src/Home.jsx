import { useEffect } from "react"

export default function Home()
{
    useEffect(()=>{
      window.testimonialCorosal();
    },[]);


    return <>
    
      <section className="main-banner" id="top">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 align-self-center">
          <div className="header-text">
            <h6>Welcome to our school</h6>
            <h2>Best Place To Learn Graphic <em>Design!</em></h2>
            <div className="main-button-gradient">
              <div className="scroll-to-section"><a href="#contact-section">Join Us Now!</a></div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="right-image">
            <img src="/src/assets/assets/images/banner-right-image.png" alt=""/>
          </div>
        </div>
      </div>
    </div>
  </section>


 
  <section className="our-courses" id="courses">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <div className="section-heading">
            <h6>OUR COURSES</h6>
            <h4>What You Can <em>Learn</em></h4>
            <p>You just think about TemplateMo whenever you need free CSS templates for your business website</p>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="naccs">
            <div className="tabs">
              <div className="row">
                <div className="col-lg-3">
                  <div className="menu">
                    <div className="active gradient-border"><span>Web Development</span></div>
                    <div className="gradient-border"><span>Graphic Design</span></div>
                    <div className="gradient-border"><span>Web Design</span></div>
                    <div className="gradient-border"><span>WordPress</span></div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <ul className="nacc">
                    <li className="active">
                      <div>
                        <div className="left-image">
                          <img src="/src/assets/assets/images/courses-01.jpg" alt=""/>
                          <div className="price"><h6>$128</h6></div>
                        </div>
                        <div className="right-content">
                          <h4>Web Development</h4>
                          <p>Did you know that you can visit <a rel="nofollow" href="https://www.toocss.com/" target="_blank">TooCSS website</a> for latest listing of HTML templates and a variety of useful templates. 
                          <br/><br/>You just need to go and visit that website right now. IF you have any suggestion or comment about this template, you can feel free to go to contact page for our email address.</p>
                          <span>36 Hours</span>
                          <span>4 Weeks</span>
                          <span className="last-span">3 Certificates</span>
                          <div className="text-button">
                            <a href="contact-us.html">Subscribe Course</a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="left-image">
                          <img src="/src/assets/assets/images/courses-02.jpg" alt=""/>
                          <div className="price"><h6>$156</h6></div>
                        </div>
                        <div className="right-content">
                          <h4>Creative Graphic Design</h4>
                          <p>You are not allowed to redistribute this template ZIP file on any other website without a permission from us.<br/><br/>There are some unethical people on this world copied and reposted our templates without any permission from us. Their Karma will hit them really hard. Yeah!</p>
                          <span>48 Hours</span>
                          <span>6 Weeks</span>
                          <span className="last-span">1 Certificate</span>
                          <div className="text-button">
                            <a href="contact-us.html">Subscribe Course</a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="left-image">
                          <img src="/src/assets/assets/images/courses-03.jpg" alt=""/>
                          <div className="price"><h6>$184</h6></div>
                        </div>
                        <div className="right-content">
                          <h4>Web Design</h4>
                          <p>Quinoa roof party squid prism sustainable letterpress cray hammock tumeric man bun mixtape tofu subway tile cronut. Deep v ennui subway tile organic seitan.<br/><br/>Kogi VHS freegan bicycle rights try-hard green juice probably haven't heard of them cliche la croix af chillwave.</p>
                          <span>28 Hours</span>
                          <span>4 Weeks</span>
                          <span className="last-span">1 Certificate</span>
                          <div className="text-button">
                            <a href="contact-us.html">Subscribe Course</a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="left-image">
                          <img src="/src/assets/assets/images/courses-04.jpg" alt=""/>
                          <div className="price"><h6>$76</h6></div>
                        </div>
                        <div className="right-content">
                          <h4>WordPress Introduction</h4>
                          <p>Quinoa roof party squid prism sustainable letterpress cray hammock tumeric man bun mixtape tofu subway tile cronut. Deep v ennui subway tile organic seitan.<br/><br/>Kogi VHS freegan bicycle rights try-hard green juice probably haven't heard of them cliche la croix af chillwave.</p>
                          <span>48 Hours</span>
                          <span>4 Weeks</span>
                          <span className="last-span">2 Certificates</span>
                          <div className="text-button">
                            <a href="contact-us.html">Subscribe Course</a>
                          </div>
                        </div>
                      </div>
                      </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="testimonials" id="testimonials">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-heading">
            <h6>Testimonials</h6>
            <h4>What They <em>Think</em></h4>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="owl-testimonials owl-carousel" 
          style={{position:'relative',zIndex:'5'}}>
            <div className="item">
              <p>“just think about TemplateMo if you need free CSS templates for your website”</p>
                <h4>Catherine Walk</h4>
                <span>CEO &amp; Founder</span>
                <img src="/src/assets/assets/images/quote.png" alt=""/>
            </div>
            <div className="item">
              <p>“think about our website first when you need free HTML templates for your website”</p>
                <h4>David Martin</h4>
                <span>CTO of Tech Company</span>
                <img src="/src/assets/assets/images/quote.png" alt=""/>
            </div>
            <div className="item">
              <p>“just think about our website wherever you need free templates for your website”</p>
                <h4>Sophia Whity</h4>
                <span>CEO and Co-Founder</span>
                <img src="/src/assets/assets/images/quote.png" alt=""/>
            </div>
            <div className="item">
              <p>“Praesent accumsan condimentum arcu, id porttitor est semper nec. Nunc diam lorem.”</p>
                <h4>Helen Shiny</h4>
                <span>Tech Officer</span>
                <img src="/src/assets/assets/images/quote.png" alt=""/>
            </div>
            <div className="item">
              <p>“Praesent accumsan condimentum arcu, id porttitor est semper nec. Nunc diam lorem.”</p>
                <h4>George Soft</h4>
                <span>Gadget Reviewer</span>
                <img src="/src/assets/assets/images/quote.png" alt=""/>
            </div>
            <div className="item">
              <p>“Praesent accumsan condimentum arcu, id porttitor est semper nec. Nunc diam lorem.”</p>
                <h4>Andrew Hall</h4>
                <span>Marketing Manager</span>
                <img src="/src/assets/assets/images/quote.png" alt=""/>
            </div>
            <div className="item">
              <p>“Praesent accumsan condimentum arcu, id porttitor est semper nec. Nunc diam lorem.”</p>
                <h4>Maxi Power</h4>
                <span>Fashion Designer</span>
                <img src="/src/assets/assets/images/quote.png" alt=""/>
            </div>
            <div className="item">
              <p>“Praesent accumsan condimentum arcu, id porttitor est semper nec. Nunc diam lorem.”</p>
                <h4>Olivia Too</h4>
                <span>Creative Designer</span>
                <img src="/src/assets/assets/images/quote.png" alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    
    </>
}