import '../css/rodape.css';
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Rodape = () => {
    return (
        <footer className="rodape">
            <div className="container">
                <div id='rodape' className="footer-content">
                    <div className="footer-section">
                        <h5 className="footer-title">Sobre Nós</h5>
                        <p className="footer-text">Somos a T10 Premium, a loja com as camisas de maior qualidade para você.</p>
                    </div>

                    <div className="footer-section social-section">
                        <div className="social-icons">
                            <a href="#" aria-label="Instagram"><FaInstagram className="icon" /></a>
                            <a href="#" aria-label="Facebook"><FaFacebook className="icon" /></a>
                            <a href="#" aria-label="Twitter"><FaXTwitter className="icon" /></a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <p className="footer-text"> <FaPhone className="fas fa-phone" /> Telefone: (14) 1234-5678</p>
                        <p className="footer-text"> <FaMapMarkerAlt className="fas fa-map-marker-alt" /> Endereço: Rua Sei Lá, 123, Marília, SP</p>
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