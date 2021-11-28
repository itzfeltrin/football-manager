import { useCallback, useEffect } from "react";
import Image from "next/image";
import * as yup from "yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "./form/Input";
import { Select } from "./form/Select";
import type { PlayerData } from "../types/player";
import classes from "../styles/components/PlayerModal.module.css";

type PlayerModalProps = {
	isVisible: boolean;
	onClose(): void;
	editing: PlayerData | null;
	onSubmit(values: PlayerData): void;
};

const formSchema: yup.SchemaOf<PlayerData> = yup.object({
	fullName: yup.string().required("Nome completo obrigatório"),
	birthDate: yup.string().required("Data de nascimento obrigatória"),
	cpf: yup.string().required("CPF obrigatório"),
	position: yup.mixed().nullable(),
	isSub: yup.boolean(),
});

const defaultValues: PlayerData = {
	fullName: "",
	birthDate: "",
	cpf: "",
	position: "",
	isSub: false,
};

const positions = [
	"goleiro",
	"lateral",
	"zagueiro",
	"volante",
	"meia",
	"atacante",
];

export const PlayerModal = ({
	isVisible,
	onClose,
	editing,
	onSubmit,
}: PlayerModalProps) => {
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<PlayerData>({
		resolver: yupResolver(formSchema),
		defaultValues,
	});

	useEffect(() => {
		if (isVisible) {
			if (editing) {
				reset(editing);
			} else {
				reset(defaultValues);
			}
		}
	}, [editing, isVisible, reset]);

	return (
		<AnimatePresence>
			{isVisible && (
				<div onClick={onClose} className={classes.backdrop}>
					<motion.div
						onClick={(e) => {
							e.stopPropagation();
						}}
						initial={{ opacity: 0, scale: 0.25 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.25 }}
						transition={{ duration: 0.33 }}
					>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className={classes.content}
						>
							<h1 className={classes.title}>Adicionar jogador</h1>
							<button
								type="button"
								onClick={onClose}
								className={classes["close-button"]}
							>
								<Image
									src="/assets/plus.svg"
									alt="Botão para fechar modal"
									width={20}
									height={20}
								/>
							</button>
							<div className={classes.grid}>
								<Controller
									render={({ field }) => (
										<Input
											label="Nome completo"
											error={errors.fullName}
											disabled={Boolean(editing)}
											{...field}
										/>
									)}
									control={control}
									name="fullName"
								/>
								<Controller
									render={({ field }) => (
										<Input
											label="Data de nascimento"
											error={errors.birthDate}
											type="date"
											disabled={Boolean(editing)}
											{...field}
										/>
									)}
									control={control}
									name="birthDate"
								/>
								<Controller
									render={({ field }) => (
										<Input
											label="CPF"
											error={errors.cpf}
											disabled={Boolean(editing)}
											mask="999.999.999-99"
											{...field}
										/>
									)}
									control={control}
									name="cpf"
								/>
								<Controller
									render={({ field }) => (
										<Select
											label="Posição"
											error={errors.position}
											options={positions}
											{...field}
										>
											<option value="">
												Selecione uma posição
											</option>
										</Select>
									)}
									control={control}
									name="position"
								/>
								<Controller
									render={({ field }) => (
										<Input
											label="É reserva?"
											error={errors.isSub}
											type="checkbox"
											checked={field.value}
											onChange={field.onChange}
										/>
									)}
									control={control}
									name="isSub"
								/>
							</div>
							<div className={classes["button-wrapper"]}>
								<button
									type="submit"
									className={classes["submit-button"]}
								>
									Salvar
								</button>
							</div>
						</form>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};
