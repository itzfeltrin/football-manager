type PlayerPosition =
	| ""
	| "goleiro"
	| "lateral"
	| "zagueiro"
	| "volante"
	| "meia"
	| "atacante";

export type PlayerData = {
	fullName: string;
	birthDate: string;
	cpf: string;
	position?: PlayerPosition;
	isSub?: boolean;
};
