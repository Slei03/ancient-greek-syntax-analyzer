import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import OutputBox from "./OutputBox";
import AttrTable from "./AttrTable";
import "./ModelForm.css"


export default function ModelForm() {

    const [formInput, setFormInput] = useState({model: "grc_proiel_trf", 
        input:"φύσει μὲν οὖν αἴσθησιν ἔχοντα γίγνεται τὰ ζῷα, ἐκ δὲ ταύτης τοῖς μὲν αὐτῶν οὐκ ἐγγίγνεται μνήμη, τοῖς δʼ ἐγγίγνεται.",
    });

    const [modelOpts, setModelOpts] = useState({split_sent: true, collapse_punc: true, compact: true});
    
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    const [output, setOutput] = useState([]);

    const [attrData, setAttrData] = useState([]);
    
    useEffect(() => {
        setLoading(true)
        let formArgs = `model=${formInput.model}&input=${formInput.input}`;
        let optArgs = `split=${modelOpts.split_sent}&collapse=${modelOpts.collapse_punc}&compact=${modelOpts.compact}`;

        const fetchData = async () => {
            await fetch(`/parse?${formArgs}&${optArgs}`)
            .then(response => response.json())
            .then(data => {
                setError(false);
                setOutput(data.links);
                setAttrData(data.tokens);
                setLoading(false);
            })
        }
        fetchData().catch(error => {
            setLoading(false);
            setError(true);
            console.error(error);
        });
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInput((prevForm) => ({...prevForm, [name]: value}));
    }

    const handleOptChange = (e) => {
        const { name, checked } = e.target;
        setModelOpts((prevForm) => ({...prevForm, [name]: checked}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formInput.input.length > 350){
            alert("Exceeded character limit of 350");
            return;
        }

        setLoading(true);
        let formArgs = `model=${formInput.model}&input=${formInput.input}`;
        let optArgs = `split=${modelOpts.split_sent}&collapse=${modelOpts.collapse_punc}&compact=${modelOpts.compact}`;

        await fetch(`/parse?${formArgs}&${optArgs}`)
        .then(response => response.json())
        .then(data => {
            setError(false);
            setOutput(data.links);
            setAttrData(data.tokens);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            setError(true);
            console.error(error);
        });
    }

    return (
        <div className="modelform">
            <form id="model-form" onSubmit={handleSubmit}>
                <label className="form-input" htmlFor="model">Select a model:
                    <select name="model" id="model" value={formInput.model} onChange={handleChange}
                        title="Select a model">
                        <option value="grc_proiel_trf">grc_proiel_trf</option>
                        <option value="grc_proiel_lg">grc_proiel_lg</option>
                        <option value="grc_proiel_sm">grc_proiel_sm</option>
                        <option value="grc_perseus_trf">grc_perseus_trf</option>
                    </select>
                </label>

                <label className="form-input" htmlFor="input">Greek Text Input:
                    <textarea name="input" id="input" maxLength="350" value={formInput.input} 
                        title="Input greek text"
                        placeholder="Input greek text (Max: 350 characters)"
                        onChange={handleChange} />
                </label>

                <div id="form-select">
                    <label htmlFor="split_sent">
                        <input type="checkbox" name="split_sent" id="split_sent" onChange={handleOptChange} checked={modelOpts.split_sent}/>
                        Split sentences
                    </label>
                    <label htmlFor="collapse_punc">
                        <input type="checkbox" name="collapse_punc" id="collapse_punc" onChange={handleOptChange} checked={modelOpts.collapse_punc}/>
                        Collapse punctuation
                    </label>
                    <label htmlFor="compact">
                        <input type="checkbox" name="compact" id="compact" onChange={handleOptChange} checked={modelOpts.compact}/>
                        Compact mode
                    </label>
                </div>
                <input type="submit" value="Run" disabled={loading}/>
            </form>

            <div id="output">
                {(error && !loading) && <p>An error occurred. Please try again later.</p>}
                {(!error && loading)
                    ?   <ReactLoading id="loading" type="spinningBubbles" color="#000" />
                    :   output.map(({sentence, link}, index) => (
                            <OutputBox id="outputbox" key={index} sentence={sentence} url={link}></OutputBox>
                        ))
                }

                <br/>

                {(!error && !loading) && <AttrTable data={attrData}/>}
            </div>
        </div>
    );  
    
}