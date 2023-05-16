const input = document.getElementById('btn-converter')

const btnUpload = document.getElementById('inp-upload')
const btnDownload = document.getElementById('btn-download')

const preview1 = document.getElementById('json-text-file')
const preview2 = document.getElementById('csv-text-file')

btnUpload.addEventListener('change', function(){
    const archive = this.files[0]
    const reader = new FileReader()

    reader.addEventListener('load', function(){
        preview1.value = reader.result
    })

    if(archive){
        reader.readAsText(archive)
    }
})

const download = function(){
    const a = document.createElement('a')
    a.style.display = 'none'
    document.body.appendChild(a)

    return function(content, archiveName){
        const blob = new Blob([content],{type:'octet/stream'})
        const url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = archiveName
        a.click()
        window.URL.revokeObjectURL(url)
    }
}

btnDownload.addEventListener('click', function(){
    download()(preview1.value,'teste.txt')
})