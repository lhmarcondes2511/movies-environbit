import { Input } from "../../components";

export default function EditFilme(){
    return(
        <div className='formCreate'>
            <h1>Editar Filme</h1>
            <hr style={{ display: 'flex', justifyContent: 'center', margin: '0 10em' }} />
            <form action="/" method="post" className="form">
                <div>
                    <label htmlFor="title">Título: <span>*</span></label>
                    <Input 
                        type="text" 
                        name="title" 
                        placeholder="Título do Filme" 
                        required={true} />
                </div>
                <div>
                    <label htmlFor="description">Descrição:</label>
                    <Input 
                        type="text" 
                        name="description" 
                        placeholder="Descrição do Filme" 
                        required={false} />
                </div>
                <div>
                    <label htmlFor="diretor">Diretor: <span>*</span></label>
                    <Input 
                        type="text" 
                        name="diretor" 
                        placeholder="Diretor do Filme" 
                        required={true} />
                </div>
                <div>
                    <label htmlFor="pais">País: <span>*</span></label>
                    <Input 
                        type="text" 
                        name="pais" 
                        placeholder="País do Filme" 
                        required={true} />
                </div>
                <div>
                    <label htmlFor="anoLancamento">Ano de Lançamento: <span>*</span></label>
                    <Input 
                        type="text" 
                        name="anoLancamento" 
                        placeholder="Ano de Lançamento do Filme" 
                        required={true} />
                </div>
                <div>
                    <label htmlFor="img">Imagem: <span>*</span></label>
                    <input 
                        type="file" 
                        name="img" 
                        placeholder="Imagem do Filme" 
                        required={true} />
                </div>
                <div className='btn'>
                    <button type="submit">Editar</button>
                </div>
            </form>
        </div>
    )
}