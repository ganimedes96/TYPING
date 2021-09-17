import React, { useEffect, useState } from 'react';


import wordList from './resources/words.json'

const MAX_TYPED_KEYS =30

const getWord = () =>{
    const index = Math.floor(Math.random()* wordList.length)
    const word = wordList[index]
    return word.toLowerCase()
}

const isValidKey = (key, word) => {
    if(!word) return false;
    const result = word.split('').includes(key);
    return result
}


const Word = ({word, validKeys}) =>{
    if(!word)return null

    const joinedKeys = validKeys.join('')
    const matched = word.slice(0, joinedKeys.length)
    const remainder = word.slice(joinedKeys.length)

    return(<>
            <span className="matched">{matched}</span>   
            <span className="remainder">{remainder}</span>  
    </>
     )
}

const App = () => {

    
    const [typedKeys, setTypedKeys]  = useState([]);
    const [validKeys, setValedKeys]  = useState([]);
    const [completeWords, setCompleteWords]  = useState([]);
    const [word, setWord] = useState('')

    useEffect(()=>{
        setWord(getWord())
    }, [])

    useEffect(()=>{
        const wordFromValidKeys = validKeys.join('').toLowerCase()
        if(word && word === wordFromValidKeys){
            //adicionar o word ao completeWords
            
            //limpar o array validKeys
            //buscar uma nova plavra
            let newWord = null

            do{
                newWord = getWord()

            }while(completeWords.includes(newWord))

            setWord(newWord)
            setValedKeys([])

            setCompleteWords((prev)=>[...prev, word])
        }
    },[word, validKeys])
   

    const handleKeyDown = (e) =>{
        e.preventDefault();
        const {key} = e;

        setTypedKeys((prev) =>{
            return [... prev, key].slice(MAX_TYPED_KEYS * -1)
        })

        if (isValidKey(key, word)){
            setValedKeys((prev)=>{
                const isValidLength = prev.length <= word.length
                const isNextChar = isValidLength && word[prev.length] === key
                
                

                return isNextChar ? [...prev, key] : prev
            })
        }

        console.log('key', key);
    };

    return(<div className="container"tabIndex="0" onKeyDown = {handleKeyDown}>
        <div className="valid-keys">
           
           <Word word={word} validKeys = {validKeys}/>
           
             
        </div>
        <div className="typed-keys">{typedKeys ? typedKeys.join(' ') : null}</div>
        <div className="completed-words">
            <ol>
                {completeWords.map((word)=>{
                    return (<li key={word}>{word}</li>)
                })}
                <li>cidade</li>
                <li>carro</li>
                <li>profissional</li>
            </ol>
        </div>

    </div>)
}

export default App;