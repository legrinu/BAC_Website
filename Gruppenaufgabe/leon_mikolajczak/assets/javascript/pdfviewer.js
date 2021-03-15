const doc_url = "assets/pdf/WhiskyBericht.pdf";

let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumIsPending = null,
    scale = window.innerWidth*0.0007;

const canvas = document.getElementById('render_pdf'),
    context = canvas.getContext('2d');

//Render Funktion
const renderPage = num => {
    pageIsRendering = true;

    //Die Seite aus dem Dokument erhalten, Vorgang läuft als Promise, also asynchron ab
    pdfDoc.getPage(num).then(page =>{

        //PDF-Größe an Fenstergröße anpassen
        scale = window.innerWidth*0.0007;

        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        //Den Context des Canvas und die zu rendernde Größe zusammenpacken
        const renderContext = {
            canvasContext: context,
            viewport
        };

        //Asynchrones rendering der Seite in dem vorher definierten Kontext, gibt ein Promise zurück, welches verarbeitet wird
        page.render(renderContext).promise.then(() => {
            pageIsRendering = false;

            //Wenn eine Seite in der Renderwarteschlange ist, dann rendere diese
            if(pageNumIsPending !== null){
                renderPage(pageNumIsPending);
                pageNumIsPending = null;
            }
        });

        document.querySelector('#pdf_act_page').value = num;
    });

};

//Wenn aktuell eine Seite gerendert wird, dann wird danach die nächste Seite gerendert, wenn nicht dann rendere die nächste
const queueRenderPage = num =>{
    if(pageIsRendering){
        pageNumIsPending = num;
    }else{
        renderPage(num);
    }
};

//Eine Seite zurück
const prevPage = () => {
    if (pageNum <= 1){
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
};

//Eine Seite vor
const nextPage = () => {
    if (pageNum >= pdfDoc.numPages){
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
};

//Rendere die aktuelle Seite neu (dient der Anpassung an die Fenstergröße)
const actPage = () =>{  
    queueRenderPage(pageNum);
};

//Seitenzahl aus Eingabefeld rendern
const newPage = () => {
    let pdf_act_page = parseInt(document.getElementById("pdf_act_page").value);
    if(pdf_act_page > 0 && pdf_act_page <= pdfDoc.numPages){
        queueRenderPage(pdf_act_page);
    }
    return false; //Sonst wird die Seite neu geladen
};

//Bei Klick auf Canvas eine Seite vor
const canvClick = () => {
    if (pageNum >= pdfDoc.numPages){
        pageNum = 1;
    }else{
        pageNum++;
    }
    queueRenderPage(pageNum);
};

//Das Dokument in die Library laden und die erste Seite rendern
pdfjsLib.getDocument(doc_url).promise.then(pdfDoc_ =>{
    pdfDoc = pdfDoc_;

    document.querySelector('.page_count').textContent = pdfDoc.numPages;

    renderPage(pageNum);
});


//Den Buttons die Funktionen zuweisen
document.getElementById('prev_page').addEventListener('click', prevPage);
document.getElementById('next_page').addEventListener('click', nextPage);

//Dem Canvas die Funktion zuweisen
canvas.addEventListener('click', canvClick);

//Triggere das neu Rendern der aktuellen Seite, wenn das Fenster seine Größe ändert
window.onresize = actPage;