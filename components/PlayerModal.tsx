import { useCallback } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "./Input";
import type { PlayerData } from "../types/player";
import classes from "../styles/components/PlayerModal.module.css";

type PlayerModalProps = {
	isVisible: boolean;
	onClose(): void;
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

export const PlayerModal = ({ isVisible, onClose }: PlayerModalProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PlayerData>({
		resolver: yupResolver(formSchema),
		defaultValues,
	});

	const handleFormSubmit = useCallback<SubmitHandler<PlayerData>>(
		(values) => {
			console.log(values);
		},
		[]
	);

	return (
		<AnimatePresence>
			{isVisible && (
				<div onClick={onClose} className={classes.backdrop}>
					<motion.div
						onClick={(e) => {
							e.stopPropagation();
						}}
						// className={classes.content}
						initial={{ opacity: 0, scale: 0.25 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.25 }}
						transition={{ duration: 0.33 }}
					>
						<form
							onSubmit={handleSubmit(handleFormSubmit)}
							className={classes.content}
						>
							<h1>Adicionar novo jogador</h1>
							<div className={classes.grid}>
								<Input
									label="Nome completo"
									error={errors.fullName}
									{...register("fullName")}
								/>
								<Input
									label="Data de nascimento"
									error={errors.birthDate}
									type="date"
									{...register("birthDate")}
								/>
								<Input
									label="CPF"
									error={errors.cpf}
									{...register("cpf")}
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
