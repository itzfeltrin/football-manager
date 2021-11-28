import React from "react";
import { FieldError } from "react-hook-form";

type InputProps = {
	label: string;
	error?: FieldError;
} & React.InputHTMLAttributes<HTMLInputElement>;

const BaseInput = (
	{ label, error, ...props }: InputProps,
	ref: React.LegacyRef<HTMLInputElement> | undefined
) => (
	<div
		className={`form-group ${error ? "invalid" : ""} ${
			props.type === "checkbox" ? "checkbox" : ""
		}`}
	>
		<label htmlFor={props.id}>{label}</label>
		<input {...props} ref={ref} />
		{error && <span>{error.message}</span>}
	</div>
);

export const Input = React.forwardRef<HTMLInputElement, InputProps>(BaseInput);
