export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-wrap">
        <div>
          <a href="#home" className="logo">
            <span className="logo-mark">JJRA</span>
            <span className="logo-text">Jonee<span>.dev</span></span>
          </a>
          <p className="footer-tag">
            Programmer, designer and developer crafting Laravel-powered digital products
            from the Philippines.
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li><a href="https://github.com/javiernarn" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.facebook.com/EphemeralKun/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://alumni.occph.com" target="_blank" rel="noopener noreferrer">ATMS System</a></li>
            <li><a href="mailto:occ.antiquina.joneejohn@gmail.com">Email</a></li>
          </ul>
        </div>
      </div>
      <div className="container copyright">
        <span>© <span id="year">{new Date().getFullYear()}</span> Jonee John Rivera Antiquina (JJRA). All rights reserved.</span>
        <span>Designed &amp; built with ❤️ in CDO City</span>
      </div>
    </footer>
  );
}
