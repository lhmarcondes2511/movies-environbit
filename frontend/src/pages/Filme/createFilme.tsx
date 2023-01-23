import './css/filme.css'
import { Input } from "../../components"
import { ChangeEvent, useState } from 'react'
import { storage } from '../../firebaseConfig'
import { ref, uploadBytes } from 'firebase/storage'

export default function CreateFilme(){
    const [image, setImage] = useState<File | null>(null)


    function handleSubmit(event: any){
        if(image == null) 
            return
        
        const imageRef = ref(storage, `images/${image.name}`)
        uploadBytes(imageRef, image).then(() => {
            alert('Image Uploaded')
        })
    }

    return(
        <div className='formCreate'>
            <h1>Cadastrar Filme</h1>
            <hr style={{ display: 'flex', justifyContent: 'center', margin: '0 10em' }} />
            {/* <form action="/" method="post" className='form'> */}
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
                        accept='image/*'
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (!e.target.files) return
                                setImage(e.target.files[0])
                        }}
                        required={true} />
                </div>
                <div className='btn'>
                    <button type="submit" onClick={handleSubmit}>Cadastrar</button>
                </div>
            {/* </form> */}
        </div>
    )
}