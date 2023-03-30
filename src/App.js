import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard"
import 'bootstrap/dist/css/bootstrap.min.css';


function App(params) {
   
   
    const [advice, setAdvice] = React.useState({
        id: "",
        advice: ""
    })

    
    const [quotes, setQuotes] = React.useState("")
    React.useEffect(() => {
        fetch("https://api.adviceslip.com/advice")
        .then(res => res.json())
        .then(data => setQuotes(data.slip))
    })

    function generateNewAdvice(params) {
        const theAdvice = quotes.advice
        const theId = quotes.id
        setAdvice(prevQuotes => ({ 
            ...prevQuotes, 
            advice:theAdvice,
            id: `Advice #${theId}`
        }))
    }
    
    const [isCopied, setIsCopied] = React.useState(false)

    const  onCopyText = () => {
        setIsCopied(true);
        setTimeout( () => {
            setIsCopied(false);
        }, 500);
    };
    return(
        <main className="main text-center py-5">
           <div className="container w-50 my-5 py-5 quote-body">
           <p className="fw-semibold">{advice.id}</p>
            <p>{advice.advice}</p>
            <button className="btn-secondary mb-4 quote-btn" onClick={generateNewAdvice }>New Quotes</button>

            <CopyToClipboard text={advice.advice} onCopy={onCopyText}>
            <div className="copy-area">
                <button className="btn-secondary quote-btn">Copy</button>
                <br></br>
               {isCopied && <span className="span-copy">Copied!</span>}
            </div>
            </CopyToClipboard>
           </div>
        </main>
    )
}
export default App  