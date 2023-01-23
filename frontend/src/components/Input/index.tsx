import '../css/input.css'

type InputModel = {
    type: string,
    placeholder?: string,
    name?: string,
    required?: boolean,
    value?: string
}

export default function Input(props: InputModel){
    return(
        <>
            <input 
                className='input'
                type={props.type} 
                name={props.name} 
                placeholder={props.placeholder} 
                required={props.required}
                value={props.value} />
        </>
    )
}