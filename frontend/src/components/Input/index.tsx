import { useState } from 'react'
import { API } from '../../server/api'

const Input = () => {
  const [selectedFile, setSelectedFile] = useState()
  const [jsonData, setJsonData] = useState()

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0])
  }

  const handleSubmit = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData()
        formData.append('csvFile', selectedFile)

        // Utilize o try-catch para lidar com erros na requisição.
        try {
          const response = await API.post('/csv', formData)

          if (response.data && response.data.res !== 'erro') {
            setJsonData(response.data)
          } else {
            console.error('Erro no processamento do CSV.')
          }
        } catch (error) {
          console.error('Erro na requisição para processar o CSV:', error)
        }
      } else {
        console.error('Nenhum arquivo CSV selecionado.')
      }
    } catch (error) {
      console.error('Erro ao processar o arquivo CSV:', error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
      {jsonData && (
        <div>
          <h2>Transformed JSON Data:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default Input
