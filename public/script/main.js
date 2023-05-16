const input = document.getElementById('btn-converter')
const btnUpload = document.getElementById('inp-upload')
const btnDownload = document.getElementById('btn-download')
const preview = document.getElementById('csv-text-file')

btnUpload.addEventListener('click', function(){
    const archive = this.files[0]
    const reader = new FileReader()

    reader.addEventListener('load', function(){
        console.log(reader.result)
    })

    if(archive){
        reader.readAsText(archive)
    }
})