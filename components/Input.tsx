import { FieldError } from "react-hook-form";
import classes from "../styles/components/Input.module.css";

type InputProps = {
	label: string;
	error?: FieldError;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ label, error, ...props }: InputProps): JSX.Element => {
	return (
		<div className={classes["form-group"]}>
			<label htmlFor={props.id}>{label}</label>
			<input {...props} />
			{error && <span>{error.message}</span>}
		</div>
	);
};
