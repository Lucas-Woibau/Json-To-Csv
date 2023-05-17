const input = document.getElementById('btn-converter')

const btnUpload = document.getElementById('inp-upload')
const btnDownload = document.getElementById('btn-download')

const preview1 = document.getElementById('json-text-file')
const preview2 = document.getElementById('csv-text-file')

// Adicionando um ouvinte de evento para o botão de upload de arquivo
btnUpload.addEventListener('change', function(){
    const archive = this.files[0]
    const reader = new FileReader() 

    // Adicionando um ouvinte de evento para quando a leitura do arquivo estiver concluída
    reader.addEventListener('load', function(){
        preview1.value = reader.result 
    })

    if(archive){
        reader.readAsText(archive) 
    }
})

// Função de download de arquivo
const download = function() {
    const a = document.createElement('a'); // Criando um elemento <a> (link)
    a.style.display = 'none'; // Ocultando o link

    document.body.appendChild(a); // Adicionando o link ao corpo do documento

    return function(content, archiveName) {
        const blob = new Blob([content], { type: 'octet/stream' }); // Criando um objeto Blob com o conteúdo do arquivo
        const url = window.URL.createObjectURL(blob); // Criando uma URL para o objeto Blob
        a.href = url; // Definindo a URL do link para a URL do objeto Blob
        a.download = archiveName; // Definindo o nome do arquivo de download
        a.click(); // Simulando um clique no link
        window.URL.revokeObjectURL(url); // Liberando a URL do objeto Blob
    }
};

// Adicionando um ouvinte de evento para o botão de download de arquivo
btnDownload.addEventListener('click', function() {
    const fileName = document.getElementById('file-name').value;
    download()(preview1.value, `${fileName}.txt`); // Realizando o download do conteúdo do campo de visualização JSON
});