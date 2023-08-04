import React, { Component } from 'react'
import './htmlHighlight.css'


class HTMLHighlight extends Component {

    highlightHTMLContent = (htmlContent, plainText, plainTextPositions) =>{
        let highlightedContent = htmlContent;
      

        for (let i = 0; i < plainTextPositions.length; i++) {
            const start = plainTextPositions[i].start
            const end = plainTextPositions[i].end

            const inHtmlStV = highlightedContent.indexOf(plainText.slice(start, end));
            const inHtmlEndV = inHtmlStV + (end - start);

          const highlightedText = '<span style="background-color: yellow;">' + highlightedContent.slice(inHtmlStV, inHtmlEndV) + '</span>';
      
          highlightedContent = highlightedContent.slice(0, inHtmlStV) + highlightedText + highlightedContent.slice(inHtmlEndV);
            
        }

        return highlightedContent;
    }

    findIndex = (plainTextPositionsValues , plaintext) =>{
        let plainTextPositionsArray = []
        let wordsToFind = plainTextPositionsValues.split(',')

        for (let i = 0; i < wordsToFind.length; i++) {
            let wordToHighlight = wordsToFind[i]
            wordToHighlight = wordToHighlight.trim()
            const index = plaintext.indexOf(wordToHighlight);
            if (index !== -1) {
              const endIndex = index + wordToHighlight.length;            
              let obj = {
                start : index,
                end : endIndex
              }
              plainTextPositionsArray.push(obj)
            }
            
        }

        if (plainTextPositionsArray.length === 0) {
            alert('No such word is present in the Text')
        }

        return plainTextPositionsArray

    }

    extractHtmlToText = (htmlContent) =>{

        var textarea = document.createElement("textarea");
        textarea.innerHTML = htmlContent;
        var temporalDivElement = document.createElement("p");
        temporalDivElement.innerHTML = textarea.value;
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }

    extractHtml = () =>{

            // html content 
            let htmlContentID = document.getElementById('text-area-cont')
            let htmlContent = htmlContentID.value
            let plaintText = this.extractHtmlToText(htmlContent)

            // plaintext positions

            let plainTextPositionsID = document.getElementById('text-area-wrd')
            let plainTextPositionsValues = plainTextPositionsID.value
            let plainTextPositions = this.findIndex(plainTextPositionsValues , plaintText)


            let highlightHTMLContent = this.highlightHTMLContent(htmlContent , plaintText , plainTextPositions )


            
            let renderDiv = document.getElementById('renderDiv');
            renderDiv.innerHTML = highlightHTMLContent;
    }





    render() { 
        return ( 
            <>
                <label id = 'html-cnt-lbl'>Html Content :</label>
                <label id = 'word-lbl'>Plain Text Words : </label>
                <div className='parallel' data-testid = 'main-div'>
                    <textarea id='text-area-cont'  placeholder='Please Enter your Html Content Here' ></textarea>
                    <textarea id='text-area-wrd'  placeholder='Please Enter the words that needs to be highlighted with comma speration,  e.g Elephant , Horse'></textarea>
                </div>
                <br/>
                <button id='btn-highlight' onClick={this.extractHtml}>Highlight</button>
                <br/>
                <div id="renderDiv"></div>
            </>
         );
    }
}
 
export default HTMLHighlight;
