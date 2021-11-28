import Image from "next/image";
import classes from "../../styles/components/Header.module.css";

export const Header = (): JSX.Element => (
	<header className={classes.header}>
		<Image
			src="/assets/ball.svg"
			alt="Bola de futebol"
			width={48}
			height={48}
			className={classes.ball}
		/>
		<h1 className={classes.title}>Gerenciador de Fut</h1>
	</header>
);
