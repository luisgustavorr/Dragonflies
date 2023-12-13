# Dragonflies
O projeto foi criado com a intenção de conseguir receber os bugs que ocorrem no sistema pelo email, futuramente haverá um aplicativo para receber esses erros.
Com essa API é possível descobrir erros no sistema antes que um usuário o note, assim reduzindo problemas relacionados a bugs.


### 🔧 Utilização

Faça uma requisição POST para a API em todos os Catch de um bloco Try-Catch que você tenha interesse em monitorar os erros, segue um exemplo de ulização com PHP :

Criar função global, para enviar a requisição (criei no arquivo de configuração do MySql):
```
class ReportError
{
	public static function conectar($error, $email)
	{
		// Construa a URL com os parâmetros necessários
		$url = 'https://super-error-log-git-main-luisgustavorrs-projects.vercel.app/monitorar-get?' . http_build_query([
			'Sistema' => 'Seu Sistema',
			'Error' => $error,
			'Email' => $email,
		]);

		// Inicialize o cURL
		$ch = curl_init($url);

		// Configurações adicionais do cURL
		curl_setopt_array($ch, [
			CURLOPT_RETURNTRANSFER => true,

		]);

		// Execute a requisição cURL
		$response = curl_exec($ch);

		// Lógica para lidar com a resposta, se necessário
		echo 'Resposta recebida: ' . $response;

		// Verifique por erros
		if (curl_errno($ch)) {
			echo 'Erro cURL: ' . curl_error($ch);
		}

		// Feche o handle cURL
		curl_close($ch);
	}
}
```

E para executar a função:

```
try {
//seu código...
} catch (Exception $e) {
    \ReportError::conectar($e->getMessage() . " na linha " . $e->getLine() . " do arquivo " .  basename(__FILE__), "seu_email@gmail.com");
}
```



## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [NodeJS](https://nodejs.org/en) - Linguagem usada na API
* [Nodemailer](https://nodemailer.com/) - Envia os emails
* [Express](https://expressjs.com/pt-br/) - Usado para criar o servidor
* [Vercel](https://vercel.com) - Usado para colocar a API online

## ✒️ Autores



* **Luís Gustavo** - *Desenvolvimento* - [Luís Gustavo](https://github.com/luisgustavorr)



## 📄 Licença

Este projeto está sob a licença (sua licença) - veja o arquivo [LICENSE.md](https://github.com/luisgustavorr/Dragonflies/blob/main/LICENSE) para detalhes.


