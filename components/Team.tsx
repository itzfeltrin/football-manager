import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import classes from "../styles/components/Team.module.css";
import { PlayerData } from "../types/player";
import { capitalize } from "../utils/helpers";
import { PlayerModal } from "./PlayerModal";

type TeamProps = {
	id: number;
};

// join multiple classes with space
const getClassNames = (classNames: string[]): string => classNames.join(" ");

export const Team = ({ id }: TeamProps): JSX.Element => {
	const [players, setPlayers] = useState<PlayerData[]>([]);
	const [isModalVisible, toggleModal] = useReducer((prev) => !prev, false);
	const [editing, setEditing] = useState<PlayerData | null>(null);

	const handleCloseModal = useCallback(() => {
		toggleModal();
		setEditing(null);
	}, []);

	const handleSubmitPlayer = useCallback(
		(values: PlayerData) => {
			const playerObj = { ...values, cpf: values.cpf.replace(/\D/g, "") }; // save cpf without non-numeric characters
			if (editing) {
				setPlayers((prev) => {
					const arr = [...prev];
					const playerIndex = prev.findIndex(
						(player) => player.cpf === playerObj.cpf
					);
					arr[playerIndex] = playerObj;
					return arr;
				});
			} else {
				if (players.find((player) => player.cpf === playerObj.cpf)) {
					alert(
						`Já existe um jogador com esse CPF cadastrado no time ${id}`
					);
					return; // can't add player with the same cpf
				}
				setPlayers((prev) => [...prev, playerObj]);
			}
			handleCloseModal();
		},
		[editing, handleCloseModal, id, players]
	);

	const firstRun = useRef(true);

	useEffect(() => {
		/* save to localStorage every time state changes */
		if (!firstRun.current) {
			// set players on subsequent effect runs
			localStorage.setItem(`team-${id}`, JSON.stringify(players));
		} else {
			// get players from localStorage on first mount
			const localStoragePlayers = localStorage.getItem(`team-${id}`);
			if (localStoragePlayers) {
				setPlayers(JSON.parse(localStoragePlayers));
			}
			firstRun.current = false;
		}
	}, [id, players]);

	const handlePlayerAction = useCallback(
		(cpf: string, action: "edit" | "remove") => () => {
			if (action === "edit") {
				setEditing(players.find((player) => player.cpf === cpf)!); // safe to use ! here because we already checked for cpf existence
				toggleModal();
			} else {
				setPlayers((prev) =>
					prev.filter((player) => player.cpf !== cpf)
				);
			}
		},
		[players]
	);

	return (
		<>
			<div className={classes.container}>
				<h2 className={classes.title}>Time {id}</h2>
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
					<span>Adicionar jogador</span>
				</button>
				<AnimateSharedLayout>
					<motion.ul className={classes.players}>
						<AnimatePresence>
							{players.map((player) => (
								<motion.li
									key={player.cpf}
									className={classes.player}
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									exit={{ scale: 0 }}
									transition={{ duration: 0.3 }}
								>
									<span className={classes.name}>
										{player.fullName}
										{player.position && " - "}
										{player.position && (
											<span className={classes.position}>
												{capitalize(player.position)}
											</span>
										)}
									</span>
									<div className={classes["action-buttons"]}>
										<button
											type="button"
											onClick={handlePlayerAction(
												player.cpf,
												"edit"
											)}
										>
											<Image
												src="/assets/edit.svg"
												alt={`Editar jogador "${player.fullName}""`}
												width={20}
												height={20}
											/>
										</button>
										<button
											type="button"
											onClick={handlePlayerAction(
												player.cpf,
												"remove"
											)}
										>
											<Image
												src="/assets/trash.svg"
												alt={`Remover jogador "${player.fullName}""`}
												width={20}
												height={20}
											/>
										</button>
									</div>
								</motion.li>
							))}
						</AnimatePresence>
					</motion.ul>
				</AnimateSharedLayout>
				{players.length > 0 && (
					<button
						type="button"
						onClick={() => setPlayers([])}
						className={getClassNames([
							classes.button,
							classes.remove,
						])}
					>
						<Image
							src="/assets/trash.svg"
							alt="Remover todos os jogadores"
							width={20}
							height={20}
						/>
						<span>Remover todos</span>
					</button>
				)}
			</div>
			<PlayerModal
				isVisible={isModalVisible}
				onClose={handleCloseModal}
				editing={editing}
				onSubmit={handleSubmitPlayer}
			/>
		</>
	);
};
