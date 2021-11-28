import React from "react";
import InputMask, { Props as InputMaskProps } from "react-input-mask";
import { FieldError } from "react-hook-form";

type InputProps = {
	label: string;
	error?: FieldError;
	mask?: string;
} & Omit<InputMaskProps, "mask">;

const BaseInput = (
	{ label, error, mask = "", ...props }: InputProps,
	ref: React.LegacyRef<HTMLInputElement> | undefined
) => (
	<div
		className={`form-group ${error ? "invalid" : ""} ${
			props.type === "checkbox" ? "checkbox" : ""
		}`}
	>
		<label htmlFor={props.id}>{label}</label>
		{mask === "" ? (
			<input {...props} ref={ref as React.LegacyRef<HTMLInputElement>} />
		) : (
			<InputMask
				mask={mask}
				{...props}
				ref={ref as React.LegacyRef<InputMask> | undefined}
			/>
		)}
		{error && <span>{error.message}</span>}
	</div>
);

export const Input = React.forwardRef<HTMLInputElement, InputProps>(BaseInput);
