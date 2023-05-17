const preview1 = document.getElementById('json-text-file')
const preview2 = document.getElementById('csv-text-file')

const fileName1 = document.getElementById('file-name-1')
const fileName2 = document.getElementById('file-name-2')

const btnUpload = document.getElementById('inp-upload')
// Adicionando um ouvinte de evento para o botão de upload de arquivo
btnUpload.addEventListener('change', function(){
    const file = this.files[0]
    const reader = new FileReader() 
    const fileName = file.name
    
    // Adicionando um ouvinte de evento para quando a leitura do arquivo estiver concluída
    reader.addEventListener('load', function(){
        preview1.value = reader.result
        fileName1.value = fileName
    })

    if(file){
        reader.readAsText(file) 
    }
})

const btnConverter = document.getElementById('btn-converter')
// Função de coverter JSON para CSV
function ConvertJSONtoCSV(jsonData){
    const jsonArray = JSON.parse(jsonData)

    // Obter as chaves do objeto JSON como cabeçalhos do CSV
    const headers = Object.keys(jsonArray[0])

    // Criar as linhas de dados do CSV
    const rows = jsonArray.map((obj) => headers.map((header) => obj[header]))

    // Combinar cabeçalhos e linhas em um único array
    const csvData = [headers, ...rows]

    // Converter o array em uma string CSV
    const csvContent = csvData.map((row) => row.join(',')).join('\n')

    return csvContent;
}


function downloadCSV(csvContent, fileName) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.click();
    window.URL.revokeObjectURL(link)
}

function Convert(){
    try {
        preview2.value = ConvertJSONtoCSV(preview1.value)     
    } catch (error) {
        alert(error + " Não é um JSON válido")
    }
} 

const btnDownload = document.getElementById('btn-download')
btnDownload.addEventListener('click', function(){
    const fileName1 = document.getElementById('file-name-1').value.split('.')[0]
    const fileName = fileName2.value.split('.')[0]; 
    
    if(fileName){
        downloadCSV(preview2.value, fileName + `.csv`);
    }
    else if(fileName1){
        downloadCSV(preview2.value, fileName1 + `.csv`);
    }
    else{
        alert('Please enter the new file name')
    }
})

