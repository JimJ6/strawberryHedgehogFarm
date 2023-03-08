class Footer extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `
            <footer class="footer-container">
              <div class="footer-content">
                <div class="footer-items links">
                  <div class="footer-links">
                    <div class="footer--link__item"><a href="/index.html">Home</a></div>
                    <div class="footer--link__item"><a href="/shop.html">Store</a></div>
                    <div class="footer--link__item"><a href="/contact.html">Contact</a></div>
                    <div class="footer--link__item"><a href="/markets.html">Markets</a></div>
                    <div class="footer--link__item"><a href="/about.html">About</a></div>
                    <div class="footer--link__item"><a href="/donate.html">Donate</a></div>
                  </div>
                </div>
                <div class="footer-items footer--certs">
                  <img class="footer--cert" src="/img/logo1.svg" alt="" />
                  <img class="footer--cert" src="/img/logo2.svg" alt="" />
                  <img class="footer--cert" src="/img/logo3.svg" alt="" />
                  <img class="footer--cert" src="/img/logo4.png" alt="" />
                </div>
                <div class="footer-items icons-copyright">
                  <div class="footer--icons">
                    <a href="#">
                      <i class="fa-brands fa-instagram icon"></i>
                    </a>
                    <a href="#">
                      <i class="fa-brands fa-facebook icon"></i>
                    </a>
                    <a href="#">
                      <i class="fa-brands fa-twitter icon"></i>
                    </a>
                    <a href="#">
                      <i class="fa-brands fa-yelp icon"></i>
                    </a>
                  </div>
                  <small class="footer--copyright">
                    <span>Copyright, The Strawberry Hedgehog inc 2010 ©</span>
                  </small>
                </div>
                <div class="footer-items footer--subscribe-container ">
                  <h5>Subscribe to our newsletter ?</h5>
                    <form action="" id="footer--subscription-input-wrapper">
                      <input
                        class="footer--subscribe-input"
                        type="email"
                        placeholder="  Your email "
                      />
                      <input class="footer--subscribe-btn btn" type="submit" value="Subscribe" />
                    </form>
                </div>
              </div> 
            </footer>
          `
  }
};
customElements.define('footer-component', Footer);