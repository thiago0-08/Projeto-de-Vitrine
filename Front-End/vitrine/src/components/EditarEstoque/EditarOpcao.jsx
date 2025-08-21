import "../../css/editarOpcao.css";
import { FaBoxOpen } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { RiMenuAddFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const EditarOpcao = () => {
    const navigate = useNavigate();
    
    return (
        <div className="container">
            <h1>Configurações</h1>
            <h5>Gerencie o estoque, os produtos e as categorias da sua loja.</h5>

            <div className="menu-Configuracao">
                <div className="menu-item">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_vGG05s_7i74eVv_GSf-1ASy1EIMYtYdlEcHQU3T5SsNcqgYn8ukeE-eSI2Cyzx_T8uc&usqp=CAU"
                        alt="Atualizar inventário"
                    />
                    <h1>Atualizar inventário</h1>
                    <p>Atualize rapidamente os níveis de estoque dos seus produtos.</p>
                </div>

                <div className="menu-item">
                      <img className="Icone" src="data:image/png;base64,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" alt="Criar novo produto" />
                    <h1>Criar novo produto</h1>
                    <p>Adicione um novo produto à sua loja.</p>
                </div>

                <div className="menu-item">
                    <img
                        src="https://images-platform.99static.com/yPb5r4t8jkDw_vnPoA1V7_gHmd8=/0x0:960x960/500x500/top/smart/99designs-contests-attachments/63/63177/attachment_63177849"
                        alt="Gerenciar categorias"
                    />
                    <h1>Gerenciar categorias</h1>
                    <p>Organize e gerencie suas categorias de produtos.</p>
                </div>
            </div>

            <div className="opcao">
                <h1>Edição</h1>

                <div className="EditarEstoque">
                    <i className="Icone"><FaBoxOpen /></i>
                    <div className="texto">
                        <h1>Editar Estoque</h1>
                        <p className="subtitulo">Atualize rapidamente os níveis de estoque.</p>
                    </div>
                    
                    <button className="Button"  onClick={() => navigate('/lancamentos')}>Editar</button>
                   
                </div>

                <div className="NewProduto">
                    <i className="Icone"><IoMdAdd /></i>
                    <div className="texto">
                        <h1>Criar novo Produto</h1>
                        <p className="subtitulo">Adicione um novo produto à sua loja.</p>
                    </div>
                    <button className="Button" onClick={() => navigate('/NovoProduto')}>Criar</button>
                </div>

                <div className="NewCategoria">
                    <i className="Icone"><RiMenuAddFill /></i>
                    <div className="texto">
                        <h1>Gerenciar Categorias</h1>
                        <p className="subtitulo">Crie ou Organize suas categorias de produtos.</p>
                    </div>
                    <button className="Button"onClick={() => navigate('/NovaCategoria')} >Gerenciar</button>
                </div>
            </div>
        </div>
    );
};

export default EditarOpcao;