import Image from "next/image";
import { useReducer } from "react";
import classes from "../styles/components/Team.module.css";
import { PlayerModal } from "./PlayerModal";

type TeamProps = {
	id: number;
};

// join multiple classes with space
const getClassNames = (classNames: string[]): string => classNames.join(" ");

export const Team = ({ id }: TeamProps): JSX.Element => {
	const [isModalVisible, toggleModal] = useReducer((prev) => !prev, false);

	return (
		<>
			<div className={classes.container}>
				<h3 className={classes.title}>Time {id}</h3>
				<button
					type="button"
					onClick={toggleModal}
					className={getClassNames([classes.button, classes.new])}
				>
					<Image
						src="/assets/plus.svg"
						alt="Adicionar novo jogador"
						width={20}
						height={20}
					/>
					<span>Adicionar novo jogador</span>
				</button>
				<button
					type="button"
					className={getClassNames([classes.button, classes.remove])}
				>
					<Image
						src="/assets/trash.svg"
						alt="Remover todos os jogadores"
						width={20}
						height={20}
					/>
					<span>Remover todos</span>
				</button>
			</div>
			<PlayerModal isVisible={isModalVisible} onClose={toggleModal} />
		</>
	);
};
