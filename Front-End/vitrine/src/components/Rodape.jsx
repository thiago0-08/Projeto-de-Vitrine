import '../css/rodape.css';
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Rodape = () => {
    return (
        <footer className="rodape">
            <div className="container">
                <div className="footer-content">

                    <div className="footer-section">
                        <h5 className="footer-title">Sobre Nós</h5>
                        <p className="footer-text">
                            Somos a T10 Premium, especialistas em camisas de alta qualidade para você.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h5 className="footer-title">Siga-nos</h5>
                        <div className="social-icons">
                            <a href="#"><FaInstagram className="icon" /></a>
                            <a href="#"><FaFacebook className="icon" /></a>
                            <a href="#"><FaXTwitter className="icon" /></a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h5 className="footer-title">Contato</h5>
                        <p className="footer-text">
                            <FaPhone /> (14) 1234-5678
                        </p>
                        <p className="footer-text">
                            <FaMapMarkerAlt /> Rua Sei Lá, 123, Marília - SP
                        </p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2025 T10 Premium. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default Rodape;
