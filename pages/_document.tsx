/* eslint-disable @next/next/no-title-in-document-head */
import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="pt-BR">
				<Head>
					<title>Gerenciador de Fut</title>
					<meta
						name="description"
						content="Gerenciador de equipes de futebol"
					></meta>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
